import Box from '@mui/material/Box'
import {DashboardBox} from '@/entities/dashboard/ui/dashboardBox'
import {options} from "@/shared/assets/data/pipeData";
import styles from './dashboards.module.scss'
import {EChartsOption} from "echarts";

const myOptions = options as EChartsOption

function Page() {
  return <Box className={styles.dashboardsWrapper}>
    <DashboardBox options={myOptions}/>
  </Box>
}

export default Page
