import styles from './page.module.scss'
import {ListDesigners} from "@/entities/listDesigners/ui/ListDesigners";
import {Account} from "@/entities/account/ui/Account";
import {Typography, Box} from "@mui/material";
import Table from "@/entities/table/ui/Table";
import Chat from "@/entities/chat/ui/Chat";
function Page() {
  return <Box
    className={styles.sections}>
    <ListDesigners></ListDesigners>
    <div className={styles.listSections}>
      <Typography variant='h5' color='primary'>Список разделов рабочей документации</Typography>
      <Table></Table>
      <Chat/>
    </div>
    <Account></Account>
  </Box>
}
export default Page
