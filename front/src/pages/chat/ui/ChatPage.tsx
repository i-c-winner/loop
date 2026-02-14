import { Chat } from '@/entities/chat/ui/Chat';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box, Card, Stack, Typography } from '@mui/material';

function ChatPage() {
  return (
    <Box sx={{ width: '100%' }}>
      <Card sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <ChatBubbleOutlineIcon color="primary" />
            <Typography variant="h5">Командный чат</Typography>
          </Stack>
          <Chat />
        </Stack>
      </Card>
    </Box>
  );
}

export default ChatPage;
