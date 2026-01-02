import Box from '@mui/material/Box';
import {ChatPost} from "@/widgets/chatPost/ui/ChatPost";
import styles from './chat.module.scss'


function Chat() {
  return (
    <Box
      sx={{
        padding: 1,
      }}

    >
      <Box
        className={styles.chat}
        sx={{backgroundColor: 'background.paper'}}
      >
        <Box className={styles.box}
        >
          <ChatPost myPost={true} name='Ivanov' text="message from Ivanov"/>
          <ChatPost name='Petrov' text="message from Petrov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost myPost={true} name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
          <ChatPost name='Sidorov' text="message from Sidorov"/>
        </Box>
      </Box>

    </Box>
  )
}

export {Chat}
