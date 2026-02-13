'use client';

import React, { useState, useRef } from 'react';
import { Box, TextField, IconButton, InputAdornment, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import styles from './chatInput.module.scss';

interface ChatInputProps {
  onSendMessage: (text: string, file?: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (message.trim() || file) {
      onSendMessage(message, file || undefined);
      setMessage('');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
      }}
      className={styles.chatInputContainer}>
      <Box className={styles.inputContainer}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Введите сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color={'secondary'} onClick={() => fileInputRef.current?.click()}>
                  <AttachFileIcon />
                </IconButton>
                <IconButton color={'secondary'} onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Box>

      {file && (
        <Box className={styles.filePreview}>
          <span className={styles.fileName}>{file.name}</span>
          <Button
            size="small"
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
    </Box>
  );
};

export default ChatInput;
