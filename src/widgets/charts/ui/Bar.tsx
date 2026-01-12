'use client'
import { Box } from '@mui/material';
import styles from './charts.module.scss';
import { useEffect, useRef } from "react";
import * as echarts from 'echarts';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {EChartsOption} from "echarts"; // 👈 useRouter вместо redirect

function Bar(props: {
  options: EChartsOption,
  actions?: (value: number, list: string)=>void
}) {
  const refBar = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (refBar.current) {
      const myChart = echarts.init(refBar.current);
      myChart.setOption(props.options);

      myChart.on('click', (params: any) => {
        if (props.actions) props.actions(params.value, params.name);
        // router.push сохраняет историю
        // router.push(`/dashboards/${params.name}`);
      });
    }
  }, [router]);



  return (
    <Box ref={refBar} className={styles.barWrapper}></Box>
  );
}

export { Bar };
