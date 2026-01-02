'use client'
// import Table from '@mui/joy/Table';
import Table from '@mui/material/Table';
import {Done, Close} from "@mui/icons-material";
import TableContainer from '@mui/material/TableContainer'
import {UserBadge} from "@/widgets/userBadge/ui/UserBadge"
import styles from './table.module.scss'

function ProjectInfo() {
  return (
<TableContainer className={styles.table}
  sx={{
    backgroundColor: 'background.default',
    color: 'text.primary',
  }}
  >

      <Table
       >
        <thead>
        <tr>
          <th style={{width: '15%'}}>Раздел</th>
          <th>Утверждено</th>
          <th>Дата последней версии</th>
          <th>Исполнитель</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>ГП</td>
          <td><Done/></td>
          <td>03.02.25</td>
          <td>Исполнитель</td>
          <td>PETROPV</td>
          <td>Открыть</td>
          <td>Скачать</td>
        </tr>
        <tr>
          <td>ГП</td>
          <td><Done/></td>
          <td>03.02.25</td>
          <td><UserBadge name={'Ivanov'}></UserBadge></td>
          <td>Открыть</td>
          <td>Скачать</td>
        </tr>
        </tbody>
      </Table>
</TableContainer>
  );

}

export {ProjectInfo}
