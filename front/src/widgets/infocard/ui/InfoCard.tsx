import {Box, Typography, Card} from "@mui/material";

function InfoCard(props: {
  parms: {
    title: string,
    subtitle: string,
    value: string
  }
}) {
  return <Card sx={{
    padding: '16px',
    flexGrow: 1
  }}>
    <Typography sx={{
      variant: 'h6',
    }}>{props.parms.title}</Typography>
    <Typography sx={{
      fontWeight: 'bold',
      fontSize: '2rem',
    }}>
      {props.parms.value}
    </Typography>
    <Typography sx={{
      variant: 'subtitle1',
    }}>{props.parms.subtitle}</Typography>
  </Card>

}
export {InfoCard}
