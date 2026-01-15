'use client'
import {Box, Card, Tab, Tabs, Typography,} from "@mui/material";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import React from "react";

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: ITabPanelProps) {
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
function Page() {

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState<number>(0);

  return (
    <Box sx={{
      width: '100%',
      padding: '128px 64px',
    }}>

  <Card sx={{
    width: '100%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  }}>

    <Box sx={{ borderBottom: 1,
      height: '50px',
      backgroundColor: 'background.paper',
      borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Первый проект" {...a11yProps(0)} />
        <Tab label="Воторой проект" {...a11yProps(1)} />
      </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
      <Typography sx={{
        padding: '64px',
        fontWeight: 'bold',
        fontSize: '2rem',
      }} variant={"body1"}>Управление составом проекта</Typography>
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Card
          sx={{
            flexBasis: '30%',
            padding: '16px',
          }}
        >
          <Typography variant={'body1'}>Комплект рабочей документации</Typography>
          <DataSaverOnIcon
          />
        </Card>
        <Card
          sx={{
            flexBasis: '30%',
            padding: '16px',
          }}
        >
          <Typography variant={'body1'}>Список разработчиков</Typography>
          <DataSaverOnIcon
          />
        </Card>
        <Card
          sx={{
            flexBasis: '30%',
            padding: '16px',
          }}
        >
          <Typography variant={'body1'}>Список других лиц</Typography>
          <DataSaverOnIcon
          />
        </Card>
      </Box>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>

    </CustomTabPanel>
  </Card>
    </Box>
  )
}
export default Page
