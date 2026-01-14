'use client'
/**
 * TODO сделать компонент серверным (handleclick)
 */
import styles from './header.module.scss'
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
        Project
      </Button>
    </ButtonGroup>
    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '16px'}}>
      <ButtonGroup variant='contained'>
        <Button>Login</Button>
        <Button>Logout</Button>
      </ButtonGroup>
      <Avatar className={styles.avatar}></Avatar>
    </Box>

  </Card>
}

export {Header}
