'use client'
import { Box } from '@mui/material';
import {useEffect, useRef} from "react";
import * as echarts from 'echarts';
import { useRouter } from 'next/navigation';
import {EChartsOption} from "echarts"; // 👈 useRouter вместо redirect
function Bar(props: {
  options: EChartsOption,
  actions?: (value: number, list: string)=>void
}) {
  const refBar = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  // @ts-ignore
  const length=props.options.yAxis?.data.length;

  useEffect(() => {

    if (refBar.current) {
      const myChart = echarts.init(refBar.current);


      console.log(length)
      myChart.setOption(props.options);
      myChart.on('click', (params: any) => {
        if (props.actions) props.actions(params.value, params.name);
      });
    }
  }, [router]);
  return (
    <Box sx={{
      height: `${length*40}px`,
    }} ref={refBar}></Box>
  );
}


export { Bar };
