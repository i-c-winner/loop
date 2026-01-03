import Box from '@mui/material/Box';
import {ProjectInfo} from '@/entities/projectInfo/ui/ProjectInfo'
import data from '../../../shared/assets/data/sections.json'
import technicalTasks from '../../../shared/assets/data/technicalTasks.json'

console.log(data)

function Description() {
  return <Box
    sx={{
      marginLeft: 2,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    }}
  >

    <ProjectInfo data={data} title={'Реестр страниц раздела АР'}></ProjectInfo>
    <ProjectInfo data={technicalTasks} title={'Версии технических заданий'}></ProjectInfo>
  </Box>
}

export {Description}
