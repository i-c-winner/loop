'use client'
import {DashboardBox} from "@/entities/dashboard/ui/dashboardBox";
import {options} from "@/shared/assets/data/pipeData";
import {useRouter} from "next/navigation";
import {Box, Typography,List, ListItem, ListItemText, IconButton} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import {EChartsOption} from "echarts";

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
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 5px',
          padding: 2,
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
        </Box>
          <Typography sx={ {
          }} variant={'h5'}>Прогресс по разделам</Typography>

          <DashboardBox actions={(_, list)=>{
            router.push(`/project/${list}`)
            console.log(list)
          }} options={options as EChartsOption}/>
          <Box sx={{
          }}>
            <Typography variant={'h5'}>Последние события</Typography>
            <List sx={{
              margin: "0 auto",
              width: '100%', maxWidth: 360, bgcolor: 'background.default', padding: 5,}}>
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
          </Box>
      </Box>
  );
}

export default Home;
