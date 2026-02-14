'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChatInput from './ChatInput';

function Chat() {
  const messages = [
    { name: 'Ivanov', text: 'message from Ivanov', myPost: true },
    { name: 'Petrov', text: 'message from Petrov' },
    { name: 'Sidorov', text: 'message from Sidorov' },
    { name: 'Sidorov', text: 'message from Sidorov' },
    { name: 'Sidorov', text: 'message from Sidorov' },
  ];

  const handleSendMessage = (text: string, file?: File) => {
    console.log('Sending message:', text, file);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          p: 2,
          backgroundColor: 'background.paper',
          maxHeight: '55vh',
          overflowY: 'auto',
        }}
      >
        <Stack spacing={1.5}>
          {messages.map((message, index) => (
            <Stack
              key={`${message.name}-${index}`}
              alignItems={message.myPost ? 'flex-end' : 'flex-start'}
              spacing={0.75}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                {!message.myPost && <Avatar sx={{ width: 24, height: 24 }}>{message.name[0]}</Avatar>}
                <Typography variant="caption" color="text.secondary">
                  {message.name}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{
                  maxWidth: 360,
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: message.myPost ? 'primary.light' : 'divider',
                  backgroundColor: message.myPost ? 'primary.main' : '#F8FBFF',
                  color: message.myPost ? 'primary.contrastText' : 'text.primary',
                }}
              >
                {message.text}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
      <Divider />
      <ChatInput onSendMessage={handleSendMessage} />
    </Box>
  );
}

export { Chat };
