'use client'
// import Table from '@mui/joy/Table';
import Table from '@mui/material/Table';
import {Done, Close, OpenInNew, Download} from "@mui/icons-material";
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {UserBadge} from "@/widgets/userBadge/ui/UserBadge"
import styles from './table.module.scss'
import Typography from "@mui/material/Typography";

function ProjectInfo(props: {title: string}) {
  return (
    <TableContainer className={styles.table}
      sx={{
        color: 'text.primary',
        backgroundColor: 'background.paper',
      }}
    >
      <Typography sx={{
        margin: "16px auto"
      }} className={styles.title} color='primary'>{props.title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Раздел</TableCell>
            <TableCell>Утверждено</TableCell>
            <TableCell>Дата последней версии</TableCell>

            <TableCell>Исполнитель</TableCell>
            <TableCell>Открыть</TableCell>
            <TableCell>Скачать</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>ГП</TableCell>
            <TableCell><Done/></TableCell>
            <TableCell>03.02.25</TableCell>
            <TableCell>Исполнитель</TableCell>
            <TableCell>
              <OpenInNew />
            </TableCell>
            <TableCell>
              <Download />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ГП</TableCell>
            <TableCell><Done/></TableCell>
            <TableCell>03.02.25</TableCell>
            <TableCell><UserBadge name={'Ivanov'}></UserBadge></TableCell>
            <TableCell>
              <OpenInNew />
            </TableCell>
            <TableCell>
              <Download />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export {ProjectInfo}
