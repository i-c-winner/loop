'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import NumberSpinner from './NumberSpinner';
import {Dispatch, SetStateAction, useRef} from "react";

function Spinner(props: { defaultValue: number, setValue: Dispatch<SetStateAction<number>>|null}) {
  function setChange(value: number|null ) {
    if (value === null) return
    if (props.setValue === null) return
    props.setValue(value)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '250px',
        flexDirection: 'column',
        gap: 4,
        justifyContent: 'center',
      }}
    >
      <NumberSpinner
        autoFocus={false}
        onValueChange={(value) => setChange(value)}
        defaultValue={props.defaultValue}
        min={0} max={100}/>
    </Box>
  );
}

export {Spinner}
