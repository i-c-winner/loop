import Box from '@mui/material/Box';
import {ProjectInfo} from '@/entities/projectInfo/ui/ProjectInfo'
import Typography from "@mui/material/Typography";
import styles from './mainFrame.module.scss'

function Description() {
  return <Box
    sx={{
      marginLeft: 2,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    }}
  >

    <ProjectInfo title={'Реестр страниц раздела АР'}></ProjectInfo>
    <ProjectInfo title={'Версии технических заданий'}></ProjectInfo>
  </Box>
}

export {Description}
