'use client'
import {Box} from '@mui/material';
import styles from './bar.module.scss'
import {useEffect, useRef} from "react";
import * as echarts from 'echarts';
import {options} from "@/shared/assets/data/pipeData";

function Bar() {
  const refBar=useRef<HTMLDivElement|null>(null)

  useEffect(() => {
    if (refBar.current) {
      const myChart=echarts.init(refBar.current)
      myChart.setOption(options)
    }
  }, [])
  return (
    <Box
      ref={refBar}
    className={styles.barWrapper}
    >
    </Box>
  )
}

export {Bar}
