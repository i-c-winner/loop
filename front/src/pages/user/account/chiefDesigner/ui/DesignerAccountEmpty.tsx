'use client';

import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  LinearProgress,
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

type TaskOption = {
  id: number;
  title: string;
};

type ListItem = {
  id: number;
  task_id: number | null;
  assignee_id: number | null;
  title: string;
  progress: number;
};

function toPositiveInt(value: unknown): number | null {
  const parsed = typeof value === 'number' ? value : Number(value);
  if (Number.isInteger(parsed) && parsed >= 1) {
    return parsed;
  }
  return null;
}

export default function DesignerAccountEmpty() {
  const { currentProjectId, changeProject, changeProjectId } = useContext(MyContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<TaskOption[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [tableTaskId, setTableTaskId] = useState<number | ''>('');
  const [taskId, setTaskId] = useState<number | ''>('');
  const [lists, setLists] = useState<ListItem[]>([]);
  const [listsLoading, setListsLoading] = useState(false);
  const [listsError, setListsError] = useState<string | null>(null);
  const [assigneeId, setAssigneeId] = useState<number | ''>('');
  const [listTitle, setListTitle] = useState('');
  const [listProgress, setListProgress] = useState('0');
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [listSuccess, setListSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('authToken');
        const headers: HeadersInit = {
          accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const allProjectsResponse = await fetch(`${apiBaseUrl}/api/v1/projects`, {
          method: 'GET',
          headers,
          credentials: 'include',
        });

        if (!allProjectsResponse.ok) {
          const text = await allProjectsResponse.text();
          throw new Error(text || `Ошибка загрузки проектов: ${allProjectsResponse.status}`);
        }

        const allProjectsPayload = (await allProjectsResponse.json()) as Project[];
        const allProjects = Array.isArray(allProjectsPayload) ? allProjectsPayload : [];

        const normalizedProjects = allProjects;

        const savedProjectId = toPositiveInt(currentProjectId);
        const hasSavedProject = savedProjectId != null
          ? normalizedProjects.some((project) => project.id === savedProjectId)
          : false;
        const initialProjectId = hasSavedProject ? savedProjectId : (normalizedProjects[0]?.id ?? null);

        setProjects(normalizedProjects);
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

  useEffect(() => {
    async function loadTaskOptions() {
      const projectIdFromContext = toPositiveInt(currentProjectId);
      const projectIdFromTab = toPositiveInt(activeProjectId);
      const projectId = projectIdFromContext ?? projectIdFromTab;
      const currentUserId = Number(localStorage.getItem('user_id'));

      if (projectId == null) {
        setTasks([]);
        setTaskId('');
        setTasksError(null);
        return;
      }

      if (!Number.isFinite(currentUserId) || currentUserId < 1) {
        setTasks([]);
        setTaskId('');
        setTasksError('Не удалось определить текущего пользователя');
        return;
      }
      setAssigneeId(currentUserId);

      try {
        setTasksLoading(true);
        setTasksError(null);
        const token = localStorage.getItem('authToken');
        const headers: HeadersInit = {
          accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const response = await fetch(
          `${apiBaseUrl}/api/v1/tasks?project_id=${projectId}&assignee_id=${currentUserId}`,
          {
            method: 'GET',
            headers,
            credentials: 'include',
          }
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || 'Не удалось загрузить задачи текущего проекта');
        }

        const text = await response.text();
        const payload: unknown = text ? JSON.parse(text) : [];

        const asArray = Array.isArray(payload)
          ? payload
          : payload && typeof payload === 'object' && Array.isArray((payload as { items?: unknown[] }).items)
          ? (payload as { items: unknown[] }).items
          : [];

        const nextTasks = asArray
          .map((item): TaskOption | null => {
            if (!item || typeof item !== 'object') return null;
            const raw = item as Record<string, unknown>;
            const id = Number(raw.id);
            if (!Number.isFinite(id)) return null;
            const title = typeof raw.title === 'string' && raw.title.trim() ? raw.title : `Task #${id}`;
            return { id, title };
          })
          .filter((item): item is TaskOption => item !== null);

        setTasks(nextTasks);
        setTableTaskId((prev) =>
          typeof prev === 'number' && nextTasks.some((task) => task.id === prev) ? prev : (nextTasks[0]?.id ?? '')
        );
        setTaskId((prev) =>
          typeof prev === 'number' && nextTasks.some((task) => task.id === prev) ? prev : (nextTasks[0]?.id ?? '')
        );
      } catch (loadTasksError) {
        setTasks([]);
        setTableTaskId('');
        setTaskId('');
        setTasksError(loadTasksError instanceof Error ? loadTasksError.message : 'Не удалось загрузить задачи');
      } finally {
        setTasksLoading(false);
      }
    }

    loadTaskOptions();
  }, [activeProjectId, apiBaseUrl, currentProjectId]);

  useEffect(() => {
    async function loadListsForTask() {
      const projectId = toPositiveInt(currentProjectId) ?? toPositiveInt(activeProjectId);
      const selectedTaskId = toPositiveInt(tableTaskId);

      if (projectId == null || selectedTaskId == null) {
        setLists([]);
        setListsError(null);
        return;
      }

      try {
        setListsLoading(true);
        setListsError(null);

        const token = localStorage.getItem('authToken');
        const headers: HeadersInit = {
          accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const response = await fetch(
          `${apiBaseUrl}/api/v1/lists?project_id=${projectId}&task_id=${selectedTaskId}`,
          {
            method: 'GET',
            headers,
            credentials: 'include',
          }
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || 'Не удалось загрузить списки для задачи');
        }

        const text = await response.text();
        let payload: unknown = [];
        if (text) {
          try {
            payload = JSON.parse(text);
          } catch {
            payload = [];
          }
        }

        const asArray = Array.isArray(payload)
          ? payload
          : payload && typeof payload === 'object' && Array.isArray((payload as { items?: unknown[] }).items)
          ? (payload as { items: unknown[] }).items
          : [];

        const nextLists = asArray
          .map((item): ListItem | null => {
            if (!item || typeof item !== 'object') return null;
            const raw = item as Record<string, unknown>;
            const id = Number(raw.id);
            if (!Number.isFinite(id)) return null;

            const rowTaskId = Number(raw.task_id);
            const rowAssigneeId = Number(raw.assignee_id);
            const rowProgress = Number(raw.progress);

            return {
              id,
              task_id: Number.isFinite(rowTaskId) ? rowTaskId : null,
              assignee_id: Number.isFinite(rowAssigneeId) ? rowAssigneeId : null,
              title: typeof raw.title === 'string' ? raw.title : '',
              progress: Number.isFinite(rowProgress) ? rowProgress : 0,
            };
          })
          .filter((row): row is ListItem => row !== null);

        setLists(nextLists);
      } catch (loadListsError) {
        setLists([]);
        setListsError(loadListsError instanceof Error ? loadListsError.message : 'Не удалось загрузить списки');
      } finally {
        setListsLoading(false);
      }
    }

    loadListsForTask();
  }, [activeProjectId, apiBaseUrl, currentProjectId, tableTaskId]);

  async function handleCreateList(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setListLoading(true);
      setListError(null);
      setListSuccess(null);

      const resolvedTaskId = Number(taskId);
      const resolvedAssigneeId = Number(assigneeId);
      const resolvedProgress = Number(listProgress);

      if (!Number.isFinite(resolvedTaskId) || resolvedTaskId < 1) {
        throw new Error('Выберите задачу (task_id)');
      }
      if (!Number.isFinite(resolvedAssigneeId) || resolvedAssigneeId < 1) {
        throw new Error('Укажите корректный assignee_id');
      }
      if (!listTitle.trim()) {
        throw new Error('Укажите title');
      }
      if (!Number.isFinite(resolvedProgress) || resolvedProgress < 0 || resolvedProgress > 100) {
        throw new Error('Progress должен быть числом от 0 до 100');
      }

      const token = localStorage.getItem('authToken');
      const headers: HeadersInit = {
        accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const response = await fetch(`${apiBaseUrl}/api/v1/lists`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          task_id: resolvedTaskId,
          assignee_id: resolvedAssigneeId,
          title: listTitle.trim(),
          progress: resolvedProgress,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Ошибка создания list: ${response.status}`);
      }

      setListSuccess('List успешно создан');
      setListTitle('');
      setListProgress('0');
    } catch (createListError) {
      setListError(createListError instanceof Error ? createListError.message : 'Не удалось создать list');
    } finally {
      setListLoading(false);
    }
  }

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString('ru-RU');
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Card sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Личный кабинет designer
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
                setActiveProjectId(Number.isInteger(nextProjectId) && nextProjectId >= 1 ? nextProjectId : null);
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
                <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Название</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Owner ID</TableCell>
                        <TableCell>Создан</TableCell>
                        <TableCell>Обновлён</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover>
                        <TableCell>{activeProject.id}</TableCell>
                        <TableCell>{activeProject.name}</TableCell>
                        <TableCell>{activeProject.description || '—'}</TableCell>
                        <TableCell>{activeProject.owner_id}</TableCell>
                        <TableCell>{formatDate(activeProject.created_at)}</TableCell>
                        <TableCell>{formatDate(activeProject.updated_at)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Списки по задачам
                  </Typography>

                  <Tabs
                    value={typeof tableTaskId === 'number' ? tableTaskId : false}
                    onChange={(_, value) => {
                      const nextTaskId = typeof value === 'number' ? value : Number(value);
                      setTableTaskId(Number.isInteger(nextTaskId) && nextTaskId >= 1 ? nextTaskId : '');
                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ mb: 2 }}
                  >
                    {tasks.map((task) => (
                      <Tab key={task.id} value={task.id} label={task.title} />
                    ))}
                  </Tabs>

                  {tasksLoading && <Alert severity="info">Загрузка задач...</Alert>}
                  {!tasksLoading && tasksError && <Alert severity="warning">{tasksError}</Alert>}
                  {!tasksLoading && !tasksError && tasks.length === 0 && (
                    <Alert severity="warning">Задачи проекта не найдены.</Alert>
                  )}

                  {!tasksLoading && !tasksError && tasks.length > 0 && (
                    <>
                      {listsLoading && <Alert severity="info">Загрузка списков...</Alert>}
                      {!listsLoading && listsError && <Alert severity="warning">{listsError}</Alert>}
                      {!listsLoading && !listsError && lists.length === 0 && (
                        <Alert severity="warning">Списки для выбранной задачи не найдены.</Alert>
                      )}
                      {!listsLoading && !listsError && lists.length > 0 && (
                        <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Assignee ID</TableCell>
                                <TableCell>Progress</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {lists.map((list) => (
                                <TableRow key={list.id} hover>
                                  <TableCell>{list.id}</TableCell>
                                  <TableCell>{list.title || '—'}</TableCell>
                                  <TableCell>{list.assignee_id ?? '—'}</TableCell>
                                  <TableCell sx={{ minWidth: 220 }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                      <Typography variant="body2">{Math.round(list.progress)}%</Typography>
                                      <LinearProgress
                                        variant="determinate"
                                        value={Math.max(0, Math.min(100, Number.isFinite(list.progress) ? list.progress : 0))}
                                        sx={{ height: 10, borderRadius: 1, flex: 1 }}
                                      />
                                    </Stack>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </>
                  )}
                </Box>

                <Box
                  component="form"
                  onSubmit={handleCreateList}
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Создать list для проекта
                  </Typography>

                  <Stack spacing={2}>
                    <TextField
                      select
                      label="Task"
                      value={taskId}
                      onChange={(event) => {
                        const nextId = Number(event.target.value);
                        setTaskId(Number.isFinite(nextId) && nextId >= 1 ? nextId : '');
                      }}
                      fullWidth
                      required
                      disabled={tasksLoading || tasks.length === 0}
                    >
                      {tasks.map((task) => (
                        <MenuItem key={task.id} value={task.id}>
                          {task.title}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      label="Assignee ID"
                      type="number"
                      value={assigneeId}
                      onChange={(event) => {
                        const nextId = Number(event.target.value);
                        setAssigneeId(Number.isFinite(nextId) && nextId >= 1 ? nextId : '');
                      }}
                      inputProps={{ min: 1 }}
                      fullWidth
                      required
                    />

                    <TextField
                      label="Title"
                      value={listTitle}
                      onChange={(event) => setListTitle(event.target.value)}
                      fullWidth
                      required
                    />

                    <TextField
                      label="Progress"
                      type="number"
                      value={listProgress}
                      onChange={(event) => setListProgress(event.target.value)}
                      inputProps={{ min: 0, max: 100 }}
                      fullWidth
                      required
                    />

                    {tasksLoading && <Alert severity="info">Загрузка задач проекта...</Alert>}
                    {tasksError && <Alert severity="warning">{tasksError}</Alert>}
                    {listError && <Alert severity="error">{listError}</Alert>}
                    {listSuccess && <Alert severity="success">{listSuccess}</Alert>}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button type="submit" variant="contained" disabled={listLoading || tasksLoading || tasks.length === 0}>
                        {listLoading ? 'Создание...' : 'Создать list'}
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            )}
          </>
        )}
      </Card>
    </Box>
  );
}
