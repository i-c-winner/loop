import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {OpenInNew, Download} from "@mui/icons-material";
import styles from  './mainFrame.module.scss'

const leftColor='red'
const rightColor='green'

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
        <Timeline
          position="right"
          sx={{
            padding: 1,
            margin: 0,
            height: '100%',
            backgroundColor: 'background.paper',
            '& .MuiTimelineItem-root': {
              boxSizing: 'border-box',
              padding: '8px 8px 8px 0px',
            },
            '& .MuiTimelineItem-root:before': {
              display: 'none', // убираем служебную колонку MUI
            },
          }}
        >
          <Typography color={'secondary'} className={styles.title}>Обмен файлами</Typography>
          <Box className={styles.legend}>
            <Typography color={leftColor}>Переденно от ГИП</Typography>
            <Typography color='text.primary' >/</Typography>
            <Typography color={rightColor}>Передано от исполнителя</Typography>
          </Box>
          <TimelineItem position="left">
            <TimelineOppositeContent color="textSecondary">
              10.01.2025
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent color={leftColor}>Техническое задание. Версия 1</TimelineContent>
          </TimelineItem>

          {/* Справа */}
          <TimelineItem position="right">
            <TimelineOppositeContent color="textSecondary">
              01.02.2025
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent color={rightColor}>Лист 1, 2, 5-11 переданы на согласование</TimelineContent>
          </TimelineItem>

          {/* Слева */}
          <TimelineItem position="left">
            <TimelineOppositeContent color="textSecondary">
              01.03.2025
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent color={leftColor}>Техническое задание. Версия 2</TimelineContent>
          </TimelineItem>

          {/* Справа */}
          <TimelineItem position="left">
            <TimelineOppositeContent color="textSecondary">
              15.03.2025
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent color={leftColor}>Техническое задание. Версия 3</TimelineContent>
          </TimelineItem>

        </Timeline>
      </Box>

      <Box
        className={styles.box}
        sx={{
        height: '50%',
        overflowY: 'auto',
        borderRadius: '4px',
        padding: 1,
        paddingBottom: 0
      }}>
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
                <TableCell>Открыть</TableCell>
                <TableCell>Скачать</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>03.02.25</TableCell>
                <TableCell>Техническое задание</TableCell>
                <TableCell>
                  <OpenInNew />
                </TableCell>
                <TableCell>
                  <Download />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>15.03.25</TableCell>
                <TableCell>Лист 1, 2, 5-11</TableCell>
                <TableCell>
                  <OpenInNew />
                </TableCell>
                <TableCell>
                  <Download />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20.03.25</TableCell>
                <TableCell>Пояснительная записка</TableCell>
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
      </Box>
    </Box>
  );
}

export { TimeLine };
