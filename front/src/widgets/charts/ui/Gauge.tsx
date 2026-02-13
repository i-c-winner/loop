'use client'
import {Box} from "@mui/material";
import * as echarts from 'echarts';
import React, {useEffect, useRef} from "react";
import {optionGauge} from "@/shared/assets/data/gauge";

type GaugeProps = {
  value?: number;
};

const Gauge: React.FC<GaugeProps> = ({ value = 0 }) => {
  const refDashboard = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!refDashboard.current) {
      return;
    }

    const myChart = echarts.init(refDashboard.current);
    const safeValue = Number.isFinite(Number(value)) ? Math.max(0, Math.min(100, Number(value))) : 0;
    const gaugeOption = structuredClone(optionGauge);
    // @ts-expect-error optionGauge has dynamic series structure from ECharts config
    gaugeOption.series[0].data[0] = safeValue;
    myChart.setOption(gaugeOption);

    return () => {
      myChart.dispose();
    };
  }, [value]);

  return <Box
    sx={{
      width: '100%',
      height: '100%',
    }}
    ref={refDashboard}>
  </Box>
};

export default Gauge;
