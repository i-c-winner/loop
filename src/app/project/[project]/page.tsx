'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {DashboardBox} from "@/entities/dashboard/ui/dashboardBox";
import {lists} from "@/shared/assets/data/pipeData";
import {Description} from "@/entities/mainFrame/ui/Description";
import {Chat} from "@/entities/chat/ui/Chat";
import {EChartsOption} from "echarts";
import {TimeLine} from "@/entities/mainFrame/ui/TimeLine";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{height: '90%'}}
      className="projectPage"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, height: '100%' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{
      height: 'calc(100vh - 212px)',
      padding: 1,
      width: '100%' }}>
      <Box sx={{
        height: '100%',
        width: '100%',
        backgroundColor: 'background.paper',
      }}>
        <Box sx={{ borderBottom: 1,
          height: '50px',
          backgroundColor: 'background.paper',
          borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Обзор" {...a11yProps(0)} />
            <Tab label="Реестр" {...a11yProps(1)} />
            <Tab label="Документы" {...a11yProps(2)} />
            <Tab label="Обсуждения" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <DashboardBox options={lists as EChartsOption} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Description/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
         <TimeLine/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Chat />
        </CustomTabPanel>
      </Box>

    </Box>
  );
}
