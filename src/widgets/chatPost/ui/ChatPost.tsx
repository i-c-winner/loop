import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {UserBadge} from "@/widgets/userBadge/ui/UserBadge"
import styles from './chatPost.module.scss'

export default function ChatPost(props: {
  name: string,
  text: string
  myPost?: boolean
}) {

  return (
    <Stack
      sx={{alignSelf: props.myPost? 'flex-end': 'flex-start'}}
      className={styles.chatPost}  color='text.primary' direction="row" spacing={2}>
      <UserBadge name={props.name.slice(0, 1)[0]}/>
      <Box className={`${styles.text} ${props.myPost? styles.myPost: ''}`}>{props.text}</Box>
    </Stack>
  );
}
export {ChatPost}
