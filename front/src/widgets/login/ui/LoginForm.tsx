import { useState, useContext, useEffect } from 'react'
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material'
import {useRouter} from "next/navigation";
import {MyContext} from "@/app/providers/MyContext";

type LoginProject = {
  id: number
  second_name?: string
  full_name?: string
  name?: string
  title?: string
}

export const LoginForm = () => {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [projects, setProjects] = useState<LoginProject[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const {closeModal, changeRole, changeProject, changeProjectId, changeAuthStatus} = useContext(MyContext)

  const mockProjects: LoginProject[] = [
    { id: 1, second_name: 'first', full_name: 'First Project' },
    { id: 2, second_name: 'second', full_name: 'Second Project' },
  ]

  const getProjectShortName = (project: LoginProject): string => {
    return project.second_name ?? project.full_name ?? project.name ?? project.title ?? `project-${project.id}`
  }

  const normalizeProjects = (raw: unknown): LoginProject[] => {
    if (!Array.isArray(raw)) return []
    return raw
      .map((item) => {
        if (!item || typeof item !== 'object') return null
        const id = Number((item as { id?: unknown }).id)
        if (!Number.isFinite(id) || id <= 0) return null
        const project = item as LoginProject
        return {
          id,
          second_name: typeof project.second_name === 'string' ? project.second_name : undefined,
          full_name: typeof project.full_name === 'string' ? project.full_name : undefined,
          name: typeof project.name === 'string' ? project.name : undefined,
          title: typeof project.title === 'string' ? project.title : undefined,
        }
      })
      .filter((item): item is LoginProject => item !== null)
  }

  useEffect(() => {
    const applyProjects = (items: LoginProject[]) => {
      setProjects(items)
      if (!items.length) {
        setSelectedProjectId('')
        return
      }
      const storedId = localStorage.getItem('currentProjectId')
      const hasStored = storedId && items.some((project) => String(project.id) === storedId)
      setSelectedProjectId(hasStored ? String(storedId) : String(items[0].id))
    }

    const cached = localStorage.getItem('projects')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        const normalized = normalizeProjects(parsed)
        if (normalized.length) {
          applyProjects(normalized)
          return
        }
      } catch {
        // ignore invalid cache
      }
    }
    localStorage.setItem('projects', JSON.stringify(mockProjects))
    applyProjects(mockProjects)
  }, [])

  const resolveRole = (email: string): string => {
    const value = email.trim().toLowerCase()
    if (value.includes('admin')) return 'admin'
    if (value.includes('chief')) return 'chief'
    return 'designer'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)

    try {
      setIsLoading(true)
      if (!login.trim() || !password.trim()) {
        throw new Error('Введите email и пароль')
      }

      const dbRole = resolveRole(login)
      localStorage.removeItem('authToken')
      localStorage.setItem('role', dbRole)
      localStorage.setItem('authStatus', 'loginin')
      changeRole(dbRole)
      changeAuthStatus('loginin')
      const projectId = Number(selectedProjectId)
      const selectedProject = projects.find((project) => project.id === projectId)

      if (selectedProject) {
        const shortName = getProjectShortName(selectedProject)
        localStorage.setItem('currentProject', shortName)
        localStorage.setItem('currentProjectId', String(selectedProject.id))
        localStorage.setItem('registrationProjectId', String(selectedProject.id))
        changeProject(shortName)
        changeProjectId(String(selectedProject.id))
      } else {
        localStorage.removeItem('currentProject')
        localStorage.removeItem('currentProjectId')
        localStorage.removeItem('registrationProjectId')
        changeProject('')
        changeProjectId('')
      }
      localStorage.removeItem('currentChiefId')
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Ошибка аутентификации')
      setIsLoading(false)
      return
    } finally {
        setIsLoading(false)
    }

    closeModal()
    router.push('/project/chiefDesigner')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 300,
        backgroundColor: 'background.paper',
        border: '1px solid #ccc',
        padding: 2,
      }}
    >
      <TextField
        label="Email"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        type="text"
        required
      />

      <TextField
        label="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
      />

      <TextField
        select
        label="Проект"
        value={selectedProjectId}
        onChange={(e) => setSelectedProjectId(e.target.value)}
      >
        <MenuItem value="">Без проекта</MenuItem>
        {projects.length === 0 && (
          <MenuItem value="" disabled>
            Нет проектов
          </MenuItem>
        )}
        {projects.map((project) => (
          <MenuItem key={project.id} value={String(project.id)}>
            {getProjectShortName(project)}
          </MenuItem>
        ))}
      </TextField>

      {authError && (
        <Typography variant="body2" color="error">
          {authError}
        </Typography>
      )}

      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? 'Проверка...' : 'Отправить'}
      </Button>
    </Box>
  )
}
