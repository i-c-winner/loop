'use client'
import {Dialog} from "@mui/material";
import React, {useContext} from "react";
import {MyContext} from "@/app/providers/MyContext";


function DialogWrapper() {
  const context = useContext(MyContext);
  const {contextChildren, isOpen} = context.modal as {
    contextChildren: React.ReactElement, isOpen: boolean
  };
  const {closeModal} = context;

  function handleClose() {
    closeModal()
  }

  return <Dialog
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    open={isOpen}
    onClose={(event, reason) => {
      if (reason === 'escapeKeyDown') {
        handleClose()
      }

    }}
  >{contextChildren}</Dialog>
}

export {DialogWrapper};
