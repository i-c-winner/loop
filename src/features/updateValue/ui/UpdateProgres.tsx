import {Popover, Box, Typography} from '@mui/material'
import {Spinner} from "@/widgets/spinner/ui/Spinner";
import React from "react";

function UpdateProgres({isOpen, value, onClose}: {
  isOpen: boolean,
  onClose: () => void,
  value: number,
}) {
  const [currentValue, setCurrentValue] = React.useState(0);

  return <Box>
    <Popover
      onClose={() => {
        console.log('onClose', currentValue);
       onClose()
      }}
      open={isOpen} anchorOrigin={{vertical: 'center', horizontal: 'center'}}>
      <Box
      sx={{
        padding: 1,
        backgroundColor: 'background.paper',
      }}
      >
      <Typography>Введите объем выполненого</Typography>
      <Typography>по List_45 в процентах</Typography>
        <Spinner defaultValue={value} setValue={setCurrentValue }/>
      </Box>
    </Popover>

  </Box>
}

export {UpdateProgres}
