'use client'
/**
 * TODO сделать компонент серверным (handleclick)
 */
import {Box, Card} from '@mui/material';
import {ButtonGroup, Avatar, Button} from "@mui/material";
import {redirect} from "next/navigation";

function Header() {

  function handleClick() {
    redirect('/')
  }

  return <Card
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      color: 'text.primary',
      backgroundColor: 'background.paper',
      padding: '16px',
    }}
  >
    <ButtonGroup
      variant="contained"
    >
      <Button onClick={() => redirect('/')}>
        Home
      </Button>
      <Button onClick={() => redirect('/project')}>
        Проект
      </Button>
      <Button onClick={() => redirect('/chat')}>
        Чат
      </Button>
    </ButtonGroup>
    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '16px'}}>
      <ButtonGroup variant='contained'>
        <Button>Login</Button>
        <Button>Logout</Button>
      </ButtonGroup>
      <Avatar ></Avatar>
    </Box>

  </Card>
}

export {Header}
