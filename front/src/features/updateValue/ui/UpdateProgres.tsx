import {Popover, Box, Typography} from '@mui/material'
import {Spinner} from "@/widgets/spinner/ui/Spinner";
import React from "react";

function UpdateProgres({isOpen, value, onClose, projectId: projectIdProp, sectionId: sectionIdProp}: {
  isOpen: boolean,
  onClose: () => void,
  value: number,
  projectId?: number | null,
  sectionId?: number | null,
}) {
  const [currentValue, setCurrentValue] = React.useState(value);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentValue(value);
    }
  }, [isOpen, value]);

  async function submitProgress() {
    // Static mode: сохраняем прогресс только локально (без бекенда).
    const storedProjectId = Number(localStorage.getItem("currentProjectId"));
    const storedSectionId = Number(localStorage.getItem("currentSectionId"));
    const projectId = Number.isFinite(Number(projectIdProp)) ? Number(projectIdProp) : storedProjectId;
    const sectionId = Number.isFinite(Number(sectionIdProp)) ? Number(sectionIdProp) : storedSectionId;
    if (!Number.isFinite(projectId) || !Number.isFinite(sectionId)) return;

    const key = `progress:${projectId}:${sectionId}`;
    localStorage.setItem(key, String(currentValue));
  }

  return <Box>
    <Popover
      onClose={async () => {
        await submitProgress();
        onClose();
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
