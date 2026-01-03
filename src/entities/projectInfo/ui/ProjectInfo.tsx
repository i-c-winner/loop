'use client'
import {useId} from "react";
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {UserBadge} from "@/widgets/userBadge/ui/UserBadge"
import {OpenInNew, Download} from "@mui/icons-material";
import styles from './table.module.scss'
import Typography from "@mui/material/Typography";

function ProjectInfo(props: {
  title: string,
  data: Record<string, string>[]
}) {
  const id = useId()
  const keys = Object.keys(props.data[0]) || []
  return (
    <TableContainer className={styles.table}
                    sx={{
                      color: 'text.primary',
                      backgroundColor: 'background.paper',
                    }}
    >
      <Typography sx={{
        margin: "16px auto",
        backgroundColor: 'background.paper',
      }} className={styles.title} color='primary'>{props.title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {keys.map((myKey: string) => {
              return <TableCell key={myKey}>{myKey}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row: Record<string, string>, index: number) => {
            return <TableRow key={index}>
              {Object.values(row).map((element: string, index: number) => {
                if (element === 'open') {
                  return <TableCell key={index}>
                    <OpenInNew/>
                  </TableCell>
                }
                if (element === 'download') {
                  return <TableCell key={index}>
                    <Download key={index}/>
                  </TableCell>
                }
                return <TableCell key={index}>{element}</TableCell>
              })}
            </TableRow>
          })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export {ProjectInfo}
