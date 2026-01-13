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
      width: '100%',
      height: 'calc(100vh - 250px)',
      padding: 1,
      overflowY: 'auto'
    }}>
      <Box sx={{
        backgroundColor: 'background.paper',
        height: '100%',
        width: '100%',
        textAlign: 'center',
      }}>
        <Box>
          <Typography
            variant="h5"

            sx={{
              paddingTop: 2,
            }}
          >Строительство производственного здания по адресу: ул.Ленина 15А</Typography>
          <Typography variant={'h5'}>Прогресс по разделам</Typography>
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


      </Box>
    </Box>
  );
}

export default Home;
