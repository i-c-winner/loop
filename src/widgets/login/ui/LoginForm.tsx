import { useState, useContext} from 'react'
import { TextField, Button, Box } from '@mui/material'
import {redirect} from "next/navigation";
import {MyContext} from "@/app/providers/MyContext";

export const LoginForm = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const {closeModal} = useContext(MyContext)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    closeModal()
    redirect('/project')
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
        label="Login"
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

      <Button type="submit" variant="contained">
        Отправить
      </Button>
    </Box>
  )
}
