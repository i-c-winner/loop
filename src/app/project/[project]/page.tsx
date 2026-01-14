'use client'
import React from 'react';
import {Card, Tabs, Tab, Box, Typography} from "@mui/material";
import {DashboardBox} from "@/entities/dashboard/ui/dashboardBox";
import {lists} from "@/shared/assets/data/pipeData";
import {Description} from "@/entities/mainFrame/ui/Description";
import {Chat} from "@/entities/chat/ui/Chat";
import {EChartsOption} from "echarts";
import {UpdateProgres} from "@/features/updateValue/ui/UpdateProgres";
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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [popoverIsOpen, setPopoverOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(0);

  function updateProgressToggled(value: number) {
    console.log(value)
    setPopoverOpen(true)
  }

  return (
    <Box sx={{
      padding: '128px 64px',
    }}>
      <Card sx={{
        width: '100%',
      }}>
        <Typography variant={'body1'}></Typography>
        <Box sx={{ borderBottom: 1,
          height: '50px',
          backgroundColor: 'background.paper',
          borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Обзор" {...a11yProps(0)} />
            <Tab label="Реестр" {...a11yProps(1)} />
            <Tab label="Документы" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Typography
            sx={{
              textAlign: 'center',
            }}
            variant={'body1'}>Реестр комлекта рабочих чертежей</Typography>
          <DashboardBox isOpen={popoverIsOpen} actions={updateProgressToggled} options={lists as EChartsOption} />
          <UpdateProgres isOpen={popoverIsOpen} value={value} onClose={() => setPopoverOpen(false)} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Description/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
         <TimeLine/>
        </CustomTabPanel>
      </Card>
    </Box>
  );
}
