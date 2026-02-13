import {Button, Box} from "@mui/material";
import {Spinner} from "@/widgets/spinner/ui/Spinner";

function ProgresUpdaterModal({value, list}:{value: number, list: string}) {
  return <Box>
    Введите сколько заверешенно для страницы {list}
    <Spinner defaultValue={value} setValue={null}/>
  </Box>
}

export {ProgresUpdaterModal}
