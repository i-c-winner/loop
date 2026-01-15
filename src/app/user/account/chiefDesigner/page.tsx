import {Box, Card, Typography} from "@mui/material";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
function Page() {
  return <Box sx={{
    width: '100%',
    padding: '128px 64px',
    display: 'flex',
    flexDirection: 'column',
  }}>

    <Card sx={{
      width: '100%',
      padding: '16px',
    }}><Typography variant={'h4'}>Строительство производственного здания по адресу:</Typography>
    <Typography variant={'subtitle1'}>ул. Пушкина 25А</Typography>
    </Card>
    <Typography sx={{
      padding: '64px',
      fontWeight: 'bold',
      fontSize: '2rem',
    }} variant={"body1"}>Личный кабинет</Typography>
    <Box sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <Card
      sx={{
        flexBasis: '30%',
        padding: '16px',
      }}
      >
        <Typography variant={'body1'}>Комплект рабочей документации</Typography>
        <DataSaverOnIcon
        />
      </Card>
      <Card
        sx={{
          flexBasis: '30%',
          padding: '16px',
        }}
      >
        <Typography variant={'body1'}>Список разработчиков</Typography>
        <DataSaverOnIcon
        />
      </Card>
      <Card
        sx={{
          flexBasis: '30%',
          padding: '16px',
        }}
      >
        <Typography variant={'body1'}>Список других лиц</Typography>
        <DataSaverOnIcon
        />
      </Card>
    </Box>
  </Box>
}
export default Page
