import Box from '@mui/material/Box';
import {ProjectInfo} from '@/entities/projectInfo/ui/ProjectInfo'
import Typography from "@mui/material/Typography";
import styles from './mainFrame.module.scss'

function Description() {
  return <Box
    sx={{
      backgroundColor: 'background.paper',
      padding: 1,
      flexGrow: 1,
    }}
  >
    <Typography classes={styles.title} color='text.primary'>Реестр страниц раздела АР</Typography>
    <ProjectInfo></ProjectInfo>
    <Typography>Версии техничесого задания</Typography>
    <ProjectInfo></ProjectInfo>
  </Box>
}

export {Description}
