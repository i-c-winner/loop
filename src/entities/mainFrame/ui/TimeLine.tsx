import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const leftColor='red'
const rightColor='green'

function TimeLine() {
  return (
    <Box sx={{
      minWidth: '500px',
      boxSizing: 'border-box',
      height: '100%',
      overflowY: 'hidden',
      pr: 1,
      pb: 1,
    }}>
    <Timeline
      // ставим right или alternate, чтобы произвольные позиции работали
      position="right"
      sx={{
        margin: 0,
        height: '100%',
         backgroundColor: 'background.paper',
        '& .MuiTimelineItem-root': {
          boxSizing: 'border-box', // обязательно для каждого элемента
          padding: '8px 0',         // или что тебе нужно
        },
        '& .MuiTimelineItem-root:before': {
          display: 'none', // убираем служебную колонку MUI
        },
      }}
    >
      {/* Слева */}
      <TimelineItem position="left">
        <TimelineOppositeContent color="textSecondary">
          10.01.2025
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent color={leftColor}>Техническое задание. Версия 2</TimelineContent>
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
  );
}

export { TimeLine };
