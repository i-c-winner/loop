'use client';

import React, { useRef, useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';

interface ChatInputProps {
  onSendMessage: (text: string, file?: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!message.trim() && !file) {
      return;
    }

    onSendMessage(message, file || undefined);
    setMessage('');
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Stack spacing={1.25}>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={message}
        placeholder="Введите сообщение..."
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" onClick={() => fileInputRef.current?.click()}>
                <AttachFileIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

      {file && (
        <Box
          sx={{
            px: 1.5,
            py: 1,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {file.name}
          </Typography>
          <Button
            size="small"
            variant="text"
            onClick={() => {
              setFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          >
            Удалить
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default ChatInput;
