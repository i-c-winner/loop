'use client'
import Box from '@mui/material/Box'
import {DashboardBox} from '@/entities/dashboard/ui/dashboardBox'
import {lists} from "@/shared/assets/data/pipeData";
import styles from './dashboards.module.scss'
import {EChartsOption} from "echarts";
import {useContext} from "react";
import {MyContext, MyContextProvider} from "@/app/providers/MyContext";

const myOptions= lists as EChartsOption

function Page() {
  const context=useContext(MyContext)
  const changeChild=context.changeChild

  function updateValue(value: number, list: string) {
    console.log(value,list)

  }
  return <Box className={styles.dashboards} >
    <DashboardBox options={myOptions} actions={(value: number, list: string)=>updateValue(value,list)} />
  </Box>
}

export default Page
