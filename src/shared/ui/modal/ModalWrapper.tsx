'use client'
import {Modal, Box} from "@mui/material";
import React, {useRef, useContext} from "react";
import {MyContext} from "@/app/providers/MyContext";


function ModalWrapper() {
  const context = useContext(MyContext);
  const {contextChildren, isOpen} = context.modal as {
    contextChildren: React.ReactElement, isOpen: boolean
  };
  const {closeModal} = context;

  function handleClose() {
    closeModal()
  }
  return <Modal
      open={isOpen}
      onClose={(event, reason) => {
        if (reason === 'escapeKeyDown') {
         handleClose()
        }

      }}
    >{contextChildren}</Modal>
}

export {ModalWrapper};
