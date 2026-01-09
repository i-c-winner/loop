'use client'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import styles from './page.module.scss'
import {Box} from '@mui/material'
import Typography from "@mui/material/Typography";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

export default function List_1 () {
  return  <Box
  className={styles.listWrapper}
  >
    <Box
      sx={{
        overflowY: 'auto',
        padding: 1,
        paddingTop: 0,
        width: '300px',
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
        <TimelineItem >
          <TimelineOppositeContent color="textSecondary">
            10.01.2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent color='text.primary'>Версия 1</TimelineContent>
        </TimelineItem>

        {/* Справа */}
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            01.02.2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent color='text.primary'>Версия 2</TimelineContent>
        </TimelineItem>

        {/* Слева */}
        <TimelineItem >
          <TimelineOppositeContent color="textSecondary">
            01.03.2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent color='text.primary'>Версия 3</TimelineContent>
        </TimelineItem>

        {/* Справа */}
        <TimelineItem >
          <TimelineOppositeContent color="primary.main">
            15.03.2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent color='primary.main'>Версия 4</TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
    <Box
      className={styles.swgWrapper}
    >
      <Box
        className={styles.window}
        sx={{
        backgroundColor: 'background.paper',
      }}>
        <Typography color='text.secondary' variant='h4'>Архитектурные решения. Версия 4 / 15.03.25
        </Typography>
        <Box
          className={styles.swg}>
          <Typography
            className={styles.swgText}
            variant='body1' color='red'>Тут можно будет редактировать SWG файлы</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
}

