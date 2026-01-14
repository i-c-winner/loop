import Box from '@mui/material/Box';
import {ProjectInfo} from '@/entities/mainFrame/ui/ProjectInfo'
import data from '../../../shared/assets/data/sections.json'
import technicalTasks from '../../../shared/assets/data/technicalTasks.json'

function Description() {
  return <Box
    sx={{
      marginLeft: 2,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto'
    }}
  >

    <ProjectInfo data={data} title={'Реестр страниц раздела АР'}></ProjectInfo>
  </Box>
}

export {Description}
