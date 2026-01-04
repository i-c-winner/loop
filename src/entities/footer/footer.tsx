import Box from '@mui/material/Box';
import styles from './footer.module.scss'

function Footer() {
  return <Box className={styles.footerWrapper}
  >
    <Box
      className={styles.footer}
    sx={{
      backgroundColor: 'background.paper',
    }}>
      FOOTER
    </Box>
  </Box>
}

export {Footer}
