'use client'
import React, {useRef} from 'react'
import {Box} from '@mui/material'
import {DashboardBox} from '@/entities/dashboard/ui/dashboardBox'
import {lists} from "@/shared/assets/data/pipeData";
import {EChartsOption} from "echarts";
import {UpdateProgres} from "@/features/updateValue/ui/UpdateProgres";


const myOptions = lists as EChartsOption

function ListsProgres(props: { projectId?: number | null; sectionId?: number | null; value?: number }) {
  const refBox = useRef<HTMLDivElement | null>(null)
  const [popoverIsOpen, setPopoverOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(props.value ?? 0);

  React.useEffect(() => {
    setValue(props.value ?? 0);
  }, [props.value]);

  function updateValue(value: number, list: string) {
    console.log(value, list)
    setPopoverOpen(true)
    setValue(value)
  }

  return <Box>
    <DashboardBox options={myOptions} actions={(value: number, list: string) => updateValue(value, list)}/>
    <UpdateProgres
      isOpen={popoverIsOpen}
      value={value}
      projectId={props.projectId}
      sectionId={props.sectionId}
      onClose={() => setPopoverOpen(false)}
    />
  </Box>
}

export {ListsProgres}
