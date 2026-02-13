import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  Stack,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Controller, useFieldArray} from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";

type SectionCardProps = {
  control: any;
  index: number;
  onRemove: () => void;
};

const SectionCard: React.FC<SectionCardProps> = ({
                                                   control,
                                                   index,
                                                   onRemove
                                                 }) => {
  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control,
    name: `sections.${index}.executors`
  });

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Controller
              name={`sections.${index}.title`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Название раздела"
                  fullWidth
                />
              )}
            />

            <IconButton color="error" onClick={onRemove}>
              <DeleteIcon />
            </IconButton>
          </Stack>

          <Typography variant="subtitle1">
            Исполнители
          </Typography>

          <Stack spacing={1}>
            {fields.map((executor, executorIndex) => (
              <Stack
                key={executor.id}
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Controller
                  name={`sections.${index}.executors.${executorIndex}.name`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="ФИО"
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name={`sections.${index}.executors.${executorIndex}.role`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Роль"
                      fullWidth
                    />
                  )}
                />

                <IconButton
                  color="error"
                  onClick={() => remove(executorIndex)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
          </Stack>

          <Button
            startIcon={<AddIcon />}
            onClick={() => append({ name: '', role: '' })}
          >
            Добавить исполнителя
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export {
  SectionCard
};
