import { Box, Card, Grid, Stack, Typography } from '@mui/material';

const FEATURES = [
  {
    title: 'Хранение документации',
    text: 'Комплекты рабочих чертежей всегда под рукой: просмотр, поиск и быстрый доступ к версиям.',
  },
  {
    title: 'Контроль версий',
    text: 'История изменений по каждому разделу и прозрачный контроль сроков передачи данных.',
  },
  {
    title: 'Мониторинг готовности',
    text: 'Единая картина прогресса проектирования и контроль статуса выполнения в реальном времени.',
  },
  {
    title: 'Командная работа',
    text: 'Встроенные коммуникации между исполнителями с фиксацией сообщений и переданных материалов.',
  },
];

function Home() {
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Card
        sx={{
          p: { xs: 3, md: 5 },
          background:
            'linear-gradient(120deg, rgba(15,111,255,0.12) 0%, rgba(14,167,106,0.1) 55%, rgba(255,255,255,0.85) 100%)',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h2">Система учета технической документации</Typography>
          <Typography variant="h6" color="text.secondary">
            Точность, прозрачность и полный контроль на всех этапах проекта.
          </Typography>
        </Stack>
      </Card>

      <Grid container spacing={2}>
        {FEATURES.map((feature) => (
          <Grid key={feature.title} item xs={12} sm={6} lg={3}>
            <Card sx={{ p: 3, minHeight: 220 }}>
              <Stack spacing={1.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #0F6FFF 0%, #0EA76A 100%)',
                  }}
                />
                <Typography variant="h6">{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.text}
                </Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default Home;
