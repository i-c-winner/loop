'use client'
/**
 * TODO сделать компонент серверным (handleclick)
 */
import styles from './header.module.scss'
import {Box, Card} from '@mui/material';
import Typography from "@mui/material/Typography";
import {ButtonGroup, Avatar, Button} from "@mui/material";
import {redirect} from "next/navigation";
function Header() {

  function handleClick() {
    redirect('/')
  }
  return    <Card
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
          <Button onClick={()=>redirect('/')}>
            Home
          </Button>
          <Button onClick={()=>redirect('/project')}>
            Project
          </Button>
        </ButtonGroup>
        <Typography variant={"body1"} color={'text.primary'}>
          Статистика по разделу АР
        </Typography>
        <ButtonGroup variant='contained' >
          <Button>Login</Button>
          <Button>Logout</Button>
          <Avatar className={styles.avatar}></Avatar>
        </ButtonGroup>

    </Card>
  }

export {Header}
