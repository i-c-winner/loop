'use client'
import React, { useContext, useMemo } from 'react';
import {Card, Tabs, Tab, Box, Typography, Stack} from "@mui/material";
import {DashboardBox} from "@/entities/dashboard/ui/dashboardBox";
import {lists} from "@/shared/assets/data/pipeData";
import {EChartsOption} from "echarts";
import {UpdateProgres} from "@/features/updateValue/ui/UpdateProgres";
import {Registry} from "@/entities/mainFrame/ui/Registry";
import { MyContext } from "@/app/providers/MyContext";
import { useParams } from "next/navigation";

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
  const { currentProjectId } = useContext(MyContext);
  const params = useParams<{ project: string }>();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [popoverIsOpen, setPopoverOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(0);

  function updateProgressToggled(nextValue: number) {
    setValue(nextValue);
    setPopoverOpen(true)
  }

  const sectionId = useMemo(() => {
    const id = Number(params?.project);
    return Number.isFinite(id) ? id : null;
  }, [params]);

  return (
    <Box sx={{
      padding: '128px 64px',
    }}>
      <Card sx={{
        width: '100%',
        padding: '16px',
        textAlign: 'center',
      }}>

        <Typography m={2} variant={'h4'}>Архитектурные решения</Typography>

            <Stack
              spacing={2}
              direction={'row'}
              sx={{
              width: '100%',
            }}>

              <Card sx={{
                width: '45%',
                padding: '16px',
              }}>
                <DashboardBox isOpen={popoverIsOpen} actions={updateProgressToggled} options={lists as EChartsOption} />
              </Card>
            <Card
              sx={{
                padding: '16px',
                flexBasis: '45%',
              }}
            >
            <Typography variant={'h5'}>Реестр переданных файлов</Typography>
              <Registry/>
            </Card>
          </Stack>
          <UpdateProgres
            isOpen={popoverIsOpen}
            value={value}
            projectId={Number(currentProjectId)}
            sectionId={sectionId}
            onClose={() => setPopoverOpen(false)}
          />

      </Card>
    </Box>
  );
}
