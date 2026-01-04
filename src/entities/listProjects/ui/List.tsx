'use client'

/**
 * TODO cделать клиентским компонента
 */
import {Box, List, ListItem, Button, Typography} from '@mui/material';
import styles from './listProjects.module.scss'
import {CONSTANTS} from "@/shared/config/constants/constant";
import {redirect} from "next/navigation";
import {ButtonClickAction} from "@mui/base";

const nodes= Object.values(CONSTANTS.SECTIONS)
export default function BasicSimpleTreeView() {
  function handlerClick(event: React.MouseEvent<HTMLButtonElement>) {
    redirect(`section/${event.currentTarget.textContent}`)
  }
  return (
    <Box className={styles.list} sx={{ color: 'text.primary'}}>
      <List>
        {nodes.map((node) => (
           <ListItem key={node}>
             <Button
               onClick={handlerClick}
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

