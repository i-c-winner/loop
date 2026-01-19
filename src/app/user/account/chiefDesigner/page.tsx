'use client'
import {Box, Card, Tab, Tabs, Typography, List,  IconButton, Button, ListItem, Stack} from "@mui/material";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import React, {useContext} from "react";
import {MyContext,} from "@/app/providers/MyContext";
import {sections} from "@/shared/assets/data/pipeData";
import {projects} from "@/shared/assets/data/pipeData";

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
  const {changeProject, currentProject}=useContext(MyContext)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState<number>(0);
  console.log(currentProject , 'currentProject')

  return (
    <Box sx={{
      width: '100%',
      padding: '128px 64px',
    }}>

      <Card
      sx={{
        width: '100%',
        padding: '16px',
        marginBottom: '16px',
      }}>
        <Typography variant={'h4'}>Мои проекты</Typography>
        <List>
          {projects.map((value) => {
            return <ListItem key={value} disableGutters>
              <Stack
              direction={'row'}
              spacing={2}
              >
                <Button variant={'text'}
                  onClick={(event)=>{
                    changeProject(event.currentTarget.textContent as string)}}
                  sx={{
                    color: value===currentProject? 'text.primary':'text.secondary',
                    fontWeight: 'bold',
                  }}
                  key={value}>
                  {value}</Button>
              </Stack>

            </ListItem>
          })}
        </List>

      </Card>

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
            gap: '16px',
          }}
        >
          <Typography variant={'h4'}>Комплект рабочей документации</Typography>
          <Box
          sx={{
            padding: '16px',
          }}
          >
            {sections.map((value) => {
              return <Typography key={value} variant={'body2'}>{value}</Typography>
            })}
          </Box>
          <IconButton aria-label="delete">
          <DataSaverOnIcon
          />
          </IconButton>
        </Card>
        <Card
          sx={{
            flexBasis: '30%',
            padding: '16px',
          }}
        >
          <Typography variant={'h4'}>Список разработчиков</Typography>
          <Box
          sx={{
            padding: '16px',
          }}
          >
            {['Ivanov', 'Petrov', 'Sidorov'].map((value) => {
              return <Typography key={value} variant={'body2'}>{value}</Typography>
            })}
          </Box>
          <IconButton aria-label="delete">
            <DataSaverOnIcon
            />
          </IconButton>
        </Card>
        <Card
          sx={{
            flexBasis: '30%',
            padding: '16px',
          }}
        >
          <Typography variant={'h4'}>Список других лиц</Typography>
          <Box sx={{
            padding: '16px',
          }}>
          </Box>
          <IconButton aria-label="delete">
            <DataSaverOnIcon
            />
          </IconButton>
        </Card>
      </Box>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
    </CustomTabPanel>
    <Button
      sx={{
        alignSelf: 'end',
        width: '70px',
      }}
      disabled={true}
      variant={'contained'}>Save</Button>
  </Card>
    </Box>
  )
}
export default Page
