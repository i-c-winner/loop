import Box from "@mui/material/Box";
import {TimeLine} from "@/entities/mainFrame/ui/TimeLine";
import styles from './mainFrame.module.scss'
import {Description} from "@/entities/mainFrame/ui/Description";
function MainFrame() {
  return <Box
  sx={
    {
      padding: 1,
      flexGrow: 1,
    }
  }
  >
    <Box
      className={styles.mainFrame}>
      <TimeLine />
      <Description/>
    </Box>
  </Box>
}
export {MainFrame}
