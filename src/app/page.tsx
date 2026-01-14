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
        <Card sx={{
          width: '20%',
          height: '350px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          justifyContent: 'center',
        }}>
          <Typography
            variant={'h5'}
            sx={{
              textAlign: 'center',
          }}>Хранение рабочей документации</Typography>
          <Typography
            variant={'subtitle1'}
            sx={{
              textAlign: 'center',
            }}>Система хранит комплекты рабочих чертежей. Позволяет иметь доступ, просматривать, скачивать</Typography>
        </Card>
        <Card sx={{
          width: '20%',
          height: '350px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <Typography
            variant={'h5'}
            sx={{
              textAlign: 'center',
            }}>Учёт версионности</Typography>
          <Typography
            variant={'subtitle1'}
            sx={{
              textAlign: 'center',
            }}>Система позволяет остлеживать версионность, актуальность разделов в любой момент.
            Контроль даты передачи Технических заданий, готовых разделов от смежных исполнителей.</Typography>
        </Card>
        <Card sx={{
          width: '20%',
          height: '350px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          justifyContent: 'center',
        }}>
          <Typography
            variant={'h5'}
            sx={{
              textAlign: 'center',
            }}>Контроль готовности</Typography>
          <Typography
            variant={'subtitle1'}
            sx={{
              textAlign: 'center',
            }}>Система позволяет остлеживать процесс проектирования, отслеживать готовность рабочей документации</Typography>
        </Card>
        <Card sx={{
          width: '20%',
          height: '350px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          justifyContent: 'center',
        }}>
          <Typography
            variant={'h5'}
            sx={{
              textAlign: 'center',
            }}>Взаимодействие смежных исполнителей</Typography>
          <Typography
            variant={'subtitle1'}
            sx={{
              textAlign: 'center',
            }}>Система еммет встроенный чат. Который позволяет напрямую общаться между исполнителями, редактиржовать
          чертежи "на ходу", отправлять файлы. Все переданные файлы сохраняются и позволяют отследить даты передачи</Typography>
        </Card>


      </Box>


    </Box>
  );
}
export default Home;
