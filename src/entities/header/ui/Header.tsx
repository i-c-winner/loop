import styles from './header.module.scss'
import Box from '@mui/material/Box';
function Header() {
  return <Box sx={{
    padding: 1,
  }}>
    <Box
      className={styles.header}
      sx={{
    backgroundColor: 'background.paper',
    }}>
     <Box >Header</Box>
    </Box>
  </Box>;
}
export {Header}
