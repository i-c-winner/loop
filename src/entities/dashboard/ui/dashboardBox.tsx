'use client'
import {useState} from "react";
import {Box, Typography} from "@mui/material";
import {EChartsOption} from "echarts";
import {Bar} from "@/widgets/charts/ui/Bar";
import {UpdateProgres} from "@/features/updateValue/ui/UpdateProgres";

function DashboardBox(props: {
  options: EChartsOption,
  actions?: (value: number, list: string) => void,
  isOpen?: boolean
}) {
  console.log(props)

  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
  // @ts-ignore
  const length=props.options.yAxis?.data.length;
  return (
    <Box sx={{
      overflowY: 'auto',
      textAlign: 'center',
    }}>
      <Bar options={props.options} actions={props.actions}/>
    </Box>
  );
}

export {DashboardBox}
