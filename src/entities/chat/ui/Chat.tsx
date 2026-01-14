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
        width: '55%',
        margin: '0 auto',
        padding: 1,
        height: 'calc(100vh - 450px)',
        overflowY: 'auto',
        texAlign: 'center',
        paddingBottom: 0,
      }}
    >

      <Box
        sx={{
          overflowY: 'auto',
          backgroundColor: 'background.paper'}}
      >
        <Box
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
        </Box>
      </Box>
      <ChatInput onSendMessage={handleSendMessage} />
    </Box>
  )
}

export {Chat}
