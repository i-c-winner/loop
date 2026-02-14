'use client';
import { Dialog } from '@mui/material';
import React, { useContext } from 'react';
import { MyContext } from '@/shared/lib/context/app-context';


function DialogWrapper() {
  const context = useContext(MyContext);
  const { contextChildren, isOpen } = context.modal as {
    contextChildren: React.ReactElement;
    isOpen: boolean;
  };
  const { closeModal } = context;

  function handleClose() {
    closeModal();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={(_, reason) => {
        if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
          handleClose();
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: '22px',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 30px 80px rgba(17,24,39,0.24)',
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          overflow: 'visible',
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(8, 18, 40, 0.4)',
          backdropFilter: 'blur(3px)',
        },
      }}
    >
      {contextChildren}
    </Dialog>
  );
}

export { DialogWrapper };
