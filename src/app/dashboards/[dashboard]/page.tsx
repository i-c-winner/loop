import Box from '@mui/material/Box'
import {DashboardBox} from '@/entities/dashboard/dashboardBox'
import {lists} from "@/shared/assets/data/pipeData";
import styles from './dashboards.module.scss'
import {EChartsOption} from "echarts";

const myOptions= lists as EChartsOption

function Page() {
  return <Box className={styles.dashboards} >
    <DashboardBox options={myOptions} />
  </Box>
}

export default Page
