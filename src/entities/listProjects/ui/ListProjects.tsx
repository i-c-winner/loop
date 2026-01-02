import Box from '@mui/material/Box';
import List_ from "@/entities/listProjects/ui/List";
import styles from './listProjects.module.scss'

function ListProjects() {
  return <Box sx={{
    padding: 1,
  }}
  >
    <Box
      sx={{
        color: 'primary',
        backgroundColor: 'background.paper',
      }}
      className={styles.listProjectsWrapper}
    >
      <List_></List_>

    </Box>
  </Box>


}

export {ListProjects}
