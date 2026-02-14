'use client';
import {Box} from "@mui/material";
import {EChartsOption} from "echarts";
import { Dashboard } from "@/entities/dashboard/ui/dashboard";

function DashboardBox(props: {
  options: EChartsOption;
  actions?: (value: number, list: string) => void;
  isOpen?: boolean;
}) {
  const yAxis = props.options.yAxis;
  const firstAxis = Array.isArray(yAxis) ? yAxis[0] : yAxis;
  const labels = firstAxis && typeof firstAxis === 'object' && 'data' in firstAxis
    ? firstAxis.data
    : undefined;
  const length = Array.isArray(labels) ? labels.length : 1;
  return (
    <Box sx={{
      overflowY: 'auto',
      textAlign: 'center',
    }}>
      <Dashboard option={props.options} onSelect={props.actions} size={Math.max(320, length * 40)} />
    </Box>
  );
}

export {DashboardBox}
