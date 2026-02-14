'use client';

import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
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

      const userId = resolveUserId(createdUser);
      if (!Number.isFinite(userId)) {
        throw new Error('Пользователь создан, но не удалось получить его id');
      }

      await postJsonToFirstAvailableEndpoint(
        ['/api/v1/project-members'],
        {
          project_id: projectIdFromContext,
          user_id: userId,
          role: 'viewer',
        },
        headers
      );

      setCreateSuccess(`Designer создан и добавлен в project-members проекта #${projectIdFromContext}`);
      setDesignerName('');
      setDesignerEmail('');
      setDesignerPassword('');
    } catch (createUserError) {
      setCreateError(createUserError instanceof Error ? createUserError.message : 'Не удалось создать designer');
    } finally {
      setCreateLoading(false);
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
          Личный кабинет chief
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
                  component="form"
                  onSubmit={handleCreateDesigner}
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Создать designer для проекта
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
              </Stack>
            )}
          </>
        )}
      </Card>
    </Box>
  );
}
