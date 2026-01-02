import Box from '@mui/material/Box';
import {ProjectInfo} from '@/entities/projectInfo/ui/ProjectInfo'
import Typography from "@mui/material/Typography";
import styles from './mainFrame.module.scss'

function Description() {
  return <Box
    sx={{
      backgroundColor: 'background.paper',
      padding: 1,
      marginLeft: 1,
      flexGrow: 1,
    }}
  >
    <Typography sx={{
      margin: "16px auto"
    }} className={styles.title} color='text.primary'>Реестр страниц раздела АР</Typography>
    <ProjectInfo></ProjectInfo>
    <Typography
      sx={{
        margin: "16px auto"
      }}
      className={styles.title} color='text.primary'>Версии техничесого задания</Typography>
    <ProjectInfo></ProjectInfo>
  </Box>
}

export {Description}
