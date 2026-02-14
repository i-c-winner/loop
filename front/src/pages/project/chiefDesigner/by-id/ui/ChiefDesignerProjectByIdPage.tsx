'use client';

import React, { useContext, useMemo, useState } from 'react';
import { Box, Button, Card, Chip, Stack, Typography } from '@mui/material';
import { EChartsOption } from 'echarts';
import { useParams } from 'next/navigation';
import { UpdateProgres } from '@/features/updateValue/ui/UpdateProgres';
import { DashboardBox } from '@/entities/dashboard/ui/dashboardBox';
import { Registry } from '@/entities/mainFrame/ui/Registry';
import { MyContext } from '@/shared/lib/context/app-context';
import { lists } from '@/shared/assets/data/pipeData';

export default function ChiefDesignerProjectByIdPage() {
  const { currentProjectId } = useContext(MyContext);
  const params = useParams<{ project: string }>();
  const [popoverIsOpen, setPopoverOpen] = useState(false);
  const [value, setValue] = useState(0);

  function updateProgressToggled(nextValue: number) {
    setValue(nextValue);
    setPopoverOpen(true);
  }

  const sectionId = useMemo(() => {
    const id = Number(params?.project);
    return Number.isFinite(id) ? id : null;
  }, [params]);

  return (
    <Stack spacing={2}>
      <Card sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
          <Stack spacing={0.75}>
            <Typography variant="overline" color="text.secondary">
              Раздел проекта
            </Typography>
            <Typography variant="h4">Архитектурные решения</Typography>
          </Stack>
          <Chip label={`ID раздела: ${sectionId ?? '—'}`} color="primary" variant="outlined" />
        </Stack>
      </Card>

      <Stack direction={{ xs: 'column', xl: 'row' }} spacing={2}>
        <Card sx={{ p: 2, flex: 1.1 }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Готовность раздела
          </Typography>
          <DashboardBox isOpen={popoverIsOpen} actions={updateProgressToggled} options={lists as EChartsOption} />
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={() => setPopoverOpen(true)}>
              Обновить прогресс
            </Button>
          </Box>
        </Card>

        <Card sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Реестр переданных файлов
          </Typography>
          <Registry />
        </Card>
      </Stack>

      <UpdateProgres
        isOpen={popoverIsOpen}
        value={value}
        projectId={Number(currentProjectId)}
        sectionId={sectionId}
        onClose={() => setPopoverOpen(false)}
      />
    </Stack>
  );
}
