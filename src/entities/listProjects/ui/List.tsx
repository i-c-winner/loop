import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import styles from './listProjects.module.scss'

export default function BasicSimpleTreeView() {
  return (
    <Box className={styles.list}>
      <SimpleTreeView>
        <TreeItem itemId="pzu" label="ПЗ">
          <TreeItem itemId="pzu-designer" label="Иванов" />

        </TreeItem>
        <TreeItem itemId="ar" label="ПЗУ">
          <TreeItem itemId="ar-designer" label="Петров" />
        </TreeItem>
        <TreeItem itemId="nvk" label="ГП">
          <TreeItem itemId="nvk-designer" label="Василенко" />
        </TreeItem>
        <TreeItem itemId="kz0" label="АР">
          <TreeItem itemId="kz0-designer" label="Кузнецов" />
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
}

