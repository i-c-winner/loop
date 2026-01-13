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
      height: `calc(100vh - 300px)`,
      overflowY: 'auto',
      textAlign: 'center',
    }}>
      <Typography variant={'h5'}>Выполнение по разделу Архитектурные решения</Typography>
      <Bar options={props.options} actions={props.actions}/>
    </Box>
  );
}

export {DashboardBox}
