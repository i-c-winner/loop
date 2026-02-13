import React from "react";
import {useForm, Controller} from "react-hook-form";
import {Stack, Input, List, ListItem, IconButton, Button, Typography} from '@mui/material'
import styles from "@/features/project/styles/creater.module.scss";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";


interface IFormInput {
  firstName: string;
  lastName: string;
  newSection: string;
  designer: string;
  iceCreamType: { label: string; value: string };
}

const CreateSections = (props: {
  onClose: ()=>void
}) => {
  const {control, handleSubmit} = useForm<IFormInput>();
  const [sections, setSections] = React.useState(['Пояснительная записка', 'Генплан', 'Архитектурные решения'])
  const [newSection, setNewSection] = React.useState<string>('')
  const [disabled, setDisabled] = React.useState<boolean>(true)

  function onChangeSection(event: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent) {
    const section = event.target instanceof HTMLInputElement ? event.target.value : ''
    setNewSection(section)
  }

  const onSubmit = (data: IFormInput) => {
    console.log(sections)
    setDisabled(true)
    props.onClose()
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction={'row'}>
        <label>Новый раздел</label>
        <Controller
          render={({field}) => {
            const {onChange, ...rest} = field
            return <Input
              {...rest}
              value={newSection}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange(event)
                onChangeSection(event) // твоя логика
              }}
              style={{
                margin: '16px',
                marginTop: '0',
                flex: "0 0 250px",
              }}/>
          }}
          name="newSection"
          control={control}
          defaultValue=""
        />
        <IconButton
          onClick={() => {
            setDisabled(false)
            setSections([...sections, newSection])
            setNewSection('')
          }}
          aria-label="delete">
        </IconButton>
      </Stack>
      <Button
        sx={{
          color: 'initial',
        }}
        type="submit">  <DataSaverOnIcon
      /></Button>
    </form>
  );
};

export {CreateSections}
