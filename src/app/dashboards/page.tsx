import Box from '@mui/material/Box'
import {DashboardBox} from '@/entities/dashboard/dashboardBox'
import styles from './dashboards.module.scss'

function Page() {
  return <Box className={styles.dashboards} >
    <DashboardBox />
  </Box>
}

export default Page
