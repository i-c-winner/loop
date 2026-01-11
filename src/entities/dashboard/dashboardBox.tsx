import {Box, Typography} from "@mui/material";
import {Dashboard} from "@/entities/dashboard/dashboard";
import {option, options} from "@/shared/assets/data/pipeData";
import {ECharts, EChartsOption} from "echarts";
import styles from './dashboard.module.scss'
import {Bar} from "@/widgets/charts/Bar";


function createMarqueeTitle(text: string) {
  return {
    graphic: {
      type: 'text',
      left: '100%',
      top: 10,
      style: {
        text,
        font: 'bold 18px Inter',
        fill: '#333'
      },
      keyframeAnimation: {
        duration: 8000,
        loop: true,
        keyframes: [
          { percent: 0, left: '100%' },
          { percent: 1, left: -300 }
        ]
      }
    }
  };
}

function DashboardBox(props: {
  options: EChartsOption
}) {
  return (
    <Box className={styles.dashboardBox}>
        <Box className={styles.mainDashboard}
             sx={{
               backgroundColor: 'background.paper',
             }}
        >
           <Box className={styles.general}>
             <Typography color={'secondary'}>DASHBOARD
             </Typography>
             <Dashboard
               option={option}
               size={800 }/>
           </Box>
          <Box
            sx={{
            }}
            className={styles.dashboards}>
            <Bar options={props.options}/>
          </Box>
        </Box>


    </Box>
  )
}

export {DashboardBox}
