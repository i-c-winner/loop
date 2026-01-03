import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
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
      sx={{alignSelf: props.myPost? 'flex-end': 'flex-start'}}
      className={styles.chatPost}  color='text.primary' direction="column" spacing={2}
    >
      <UserBadge name={props.name}/>
      <Box
        className={`${styles.text} ${props.myPost? styles.myPost: ''}`}
        sx={{
          backgroundColor: props.myPost?'primary.main':'background.default',
          color: props.myPost? 'text.secondary':'text.primary',
        }}
    >{props.text}

      </Box>
      <Typography color='text.primary' className={styles.answer}>Ответ</Typography>
    </Stack>
  );
}
export {ChatPost}
