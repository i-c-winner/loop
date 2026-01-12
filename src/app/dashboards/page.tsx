"use client"
import Box from '@mui/material/Box'
import {DashboardBox} from '@/entities/dashboard/ui/dashboardBox'
import {options} from "@/shared/assets/data/pipeData";
import styles from './dashboards.module.scss'
import {redirect} from "next/navigation";
import {EChartsOption} from "echarts";
import {ProgresUpdaterModal} from "@/features/updateValue/ui/ProgresUpdaterModal";

const myOptions = options as EChartsOption

function Page() {
  return <Box className={styles.dashboardsWrapper}>
    <DashboardBox options={myOptions} actions={(_, list)=>{
      redirect(`/dashboards/${list}`)
    }}/>
  </Box>
}

export default Page
