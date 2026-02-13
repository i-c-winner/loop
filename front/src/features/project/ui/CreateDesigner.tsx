import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

type FormValues = {
  name: string;
  password: string;
  status: 'active' | 'inactive';
  company: string;
  phone: string;
  email: string;
};

const CreateDesigner = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      password: '',
      status: 'active',
      company: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('USER DATA:', data);
    // отправка на backend
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 480,
        mx: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        Создание пользователя
      </Typography>

      <Controller
        name="name"
        control={control}
        rules={{ required: 'Имя обязательно' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Имя"
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: 'Пароль обязателен', minLength: 6 }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Пароль"
            type="password"
            error={!!errors.password}
            helperText={errors.password && 'Минимум 6 символов'}
            fullWidth
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField {...field} select label="Статус">
            <MenuItem value="active">Активный</MenuItem>
            <MenuItem value="inactive">Неактивный</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="company"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Компания" fullWidth />
        )}
      />

      <Controller
        name="phone"
        control={control}
        rules={{
          pattern: {
            value: /^\+?[0-9\s()-]{7,}$/,
            message: 'Некорректный телефон',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Телефон"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email обязателен',
          pattern: {
            value: /^\S+@\S+$/,
            message: 'Некорректный email',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="E-mail"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
        )}
      />

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="outlined" onClick={() => reset()}>
          Отменить
        </Button>
        <Button variant="contained" type="submit">
          Создать пользователя
        </Button>
      </Box>
    </Box>
  );
};
 export {CreateDesigner}
