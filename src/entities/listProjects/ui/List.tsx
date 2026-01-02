import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {UserBadge} from "@/widgets/userBadge/ui/UserBadge"
import styles from './listProjects.module.scss'

const nodes=['pzu', 'ar', 'nvk', 'kz0']
export default function BasicSimpleTreeView() {
  return (
    <Box className={styles.list} sx={{ color: 'text.primary'}}>
      <SimpleTreeView defaultExpandedItems={nodes}>
        <TreeItem itemId="pzu" label="ПЗ">
          <UserBadge name={'Petrov'}/>
        </TreeItem>
        <TreeItem itemId="ar" label="ПЗУ">
          <UserBadge name={'Ivanov'}/>
        </TreeItem>
        <TreeItem itemId="nvk" label="ГП">
          <UserBadge name={'Кузнецов'}/>
        </TreeItem>
        <TreeItem itemId="kz0" label="АР">
          <UserBadge name={'Карпенко'}/>
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
}

