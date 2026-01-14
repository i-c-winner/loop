'use client'
import {Box, Typography} from "@mui/material";
import {EChartsOption} from "echarts";
import {Bar} from "@/widgets/charts/ui/Bar";

function DashboardBox(props: {
  options: EChartsOption,
  actions?: (value: number, list: string) => void
}) {
  // @ts-ignore
  const length=props.options.yAxis?.data.length;
  return (
    <Box sx={{
      height: `100%`,
      overflowY: 'auto',
      textAlign: 'center',
    }}>
      <Bar options={props.options} actions={props.actions}/>
    </Box>
  );
}

export {DashboardBox}
