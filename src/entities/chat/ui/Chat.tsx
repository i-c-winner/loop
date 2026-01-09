'use client';

import Box from '@mui/material/Box';
import {ChatPost} from "@/widgets/chatPost/ui/ChatPost";
import styles from './chat.module.scss'
import Typography from "@mui/material/Typography";
import ChatInput from './ChatInput';

function Chat() {
  const handleSendMessage = (text: string, file?: File) => {
    // Здесь будет логика отправки сообщения
    console.log('Sending message:', text, file);
  };

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
          <Typography   color='secondary'
          className={styles.title}
          >Общий чат</Typography>
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
        </Box>

        <ChatInput onSendMessage={handleSendMessage} />

      </Box>

    </Box>
  )
}

export {Chat}
