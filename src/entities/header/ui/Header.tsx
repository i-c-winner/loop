'use client'
/**
 * TODO сделать компонент серверным (handleclick)
 */
import styles from './header.module.scss'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import {ButtonGroup, Avatar, Button} from "@mui/material";
import {redirect} from "next/navigation";
function Header() {

  function handleClick() {
    redirect('/')
  }
  return <Box
    sx={{
      padding: 1,
    }}>
    <Box
      sx={{
        color: 'text.primary',
        backgroundColor: 'background.paper',
      }}
      className={styles.header}
    >
        <ButtonGroup
          variant="contained"
          className={styles.menuGroup}>
          <Button onClick={()=>redirect('/')}>
            Home
          </Button>
          <Button onClick={()=>redirect('/project')}>
            Project
          </Button>
        </ButtonGroup>
            <Box>
        <Typography variant={'h4'} color={'text.primary'}>
        </Typography>
        <Typography variant={"body1"} color={'text.primary'}>
          Статистика по разделу АР
        </Typography>
      </Box>
      <Box className={styles.userGroup}>
        <ButtonGroup variant='contained' >
          <Button>Login</Button>
          <Button>Logout</Button>
        </ButtonGroup>
        <Avatar className={styles.avatar}></Avatar>
      </Box>

    </Box>
  </Box>;
  }

export {Header}
