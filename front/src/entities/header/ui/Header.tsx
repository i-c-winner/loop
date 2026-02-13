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
import {LoginForm} from "@/widgets/login/ui/LoginForm";

function Header() {
  const router = useRouter()
  const refAvatar = useRef<HTMLDivElement | null>(null)
  const [popperIsOpen, setPopperIsOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null)
  const context = useContext(MyContext)
  const canUseSuperset = context.currentRole === 'admin' || context.currentRole === 'chief'

  const handleLogout = () => {
    localStorage.setItem('authStatus', 'logoutin')
    localStorage.removeItem('authToken')
    localStorage.removeItem('role')
    localStorage.removeItem('currentChiefId')
    context.changeRole('')
    context.changeAuthStatus('logoutin')
    router.push('/')
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
      <Button onClick={() => router.push('/')}>
        Home
      </Button>
      <Button onClick={() => router.push('/project/chiefDesigner')}>
        Проект
      </Button>
      <Button onClick={() => router.push('/dashboards')}>
        Дашборд
      </Button>
      <Button
        disabled={!canUseSuperset}
        onClick={() => router.push('/dashboards/superset')}
      >
        Superset
      </Button>
      <Button onClick={() => router.push('/chat')}>
        Чат
      </Button>
      <Button onClick={() => {
        router.push('/user/account/chiefDesigner')
      }}>
        Личный кабинет
      </Button>
      <Button onClick={() => {
        router.push('/user/profile/chiefDesigner')
      }}>
        Профиль
      </Button>
      <Button onClick={() => {
        router.push('/about')
      }}>
        О проекте
      </Button>
    </ButtonGroup>
    <Box sx={{display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, padding: '0 16px'}}>
      <Typography
        suppressHydrationWarning
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        variant={'h5'}>{context.currentProject}</Typography>
    </Box>
    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '16px'}}>
      <ButtonGroup
         sx={{
           borderRadius: '16px',
         }}
        variant='contained'>
        <Button
          sx={context.currentAuthStatus === 'logoutin'
            ? { bgcolor: 'grey.800', color: 'common.white', '&:hover': { bgcolor: 'grey.900' } }
            : undefined}
          onClick={()=>{
            context.changeChild(<LoginForm />)
          }}
        >
          Login
        </Button>

        <Button
          sx={context.currentAuthStatus === 'loginin'
            ? { bgcolor: 'grey.800', color: 'common.white', '&:hover': { bgcolor: 'grey.900' } }
            : undefined}
          onClick={handleLogout}
        >
          Logout
        </Button>
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
