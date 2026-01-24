'use client'
/**
 * TODO сделать компонент серверным (handleclick)
 */
import {Box, Card, Popper} from '@mui/material';
import {ButtonGroup, Avatar, Button, Typography} from "@mui/material";
import {useRef, useState} from "react";
import {useContext} from "react";
import {MyContext} from "@/app/providers/MyContext";
import {useRouter} from "next/navigation";
import {redirect} from "next/navigation";
import {LoginForm} from "@/widgets/login/ui/LoginForm";

function Header() {
  const refAvatar = useRef<HTMLDivElement | null>(null)
  const [popperIsOpen, setPopperIsOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null)
  const router = useRouter()
  const context = useContext(MyContext)

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
      <Button onClick={() => redirect('/project/chiefDesigner')}>
        Проект
      </Button>
      <Button onClick={() => redirect('/dashboards/chiefDesigner')}>
        Дашборд
      </Button>
      <Button onClick={() => redirect('/chat')}>
        Чат
      </Button>
      <Button onClick={() => {
        redirect('/user/account/chiefDesigner')
      }}>
        Личный кабинет
      </Button>
      <Button onClick={() => {
        redirect('/user/profile/chiefDesigner')
      }}>
        Профиль
      </Button>
      <Button onClick={() => {
      }}>
        О проекте
      </Button>
    </ButtonGroup>
    <Typography
      sx={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '0 16px 0 16px',
        textOverflow: 'ellipsis',
      }}
      variant={'h5'}>{context.currentProject}</Typography>
    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '16px'}}>
      <ButtonGroup variant='contained'>
        <Button onClick={()=>{
          context.changeChild(<LoginForm />)
        }}>Login</Button>
        <Button
        onClick={()=>redirect('/')}
        >Logout</Button>
      </ButtonGroup>
      <Avatar onClick={() => {
        setPopperIsOpen(!popperIsOpen)
        setAnchor(refAvatar.current)
      }} ref={refAvatar}></Avatar>
      <Popper sx={
        {
          padding: '16px',
        }
      } open={popperIsOpen} anchorEl={anchor}>
      </Popper>
    </Box>

  </Card>
}

export {Header}
