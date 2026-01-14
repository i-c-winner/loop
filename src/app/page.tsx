import {Typography, Card, Box} from "@mui/material";
import style from './page.module.css'


function Home() {
  return (
    <Box className={style.root}>
      <Card
      sx={{
        width: '100%',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
      >
        <Typography
          sx={{
            textAlign: 'center',
          }}
          variant={'h1'}>Система учета технической документации</Typography>
        <Typography
          sx={{
            textAlign: 'center',
          }}
          variant={'subtitle2'}>Точность, прозрачность, полный контроль</Typography>
      </Card>

      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Card sx={{width: '20%', height: '350px', padding: '16px'}}></Card>
        <Card sx={{width: '20%', height: '350px', padding: '16px'}}></Card>
        <Card sx={{width: '20%', height: '350px', padding: '16px'}}></Card>
        <Card sx={{width: '20%', height: '350px', padding: '16px'}}></Card>


      </Box>


    </Box>
  );
}
export default Home;
