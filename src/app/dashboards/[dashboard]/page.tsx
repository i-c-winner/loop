'use client'
import React, {useRef} from 'react'
import {Box} from '@mui/material'
import {DashboardBox} from '@/entities/dashboard/ui/dashboardBox'
import {lists} from "@/shared/assets/data/pipeData";
import styles from './dashboards.module.scss'
import {EChartsOption} from "echarts";
import {UpdateProgres} from "@/features/updateValue/ui/UpdateProgres";


const myOptions = lists as EChartsOption

function Page() {
  const refBox = useRef<HTMLDivElement | null>(null)
  const [popoverIsOpen, setPopoverOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(0);

  function updateValue(value: number, list: string) {
    console.log(value, list)
    setPopoverOpen(true)
    setValue(value)
  }

    return <Box>
    <DashboardBox options={myOptions} actions={(value: number, list: string) => updateValue(value, list)}/>
    <UpdateProgres isOpen={popoverIsOpen} value={value} onClose={() => setPopoverOpen(false)}
    />
  </Box>
}

export default Page
