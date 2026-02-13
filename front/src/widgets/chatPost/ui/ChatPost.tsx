import * as React from 'react';
import {Box, Card, Stack} from '@mui/material';
import {UserBadge} from "@/widgets/userBadge/ui/UserBadge"
import Typography from "@mui/material/Typography";
import styles from './chatPost.module.scss'

export default function ChatPost(props: {
  name: string,
  text: string
  myPost?: boolean
}) {

  return (
    <Stack
      sx={{
        alignItems: props.myPost? 'flex-end': 'flex-start'}}
      className={styles.chatPost}  color='text.primary' direction="column" spacing={2}
    >
      <UserBadge name={props.name}/>
      <Box
        className={`${styles.text} ${props.myPost? styles.myPost: ''}`}
        sx={{
          backgroundColor: props.myPost?'#d0dedf':'#b1e5ff',
          color: props.myPost? 'text.secondary':'text.primary',
        }}
    >{props.text}

      </Box>
      <Typography
        sx={{
         alignSelf: props.myPost? 'flex-end': 'flex-start',
        }}
        color='text.primary' >Ответ</Typography>
    </Stack>
  );
}
export {ChatPost}
