import React from "react";
import { useForm, Controller } from "react-hook-form";
import {Input} from '@mui/material'
import styles from '../styles/creater.module.scss'

interface IFormInput {
  firstName: string;
  lastName: string;
  newSection: string;
  designer: string;
  iceCreamType: { label: string; value: string };
}

const CreateOtherUser = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data));
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}>
      <label>Добавить пользователя</label>
      <Controller
        render={({ field }) => <Input {...field}></Input>}
        name="firstName"
        control={control}
        defaultValue=""
      />
      <input type="submit" />
    </form>
  );
};

export {CreateOtherUser}
