'use client'
import * as echarts from 'echarts';
import {Box} from '@mui/material';
import {useEffect, useRef} from "react";

type EChartsOption = echarts.EChartsOption;

function Dashboard(props: {
  size: number;
  option: EChartsOption;
  onSelect?: (value: number, name: string) => void;
}) {
  const { size, option, onSelect } = props;
  const refDashboard= useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    if (refDashboard.current) {
      const myChart = echarts.init(refDashboard.current);
      myChart.setOption(option);
      myChart.on('click', (params: { value?: unknown; name?: unknown }) => {
        if (!onSelect) {
          return;
        }
        const value = Number(params.value);
        const name = params.name == null ? '' : String(params.name);
        if (Number.isFinite(value)) {
          onSelect(value, name);
        }
      });
      return () => {
        myChart.dispose();
      };
    }
  }, [onSelect, option]);

  return <Box ref={refDashboard}
              sx={{
                backgroundColor: 'background.paper',
                marginRight: '10px',
                minWidth: `${size}px`,
                flexBasis: `${size}px`,
              }}
  />
}

export {Dashboard}
