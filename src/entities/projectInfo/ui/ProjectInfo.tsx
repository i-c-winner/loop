'use client'
import Table from '@mui/joy/Table';
import {Done, Close} from "@mui/icons-material";
import {CssVarsProvider} from "@mui/joy";
import {Sheet} from "@mui/joy";
import Box from "@mui/material/Box";
import styles from './table.module.scss'

function ProjectInfo() {
  return (
<CssVarsProvider>
  <Sheet
    variant="solid"
    color="primary"
    invertedColors
    sx={(theme) => {
      return {
      pt: 1,
      borderRadius: 'sm',
      transition: '0.3s',
      'tr: nth-child(odd) td': {backgroundColor: theme.palette.primary[300]}
      }}
    }
  >
  <Table >
    <thead>
    <tr>
      <th style={{width: '15%'}}>Раздел</th>
      <th>Утверждено</th>
      <th>Дата последней версии</th>
      <th>Исполнитель</th>
      <th>Ссылка</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>ГП</td>
      <td><Done/></td>
      <td>03.02.25</td>
      <td>Петров</td>
      <td>открыть</td>
    </tr>
    <tr>
      <td>ГП</td>
      <td><Done/></td>
      <td>03.02.25</td>
      <td>Петров</td>
      <td>открыть</td>
    </tr>
    </tbody>
  </Table>
  </Sheet>
</CssVarsProvider>
  );

}

export {ProjectInfo}
