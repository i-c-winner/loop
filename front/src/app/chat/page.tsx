import {Chat} from "@/entities/chat/ui/Chat";
import {Box, Card, Typography} from "@mui/material";

function ChatPage() {
  return (
    <Box sx={{width: '100%', padding: '128px 64px'}}>
      <Card>
        <Chat/>
      </Card>

    </Box>
  )
}

export default ChatPage
