import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './chatPost.module.scss'

export default function ChatPost(props: {
  name: string,
  text: string
  myPost?: boolean
}) {

  return (
    <Stack className={styles.chatPost}  direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Typography variant='body1'>{props.name}</Typography>
      <Box className={`${styles.text} ${props.myPost? styles.myPost: ''}`}>{props.text}</Box>
    </Stack>
  );
}
export {ChatPost}
