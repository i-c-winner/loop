'use client';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import { TimelineSeparator, TimelineConnector, TimelineOppositeContent } from '@mui/lab';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box, Typography } from '@mui/material';

function TimelineBasic() {
  return (
    <Box sx={{ width: '100%' }}>
      <Timeline sx={{ m: 0, p: 0 }}>
        <TimelineItem>
          <TimelineOppositeContent sx={{ flex: 0.4, color: 'text.secondary', fontSize: 12 }}>
            05/05/2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2">Version 1.0</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ flex: 0.4, color: 'text.secondary', fontSize: 12 }}>
            15/07/2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2">Version 2.0</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ flex: 0.4, color: 'text.secondary', fontSize: 12 }}>
            05/08/2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="success" />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2">Version 3.0</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}

export default TimelineBasic;
