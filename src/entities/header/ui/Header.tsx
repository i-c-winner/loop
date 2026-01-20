'use client'
/**
 * TODO сделать компонент серверным (handleclick)
 */
import {Box, Card, Popper, Stack} from '@mui/material';
import {ButtonGroup, Avatar, Button, Typography, CardContent} from "@mui/material";
import {useRef, useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import {useContext} from "react";
import {MyContext} from "@/app/providers/MyContext";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {useRouter} from "next/navigation";
import {redirect} from "next/navigation";

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
      <Button onClick={() => redirect('/project')}>
        Проект
      </Button>
      <Button onClick={() => redirect('/chat')}>
        Чат
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
        <Button>Login</Button>
        <Button>Logout</Button>
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
        <Card
          onClick={() => setPopperIsOpen(false)}
          sx={{}}>
          <CardContent >
            <Stack spacing={1} sx={{
              alignItems: 'start',
            }}>
            <Button variant={'text'}>
              <Stack
                onClick={() => router.push('/user/account/chiefDesigner')}
                direction={'row'} spacing={2}>
                <PersonIcon></PersonIcon>
                <Typography variant={'body1'}>
                  Личный кабинет
                </Typography>
              </Stack>
            </Button>
            <Button variant={'text'}>
              <Stack
                direction={'row'} spacing={2}><ManageAccountsIcon></ManageAccountsIcon><Typography
                variant={'body1'}>Профиль</Typography></Stack>
            </Button>
            </Stack>
          </CardContent>
        </Card>
      </Popper>
    </Box>

  </Card>
}

export {Header}
