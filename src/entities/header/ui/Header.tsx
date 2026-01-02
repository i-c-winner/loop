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
      }}>
      <Typography
      className={styles.header}
      >
      HEADER
      </Typography>
    </Box>
  </Box>;
}

export {Header}
