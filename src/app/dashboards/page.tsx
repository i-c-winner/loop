import Box from '@mui/material/Box'
import {Dashboard} from '@/entities/dashboard/dashboard'
import styles from './dashboards.module.scss'

function Page() {
  return <Box className={styles.dashboards} >
    <Dashboard />
  </Box>
}

export default Page
