import Box from '@mui/material/Box';
import {ProjectInfo} from '@/entities/projectInfo/ui/ProjectInfo'

function Description() {
  return <Box
    sx={{
      backgroundColor: 'background.paper',
      padding: 1,
    }}
  >
<ProjectInfo></ProjectInfo>
  </Box>
}

export {Description}
