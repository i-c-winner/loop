import { Card, Stack, Typography } from '@mui/material';

function InfoCard(props: {
  parms: {
    title: string;
    subtitle: string;
    value: string;
  };
}) {
  return (
    <Card sx={{ p: 2.5, flexGrow: 1, minHeight: 156 }}>
      <Stack spacing={1}>
        <Typography variant="overline" color="text.secondary">
          {props.parms.title}
        </Typography>
        <Typography variant="h3">{props.parms.value}</Typography>
        <Typography variant="body2" color="text.secondary">
          {props.parms.subtitle}
        </Typography>
      </Stack>
    </Card>
  );
}

export { InfoCard };
