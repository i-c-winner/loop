import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {OpenInNew, Download} from "@mui/icons-material";
import {useBadge} from "@mui/base";
import styles from  './mainFrame.module.scss'
import {UserBadge} from "@/widgets/userBadge/ui/UserBadge";

function TimeLine() {
  return (
    <Box
      sx={{
      minWidth: '500px',
      boxSizing: 'border-box',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box
        className={styles.box}
        sx={{
        flex: 1,
        overflowY: 'auto',
        padding: 1,
        paddingTop: 0,
      }}>
      </Box>
        <TableContainer sx={{
          height: '100%',
          backgroundColor: 'background.paper',
          padding: 1,
          paddingBottom: 0,
          color: 'text.primary',
          boxSizing: 'border-box',
        }}>
          <Typography className={styles.title}
            color={'secondary'}>Реестр переданых файлов</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Наименование</TableCell>
                <TableCell>Автор</TableCell>
                <TableCell>Получатель</TableCell>
                <TableCell>Скачать</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>03.02.25</TableCell>
                <TableCell>Техническое задание</TableCell>
                <TableCell><UserBadge name={'Ivanov'}/></TableCell>
                <TableCell><UserBadge name={'Petrov'}/></TableCell>
                <TableCell>
                  <Download />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>15.03.25</TableCell>
                <TableCell>Лист 1, 2, 5-11</TableCell>
                <TableCell><UserBadge name={'Ivanov'}/></TableCell>
                <TableCell><UserBadge name={'Petrov'}/></TableCell>
                <TableCell>
                  <Download />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20.03.25</TableCell>
                <TableCell>Пояснительная записка</TableCell>
                <TableCell><UserBadge name={'Petrov'}/></TableCell>
                <TableCell><UserBadge name={'Ivanov'}/></TableCell>
                <TableCell>
                  <Download />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    </Box>
  );
}

export { TimeLine };
