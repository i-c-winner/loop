import {Box,Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar'
import {CONSTANTS} from "@/shared/config/constants/constant";
import styles from './userBadge.module.scss'

interface IProps {
  name: string,
  size?: number
}


function UserBadge(props: IProps) {
  const size=props.size? props.size:CONSTANTS.SIZE.AVATAR
  return <Box className={styles.userBadge}
  >
<Avatar   sx={{
  width: size,
  height: size,
  marginRight: `${size / 2}px`
}}/>
    <Typography>{props.name}</Typography>
  </Box>
}

export {UserBadge}
