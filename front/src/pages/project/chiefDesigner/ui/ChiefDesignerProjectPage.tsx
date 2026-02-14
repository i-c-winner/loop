'use client';

import React, { useMemo, useState } from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { sections } from '@/shared/assets/data/pipeData';
import TimeLineBasic from '@/shared/ui/timeLine/ui/TimeLineBasic';
import { InfoCard } from '@/widgets/infocard/ui/InfoCard';
import { UserBadge } from '@/widgets/userBadge/ui/UserBadge';

function Panel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  if (value !== index) {
    return null;
  }
  return <Box sx={{ pt: 2 }}>{children}</Box>;
}

function ChiefDesignerProjectPage() {
  const [value, setValue] = useState(0);
  const waitingSections = useMemo(
    () => sections.filter((_, index) => index === 3 || index === 4 || index === 6),
    []
  );

  return (
    <Stack spacing={2}>
      <Card sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="start">
          <Stack spacing={0.75}>
            <Typography variant="overline" color="text.secondary">
              Активный объект
            </Typography>
            <Typography variant="h4">Строительство производственного здания</Typography>
            <Typography variant="body2" color="text.secondary">
              Адрес: ул. Ленина, 15А
            </Typography>
          </Stack>
          <Button startIcon={<AutorenewIcon />}>Обновить разделы</Button>
        </Stack>
      </Card>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
        <InfoCard parms={{ title: 'Общий прогресс', value: '70%', subtitle: 'По графику' }} />
        <InfoCard parms={{ title: 'Соблюдение сроков', value: '83%', subtitle: 'В пределах плана' }} />
        <InfoCard parms={{ title: 'Проблемы', value: '3', subtitle: 'Требуют внимания' }} />
        <InfoCard parms={{ title: 'Бюджет', value: '$150 000', subtitle: 'Согласно бюджету' }} />
      </Stack>

      <Stack direction={{ xs: 'column', xl: 'row' }} spacing={2}>
        <Card sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Разделы на согласовании
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          <List sx={{ p: 0 }}>
            {waitingSections.map((section) => (
              <ListItem
                key={section}
                sx={{ px: 0 }}
                secondaryAction={
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Tooltip title="Скачать">
                      <IconButton size="small">
                        <BrowserUpdatedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Принять версию">
                      <IconButton size="small" color="success">
                        <FileDownloadDoneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Отклонить версию">
                      <IconButton size="small" color="error">
                        <DisabledByDefaultIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <UserBadge name="Ivanov" />
                  </Stack>
                }
              >
                <ListItemText primary={section} />
              </ListItem>
            ))}
          </List>
        </Card>

        <Card sx={{ p: 2, flex: 1.25 }}>
          <Typography variant="h6">Версии и передача документации</Typography>
          <Tabs
            value={value}
            onChange={(_, nextValue: number) => setValue(nextValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {sections.map((section) => (
              <Tab key={section} label={section} />
            ))}
          </Tabs>
          <Panel value={value} index={value}>
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
              <Card sx={{ p: 2, flex: 1 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Версии раздела
                </Typography>
                <TimeLineBasic />
                <Button variant="outlined">Добавить новую версию</Button>
              </Card>
              <Card sx={{ p: 2, flex: 1 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Переданные документы
                </Typography>
                <TimeLineBasic />
                <Button variant="outlined">Отправить файл</Button>
              </Card>
            </Stack>
          </Panel>
        </Card>
      </Stack>
    </Stack>
  );
}

export default ChiefDesignerProjectPage;
