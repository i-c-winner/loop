'use client';

import { useContext, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { LoginForm } from '@/widgets/login/ui/LoginForm';
import { MyContext } from '@/shared/lib/context/app-context';

type NavItem = {
  label: string;
  href: string;
  requiresSuperset?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Проект', href: '/project/chiefDesigner' },
  { label: 'Дашборд', href: '/dashboards' },
  { label: 'Superset', href: '/dashboards/superset', requiresSuperset: true },
  { label: 'Чат', href: '/chat' },
  { label: 'Личный кабинет', href: '/user/account/chiefDesigner' },
  { label: 'Профиль', href: '/user/profile/chiefDesigner' },
  { label: 'О проекте', href: '/about' },
];

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const context = useContext(MyContext);
  const canUseSuperset =
    context.currentRole === 'admin' || context.currentRole === 'chief' || context.currentRole === 'pm';

  const authLabel = useMemo(() => {
    if (context.currentAuthStatus === 'loginin') {
      return `role: ${context.currentRole || 'unknown'}`;
    }
    return 'guest';
  }, [context.currentAuthStatus, context.currentRole]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentChiefId');
    context.changeRole('');
    context.changeAuthStatus('logoutin');
    router.push('/');
  };

  return (
    <AppBar
      color="transparent"
      elevation={0}
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(14px)',
        backgroundColor: 'rgba(244, 248, 255, 0.8)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 72, md: 80 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          overflowX: 'auto',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0F6FFF 0%, #0EA76A 100%)',
              boxShadow: '0 8px 20px rgba(15,111,255,0.28)',
            }}
          />
          <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
            DocFlow
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ flexWrap: 'nowrap' }}>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const disabled = item.requiresSuperset ? !canUseSuperset : false;
            return (
              <Button
                key={item.href}
                variant={active ? 'contained' : 'text'}
                color={active ? 'primary' : 'inherit'}
                disabled={disabled}
                onClick={() => router.push(item.href)}
                sx={{
                  whiteSpace: 'nowrap',
                  color: active ? 'primary.contrastText' : 'text.primary',
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            size="small"
            label={authLabel}
            color={context.currentAuthStatus === 'loginin' ? 'success' : 'default'}
            variant={context.currentAuthStatus === 'loginin' ? 'filled' : 'outlined'}
          />
          <Chip
            size="small"
            label={context.currentProject || 'без проекта'}
            color="primary"
            variant="outlined"
            sx={{ maxWidth: 190 }}
          />
          <Button
            variant={context.currentAuthStatus === 'logoutin' ? 'contained' : 'outlined'}
            onClick={() => context.changeChild(<LoginForm />)}
          >
            Login
          </Button>
          <Button
            variant={context.currentAuthStatus === 'loginin' ? 'contained' : 'outlined'}
            color={context.currentAuthStatus === 'loginin' ? 'error' : 'inherit'}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Tooltip title="Профиль пользователя">
            <Avatar sx={{ width: 36, height: 36 }} />
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export { Header };
