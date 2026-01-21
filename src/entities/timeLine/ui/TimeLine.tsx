import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import {TimelineSeparator, TimelineConnector, TimelineOppositeContent} from '@mui/lab';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import {Typography, Box} from "@mui/material";

function TimelineBasic() {
  return (
    <Box>
      <Typography variant={'h5'}>Версии проекта</Typography>
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent>05/05/2025</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Version 1.0</TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent>15/07/2025</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Version 2.0</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>05/08/2025</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Version 3.0</TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>

  );
}

export {TimelineBasic}
