'use client'
import * as echarts from 'echarts';
import {Box} from '@mui/material';
import {useEffect, useRef} from "react";
import {right} from "@popperjs/core";

type EChartsOption = echarts.EChartsOption;

function Dashboard(props: {
  size: number,
  option: any
}) {
  const {size} = props;
  const option = props.option as EChartsOption;
  const refDashboard= useRef<HTMLDivElement|null>(null)
  useEffect(() => {
    if (refDashboard.current) {
      const myChart=echarts.init(refDashboard.current)
      myChart.setOption(option)
    }

  }, [])
  return <Box ref={refDashboard}
              sx={{
                backgroundColor: 'background.paper',
                marginRight: '10px',
                minWidth: `${size}px`,
                flexBasis: `${size}px`}}
  >



  </Box>
}

export {Dashboard}
