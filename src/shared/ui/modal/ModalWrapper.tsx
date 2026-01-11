'use client'
import {Modal, Box} from "@mui/material";
import React, {useRef} from "react";

function ModalWrapper() {

  const [child, setChild] = React.useState<React.ReactElement>(<p></p>);
  const [modalOpen, setModalOpen] = React.useState(true);

  return <Modal
      open={modalOpen}
      onClose={(event, reason) => {
        if (reason === 'escapeKeyDown') {
         setModalOpen(false)
        }
      }}
    >{child}</Modal>
}

export {ModalWrapper};
