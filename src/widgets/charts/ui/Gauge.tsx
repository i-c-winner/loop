'use client'
import {Box} from "@mui/material";
import * as echarts from 'echarts';
import React, {useEffect} from "react";
import {optionGauge} from "@/shared/assets/data/gauge";

function Page() {
  useEffect(() => {
    const myChart=echarts.init(refDashboard.current)
    // @ts-ignore
    optionGauge.series[0].data[0]= Math.floor(Math.random()*100)
    myChart.setOption(optionGauge)
  }, []);
  const refDashboard= React.useRef<HTMLDivElement|null>(null)
  return <Box
    sx={{
      width: '100%',
      height: '100%',
    }}
    ref={refDashboard}>
  </Box>
}
export default Page
