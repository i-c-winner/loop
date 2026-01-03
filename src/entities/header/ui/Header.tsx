import styles from './header.module.scss'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

function Header() {
  return <Box
    sx={{
    padding: 1,
  }}>
    <Box
      sx={{
        color: 'text.primary',
        backgroundColor: 'background.paper',
      }}
      className={styles.header}
    >
      <Typography variant={'h4'} color={'primary'} >
        Строительство производственного здания по адресу: ул.Ленина 15А
      </Typography>
      <Typography variant={"body1"} color={'primary'}>
        Статистика по разделу АР
      </Typography>
    </Box>
  </Box>;
}

export {Header}
