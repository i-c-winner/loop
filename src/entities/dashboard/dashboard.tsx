import {Box, Typography} from "@mui/material";
import styles from './dashboard.module.scss'

function Dashboard() {
  return <Box className={styles.dashboard}>
    <Box className={styles.mainDashboard}
         sx={{
           backgroundColor: 'background.paper',
         }}
    ><Typography color={'secondary'}>DASHBOARD</Typography></Box>
    <Box
      sx={{
        backgroundColor: 'background.paper',
      }}
      className={styles.dashboards}></Box>


  </Box>
}

export {Dashboard}
