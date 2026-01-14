'use client'
import {DashboardBox} from "@/entities/dashboard/ui/dashboardBox";
import {options} from "@/shared/assets/data/pipeData";
import {useRouter} from "next/navigation";
import {Box, Typography,List, ListItem, ListItemText, IconButton, Card} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import {EChartsOption} from "echarts";;
import {InfoCard} from "@/widgets/infocard/ui/InfoCard";

function Home() {
  const router = useRouter()
  return (
      <Box sx={{
        padding: '128px 64px',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        gap: '64px',
        flexDirection: 'column',
        }}>
        <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          justifyContent: 'space-between',
          alignItems: 'start',
        }}
        >
          <Typography
            variant="h5"
            sx={{
              width: '100%',
              textAlign: 'start',
            }}
          >Строительство производственного здания по адресу:</Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: 'start',
              width: '100%',
            }}
          >ул.Ленина 15А</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              width: '100%',
            }}
          >
            <Typography
            sx={{
              flexBasis: '25%'
            }}
            >Главный инженер</Typography>
            <Typography>Команда проекта</Typography>
          </Box>
        </Card>
        <Box sx={{
          display: 'flex',
          justifyContent: 'start',
          gap: '24px',
          // backgroundColor: 'background.paper',
          width: '100%',
        }}>
          <InfoCard parms={{
            title: 'Общий прогесс:',
            value: '70%',
            subtitle: 'По графику'
          }}></InfoCard>
          <InfoCard parms={{
            title: 'Соблдюдение сроков:',
            value: '83%',
            subtitle: 'По графику'
          }}></InfoCard>
          <InfoCard parms={{
            title: 'Наличие проблем:',
            value: '3',
            subtitle: 'Имеются'
          }}></InfoCard>
          <InfoCard parms={{
            title: 'Бюджет:',
            value: '$150 000',
            subtitle: 'Согласно бюджету'
          }}></InfoCard>
        </Box>
        <Card
        sx={{
          padding: '16px',
          width: '100%',
        }}
        >
          <Typography variant={'h4'}>
            Прогресс разделов рабочей документации
          </Typography>
          <DashboardBox actions={(_, list)=>{
            router.push(`/project/${list}`)
            console.log(list)
          }} options={options as EChartsOption}/>
        </Card>


          <Card>
            <Typography variant={'h5'}>Последние события</Typography>
            <List sx={{
              margin: "0 auto",
              width: '100%', maxWidth: 360, padding: 5,}}>
              {[1, 2, 3].map((value) => (
                <ListItem
                  key={value}
                  disableGutters
                  secondaryAction={
                    <IconButton aria-label="comment">
                      <CommentIcon/>
                    </IconButton>
                  }
                >
                  <ListItemText primary={`Last action _ 0${value}/03/25`}/>
                </ListItem>
              ))}
            </List>
          </Card>
      </Box>
  );
}

export default Home;
