'use client';

import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  MenuItem,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { MyContext } from '@/shared/lib/context/app-context';

type Project = {
  id: number;
  owner_id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

type DesignerOption = {
  id: number;
  label: string;
};

type TaskItem = {
  id: number;
  project_id: number | null;
  assignee_id: number | null;
  title: string;
  description: string;
  progress: number;
  status: string;
};

export default function ChiefAccountEmpty() {
  const { currentProjectId, changeProject, changeProjectId } = useContext(MyContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [designerName, setDesignerName] = useState('');
  const [designerEmail, setDesignerEmail] = useState('');
  const [designerPassword, setDesignerPassword] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);
  const [designers, setDesigners] = useState<DesignerOption[]>([]);
  const [designersLoading, setDesignersLoading] = useState(false);
  const [designersError, setDesignersError] = useState<string | null>(null);
  const [taskAssigneeId, setTaskAssigneeId] = useState<number | ''>('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskProgress, setTaskProgress] = useState('0');
  const [taskStatus, setTaskStatus] = useState('todo');
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskError, setTaskError] = useState<string | null>(null);
  const [taskSuccess, setTaskSuccess] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [tasksReloadSeq, setTasksReloadSeq] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${apiBaseUrl}/api/v1/projects`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || `Ошибка загрузки проектов: ${response.status}`);
        }

        const data = (await response.json()) as Project[];
        const normalizedData = Array.isArray(data) ? data : [];
        const savedProjectId = Number(currentProjectId);
        const hasSavedProject = Number.isFinite(savedProjectId)
          ? normalizedData.some((project) => project.id === savedProjectId)
          : false;
        const initialProjectId = hasSavedProject ? savedProjectId : (normalizedData[0]?.id ?? null);

        setProjects(normalizedData);
        setActiveProjectId(initialProjectId);
      } catch (loadError) {
        setProjects([]);
        setActiveProjectId(null);
        setError(loadError instanceof Error ? loadError.message : 'Не удалось загрузить проекты');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [apiBaseUrl, currentProjectId]);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId, projects]
  );

  useEffect(() => {
    if (!activeProject) return;
    changeProject(activeProject.name || `Проект #${activeProject.id}`);
    changeProjectId(String(activeProject.id));
  }, [activeProject, changeProject, changeProjectId]);

  function resolveUserId(payload: unknown): number | null {
    if (!payload || typeof payload !== 'object') {
      return null;
    }

    const objectPayload = payload as Record<string, unknown>;
    const candidates = [
      objectPayload.id,
      objectPayload.user_id,
      objectPayload.userId,
      (objectPayload.user as Record<string, unknown> | undefined)?.id,
      (objectPayload.data as Record<string, unknown> | undefined)?.id,
    ];

    for (const candidate of candidates) {
      const normalized = Number(candidate);
      if (Number.isFinite(normalized)) {
        return normalized;
      }
    }

    return null;
  }

  async function postJsonToFirstAvailableEndpoint(
    endpoints: string[],
    payload: Record<string, unknown>,
    headers: HeadersInit
  ) {
    let lastError = '';

    for (const endpoint of endpoints) {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const text = await response.text();
        if (!text) {
          return {};
        }
        try {
          return JSON.parse(text);
        } catch {
          return {};
        }
      }

      const text = await response.text();
      lastError = text || `${response.status}`;
    }

    throw new Error(lastError || 'Не удалось выполнить запрос');
  }

  function toDesignerOptions(payload: unknown): DesignerOption[] {
    const asArray = Array.isArray(payload)
      ? payload
      : payload && typeof payload === 'object' && Array.isArray((payload as { items?: unknown[] }).items)
      ? (payload as { items: unknown[] }).items
      : [];

    const byId = new Map<number, DesignerOption>();

    for (const item of asArray) {
      if (!item || typeof item !== 'object') continue;
      const raw = item as Record<string, unknown>;
      const rawRole = String(raw.role ?? '').trim().toLowerCase();
      if (rawRole && rawRole !== 'designer') {
        continue;
      }
      const nestedUser = raw.user && typeof raw.user === 'object' ? (raw.user as Record<string, unknown>) : null;
      const candidateId = Number(raw.user_id ?? raw.assignee_id ?? raw.id ?? nestedUser?.id);
      if (!Number.isFinite(candidateId)) continue;

      const label =
        (typeof nestedUser?.full_name === 'string' && nestedUser.full_name.trim()) ||
        (typeof raw.full_name === 'string' && raw.full_name.trim()) ||
        (typeof nestedUser?.name === 'string' && nestedUser.name.trim()) ||
        (typeof raw.name === 'string' && raw.name.trim()) ||
        (typeof nestedUser?.email === 'string' && nestedUser.email.trim()) ||
        (typeof raw.email === 'string' && raw.email.trim()) ||
        `Designer #${candidateId}`;

      byId.set(candidateId, {
        id: candidateId,
        label,
      });
    }

    return Array.from(byId.values());
  }

  function toTaskItems(payload: unknown): TaskItem[] {
    const asArray = Array.isArray(payload)
      ? payload
      : payload && typeof payload === 'object' && Array.isArray((payload as { items?: unknown[] }).items)
      ? (payload as { items: unknown[] }).items
      : [];

    return asArray
      .map((item): TaskItem | null => {
        if (!item || typeof item !== 'object') return null;
        const raw = item as Record<string, unknown>;
        const id = Number(raw.id);
        if (!Number.isFinite(id)) return null;

        const projectId = Number(raw.project_id);
        const assigneeId = Number(raw.assignee_id);
        const progress = Number(raw.progress);

        return {
          id,
          project_id: Number.isFinite(projectId) ? projectId : null,
          assignee_id: Number.isFinite(assigneeId) ? assigneeId : null,
          title: typeof raw.title === 'string' ? raw.title : '',
          description: typeof raw.description === 'string' ? raw.description : '',
          progress: Number.isFinite(progress) ? progress : 0,
          status: typeof raw.status === 'string' ? raw.status : '',
        };
      })
      .filter((task): task is TaskItem => task !== null);
  }

  useEffect(() => {
    async function loadDesigners() {
      const projectIdFromContext = Number(currentProjectId);
      if (!Number.isFinite(projectIdFromContext)) {
        setDesigners([]);
        setTaskAssigneeId('');
        setDesignersError(null);
        return;
      }

      try {
        setDesignersLoading(true);
        setDesignersError(null);

        const token = localStorage.getItem('authToken');
        const headers: HeadersInit = {
          accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const endpoints = [`/api/v1/project_members/users?project_id=${projectIdFromContext}&role=designer`];

        let membersPayload: unknown = [];
        let loaded = false;

        for (const endpoint of endpoints) {
          const response = await fetch(`${apiBaseUrl}${endpoint}`, {
            method: 'GET',
            headers,
            credentials: 'include',
          });

          if (!response.ok) continue;

          const text = await response.text();
          if (!text) {
            membersPayload = [];
          } else {
            try {
              membersPayload = JSON.parse(text);
            } catch {
              membersPayload = [];
            }
          }
          loaded = true;
          break;
        }

        if (!loaded) {
          throw new Error('Не удалось загрузить список дизайнеров проекта');
        }

        const nextDesigners = toDesignerOptions(membersPayload);
        setDesigners(nextDesigners);
        setTaskAssigneeId((prev) =>
          typeof prev === 'number' && nextDesigners.some((designer) => designer.id === prev)
            ? prev
            : (nextDesigners[0]?.id ?? '')
        );
      } catch (loadDesignersError) {
        setDesigners([]);
        setTaskAssigneeId('');
        setDesignersError(
          loadDesignersError instanceof Error
            ? loadDesignersError.message
            : 'Не удалось загрузить дизайнеров текущего проекта'
        );
      } finally {
        setDesignersLoading(false);
      }
    }

    loadDesigners();
  }, [apiBaseUrl, currentProjectId]);

  useEffect(() => {
    async function loadTasks() {
      const projectIdFromContext = Number(currentProjectId);
      const assigneeId = Number(taskAssigneeId);
      if (!Number.isFinite(projectIdFromContext)) {
        setTasks([]);
        setTasksError(null);
        return;
      }
      if (!Number.isFinite(assigneeId) || assigneeId < 1) {
        setTasks([]);
        setTasksError(null);
        return;
      }

      try {
        setTasksLoading(true);
        setTasksError(null);

        const token = localStorage.getItem('authToken');
        const headers: HeadersInit = {
          accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        const response = await fetch(
          `${apiBaseUrl}/api/v1/tasks?project_id=${projectIdFromContext}&assignee_id=${assigneeId}`,
          {
          method: 'GET',
          headers,
          credentials: 'include',
          }
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || 'Не удалось загрузить список задач');
        }

        const text = await response.text();
        const payload = text ? JSON.parse(text) : [];
        setTasks(toTaskItems(payload));
      } catch (loadTasksError) {
        setTasks([]);
        setTasksError(loadTasksError instanceof Error ? loadTasksError.message : 'Не удалось загрузить список задач');
      } finally {
        setTasksLoading(false);
      }
    }

    loadTasks();
  }, [apiBaseUrl, currentProjectId, taskAssigneeId, tasksReloadSeq]);

  async function handleCreateDesigner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setCreateLoading(true);
      setCreateError(null);
      setCreateSuccess(null);

      if (!designerName.trim() || !designerEmail.trim() || !designerPassword.trim()) {
        throw new Error('Заполните имя, email и пароль');
      }

      const projectIdFromContext = Number(currentProjectId);
      if (!Number.isFinite(projectIdFromContext)) {
        throw new Error('Текущий проект в контексте не выбран');
      }

      const token = localStorage.getItem('authToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const createdUser = await postJsonToFirstAvailableEndpoint(
        ['/api/v1/users', '/api/v1/auth/register'],
        {
          full_name: designerName.trim(),
          email: designerEmail.trim(),
          password: designerPassword,
          role: 'designer',
        },
        headers
      );

      const resolvedUserId = resolveUserId(createdUser);
      if (resolvedUserId == null) {
        throw new Error('Пользователь создан, но не удалось получить его id');
      }
      const userId: number = resolvedUserId;

      await postJsonToFirstAvailableEndpoint(
        ['/api/v1/project_members'],
        {
          project_id: projectIdFromContext,
          user_id: userId,
          role: 'designer',
        },
        headers
      );

      const createdDesignerLabel = designerName.trim() || `Designer #${userId}`;
      setDesigners((prev: DesignerOption[]): DesignerOption[] => {
        if (prev.some((designer) => designer.id === userId)) {
          return prev;
        }
        return [...prev, { id: userId, label: createdDesignerLabel }];
      });
      setTaskAssigneeId(userId);
      setCreateSuccess(`Designer создан и добавлен в project_members проекта #${projectIdFromContext}`);
      setDesignerName('');
      setDesignerEmail('');
      setDesignerPassword('');
    } catch (createUserError) {
      setCreateError(createUserError instanceof Error ? createUserError.message : 'Не удалось создать designer');
    } finally {
      setCreateLoading(false);
    }
  }

  async function handleCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setTaskLoading(true);
      setTaskError(null);
      setTaskSuccess(null);

      const projectIdFromContext = Number(currentProjectId);
      const assigneeId = Number(taskAssigneeId);
      const progress = Number(taskProgress);

      if (!Number.isFinite(projectIdFromContext)) {
        throw new Error('Текущий проект в контексте не выбран');
      }
      if (!Number.isFinite(assigneeId) || assigneeId < 1) {
        throw new Error('Выберите designer для задачи');
      }
      if (!taskTitle.trim()) {
        throw new Error('Укажите title задачи');
      }
      if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
        throw new Error('Progress должен быть числом от 0 до 100');
      }

      const token = localStorage.getItem('authToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      await postJsonToFirstAvailableEndpoint(
        ['/api/v1/tasks', '/api/v1/design/tasks'],
        {
          project_id: projectIdFromContext,
          assignee_id: assigneeId,
          title: taskTitle.trim(),
          description: taskDescription.trim(),
          progress,
          status: taskStatus,
        },
        headers
      );

      setTaskSuccess(`Раздел создан и назначен исполнитель #${assigneeId}`);
      setTaskTitle('');
      setTaskDescription('');
      setTaskProgress('0');
      setTaskStatus('todo');
      setTasksReloadSeq((prev) => prev + 1);
    } catch (createTaskError) {
      setTaskError(createTaskError instanceof Error ? createTaskError.message : 'Не удалось создать раздел');
    } finally {
      setTaskLoading(false);
    }
  }

  const designerLabelsById = useMemo(() => {
    const map = new Map<number, string>();
    for (const designer of designers) {
      map.set(designer.id, designer.label);
    }
    return map;
  }, [designers]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Card sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Личный кабинет
        </Typography>

        {loading && <Alert severity="info">Загрузка проектов...</Alert>}
        {!loading && error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && projects.length === 0 && (
          <Alert severity="warning">Проекты не найдены.</Alert>
        )}

        {!loading && !error && projects.length > 0 && (
          <>
            <Tabs
              value={activeProjectId ?? false}
              onChange={(_, value) => {
                const nextProjectId = typeof value === 'number' ? value : Number(value);
                setActiveProjectId(Number.isFinite(nextProjectId) ? nextProjectId : null);
              }}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 2 }}
            >
              {projects.map((project) => (
                <Tab key={project.id} value={project.id} label={project.name || `Проект #${project.id}`} />
              ))}
            </Tabs>

            {activeProject && (
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
                  <Box
                    sx={{
                      flex: 1,
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Список designer
                    </Typography>
                    {designersLoading && <Alert severity="info">Загрузка designer...</Alert>}
                    {!designersLoading && designersError && <Alert severity="warning">{designersError}</Alert>}
                    {!designersLoading && !designersError && designers.length === 0 && (
                      <Alert severity="warning">Designer для проекта не найдены.</Alert>
                    )}
                    {!designersLoading && !designersError && designers.length > 0 && (
                      <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>ID</TableCell>
                              <TableCell>Имя</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {designers.map((designer) => (
                              <TableRow key={designer.id} hover>
                                <TableCell>{designer.id}</TableCell>
                                <TableCell>{designer.label}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Список tasks
                    </Typography>
                    {tasksLoading && <Alert severity="info">Загрузка задач...</Alert>}
                    {!tasksLoading && tasksError && <Alert severity="warning">{tasksError}</Alert>}
                    {!tasksLoading && !tasksError && tasks.length === 0 && (
                      <Alert severity="warning">Задачи для проекта не найдены.</Alert>
                    )}
                    {!tasksLoading && !tasksError && tasks.length > 0 && (
                      <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>ID</TableCell>
                              <TableCell>Title</TableCell>
                              <TableCell>Designer</TableCell>
                              <TableCell>Progress</TableCell>
                              <TableCell>Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {tasks.map((task) => (
                              <TableRow key={task.id} hover>
                                <TableCell>{task.id}</TableCell>
                                <TableCell>{task.title || '—'}</TableCell>
                                <TableCell>
                                  {task.assignee_id != null
                                    ? (designerLabelsById.get(task.assignee_id) ?? `Designer #${task.assignee_id}`)
                                    : '—'}
                                </TableCell>
                                <TableCell>{task.progress}</TableCell>
                                <TableCell>{task.status || '—'}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Box>
                </Stack>
                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
                  <Box
                    component="form"
                    onSubmit={handleCreateDesigner}
                    sx={{
                      flex: 1,
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Добавить исполнителя для проекта
                    </Typography>

                    <Stack spacing={2}>
                      <TextField
                        label="Имя"
                        value={designerName}
                        onChange={(event) => setDesignerName(event.target.value)}
                        required
                        fullWidth
                      />
                      <TextField
                        label="Email"
                        value={designerEmail}
                        onChange={(event) => setDesignerEmail(event.target.value)}
                        type="email"
                        required
                        fullWidth
                      />
                      <TextField
                        label="Пароль"
                        value={designerPassword}
                        onChange={(event) => setDesignerPassword(event.target.value)}
                        type="password"
                        required
                        fullWidth
                      />

                      {createError && <Alert severity="error">{createError}</Alert>}
                      {createSuccess && <Alert severity="success">{createSuccess}</Alert>}

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" variant="contained" disabled={createLoading}>
                          {createLoading ? 'Создание...' : 'Создать designer'}
                        </Button>
                      </Box>
                    </Stack>
                  </Box>

                  <Box
                    component="form"
                    onSubmit={handleCreateTask}
                    sx={{
                      flex: 1,
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Создать раздел
                    </Typography>

                    <Stack spacing={2}>
                      <TextField
                        select
                        label="Designer (assignee)"
                        value={taskAssigneeId}
                        onChange={(event) => {
                          const raw = event.target.value;
                          const normalized = typeof raw === 'string' ? Number(raw) : Number(raw);
                          setTaskAssigneeId(Number.isFinite(normalized) && normalized >= 1 ? normalized : '');
                        }}
                        fullWidth
                        disabled={designersLoading || designers.length === 0}
                        required
                      >
                        {designers.map((designer) => (
                          <MenuItem key={designer.id} value={designer.id}>
                            {designer.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        label="Title"
                        value={taskTitle}
                        onChange={(event) => setTaskTitle(event.target.value)}
                        required
                        fullWidth
                      />
                      <TextField
                        label="Description"
                        value={taskDescription}
                        onChange={(event) => setTaskDescription(event.target.value)}
                        fullWidth
                        multiline
                        minRows={3}
                      />
                      {designersError && <Alert severity="warning">{designersError}</Alert>}
                      {taskError && <Alert severity="error">{taskError}</Alert>}
                      {taskSuccess && <Alert severity="success">{taskSuccess}</Alert>}

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={taskLoading || designersLoading || designers.length === 0}
                        >
                          {taskLoading ? 'Создание...' : 'Создать раздел'}
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>


              </Stack>
            )}
          </>
        )}
      </Card>
    </Box>
  );
}
