import {Box, List, ListItem, Button, Typography} from '@mui/material';
import styles from './listProjects.module.scss'
import {CONSTANTS} from "@/shared/config/constants/constant";

const nodes= Object.values(CONSTANTS.SECTIONS)
export default function BasicSimpleTreeView() {
  return (
    <Box className={styles.list} sx={{ color: 'text.primary'}}>
      <List>
        {nodes.map((node) => (
           <ListItem key={node}>
             <Button
               sx={{
                 '&:hover': {
                   backgroundColor: 'initial'
               }}}
               variant='text' disableFocusRipple={true}><Typography color='text.primary'>{node}</Typography></Button>
             </ListItem>
        ))}
      </List>
    </Box>
  );
}

