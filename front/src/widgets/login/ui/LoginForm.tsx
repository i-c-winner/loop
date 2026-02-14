import { useContext, useState } from 'react'
import { Alert, Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import {useRouter} from "next/navigation";
import {MyContext} from "@/shared/lib/context/app-context";

type LoginResponse = {
  role?: string
  email?: string
  full_name?: string
  is_active?: boolean
  id?: number
  created_at?: string
  access_token?: string
  token_type?: string
}

type AuthMeResponse = {
  role?: string
}

export const LoginForm = () => {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const {closeModal, changeRole, changeAuthStatus} = useContext(MyContext)
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  const getRoleFromToken = (token: string): string | null => {
    try {
      const payloadPart = token.split('.')[1]
      if (!payloadPart) return null
      const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/')
      const json = atob(base64)
      const parsed = JSON.parse(json) as { role?: unknown }
      return typeof parsed.role === 'string' ? parsed.role : null
    } catch {
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)

    try {
      setIsLoading(true)
      if (!login.trim() || !password.trim()) {
        throw new Error('Введите email и пароль')
      }

      const payload = new URLSearchParams()
      payload.set('username', login.trim())
      payload.set('password', password)

      const loginResponse = await fetch(`${apiBaseUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
        credentials: 'include',
      })

      if (!loginResponse.ok) {
        const errorText = await loginResponse.text()
        throw new Error(errorText || 'Неверный логин или пароль')
      }

      const loginData = (await loginResponse.json()) as LoginResponse
      let roleFromResponse = typeof loginData.role === 'string' ? loginData.role : null

      if (!roleFromResponse && loginData.access_token) {
        roleFromResponse = getRoleFromToken(loginData.access_token)
      }

      if (!roleFromResponse && loginData.access_token) {
        const meResponse = await fetch(`${apiBaseUrl}/api/v1/auth/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${loginData.access_token}`,
          },
          credentials: 'include',
        })
        if (meResponse.ok) {
          const meData = (await meResponse.json()) as AuthMeResponse
          if (typeof meData.role === 'string') {
            roleFromResponse = meData.role
          }
        }
      }

      if (!roleFromResponse) {
        throw new Error('В ответе login нет role')
      }

      if (loginData.access_token) {
        localStorage.setItem('authToken', loginData.access_token)
      } else {
        localStorage.removeItem('authToken')
      }

      changeRole(roleFromResponse)
      changeAuthStatus('loginin')
      localStorage.removeItem('currentChiefId')
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Ошибка авторизации')
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
        width: { xs: 300, md: 360 },
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '16px',
        p: 3,
        boxShadow: '0 16px 40px rgba(15,111,255,0.12)',
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="h5">Вход в систему</Typography>
          <Typography variant="body2" color="text.secondary">
            Используйте корпоративные учетные данные.
          </Typography>
        </Box>
        <Divider />

        <TextField
          label="Email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          type="text"
          required
          fullWidth
        />

        <TextField
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          fullWidth
        />

        {authError && <Alert severity="error">{authError}</Alert>}

        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? 'Проверка...' : 'Войти'}
        </Button>
      </Stack>
    </Box>
  )
}
