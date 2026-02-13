'use client'
import {sections} from "@/shared/assets/data/pipeData";
import {useRouter} from "next/navigation";
import {
  Box, Typography, List, ListItem, ListItemText, IconButton, Card, Stack, Tooltip, Tabs, Tab,
  Button
} from "@mui/material";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import {InfoCard} from "@/widgets/infocard/ui/InfoCard";
import React, {useState} from "react";
import TimeLineBasic from "@/shared/ui/timeLine/ui/TimeLineBasic";
import {UserBadge} from "@/widgets/userBadge/ui/UserBadge";
import {position} from "stylis";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  typeTab: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const {children, value, typeTab, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{p: 3}}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Home() {
  const router = useRouter()
  const [value, setValue] = React.useState(0);
  const [typeTab, setTypeTab] = useState<string>(sections[0])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setTypeTab(sections[newValue])

  };

  return (
    <Box sx={{
      padding: '128px 64px',
      width: '100%',
      textAlign: 'center',
      display: 'flex',
      gap: '64px',
      flexDirection: 'column',
    }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          justifyContent: 'space-between',
          alignItems: 'start',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            width: '100%',
            textAlign: 'start',
          }}
        >Строительство производственного здания по адресу:</Typography>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: 'start',
            width: '100%',
          }}
        >ул.Ленина 15А</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            width: '100%',
            position: 'relative',
          }}
        >
          <Typography
            sx={{
              flexBasis: '25%'
            }}
          >Главный инженер</Typography>
          <Typography>Команда проекта</Typography>
          <Button
            variant="contained"
            startIcon={<AutorenewIcon />}
            sx={{
              padding: '16px',
              borderRadius: '5px',
              border: '1px solid #00000029',
              position: 'absolute',
              top: '-60px',
              right: '50px',
              backgroundColor: (theme) => theme.palette.error.main, // фон красный
              color: 'white', // текст черный
              '&:hover': {
                backgroundColor: (theme) => theme.palette.error.dark, // темнее при наведении
              },
            }}
          >
            Обновить разделы
          </Button>
        </Box>
      </Card>
      <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        gap: '24px',
        position: 'relative',
        width: '100%',
      }}>
        <InfoCard parms={{
          title: 'Общий прогесс:',
          value: '70%',
          subtitle: 'По графику'
        }}></InfoCard>
        <InfoCard parms={{
          title: 'Соблдюдение сроков:',
          value: '83%',
          subtitle: 'По графику'
        }}></InfoCard>
        <InfoCard parms={{
          title: 'Наличие проблем:',
          value: '3',
          subtitle: 'Имеются'
        }}></InfoCard>
        <InfoCard parms={{
          title: 'Бюджет:',
          value: '$150 000',
          subtitle: 'Согласно бюджету'
        }}></InfoCard>

      </Box>
      <Stack sx={{
        width: '100%',
        justifyContent: 'space-between',
      }}
             direction={'row'}
      >
        <Card sx={{
          flexBasis: '45%'
        }}>
          <Typography variant={'h5'}>Список разделов на согласовании</Typography>
          <List sx={{
            width: '100%', maxWidth: 360, padding: 5,
          }}>
            {sections.map((value, index) => ((index === 3 || index === 4 || index === 6) && <ListItem
                key={value}
                disableGutters

                secondaryAction={
                  <Stack
                    direction={'row'}
                    spacing={2}
                    sx={{
                      position: 'relative',
                      right: '-200px'
                    }}
                  >
                    <IconButton aria-label="delete">
                      <Tooltip title={<Box
                        sx={{
                          fontSize: '1rem',
                          justifyContent: 'start'
                        }}
                      >Скачать</Box>}>
                        <BrowserUpdatedIcon/>
                      </Tooltip>
                    </IconButton>
                    <IconButton aria-label="delete">
                      <Tooltip title={<Box
                        sx={{
                          fontSize: '1rem'
                        }}
                      >Принять новую версию</Box>}>
                        <FileDownloadDoneIcon/>
                      </Tooltip>
                    </IconButton>
                    <IconButton aria-label="delete">
                      <Tooltip title={<Box
                        sx={{
                          fontSize: '1rem'
                        }}
                      >Отклонить новую версию</Box>
                      }>
                        <DisabledByDefaultIcon/>
                      </Tooltip>
                    </IconButton>
                   <UserBadge name={'Ivanov'}/>
                  </Stack>
                }
              >
                <ListItemText primary={value}/>
              </ListItem>
            ))}
          </List>
        </Card>
        <Card sx={{
          width: '45%',
          padding: '16px'
        }}>
          <Stack direction={'row'}>
            <Stack direction={'row'} spacing={2} sx={{width: '100%', borderBottom: 1, borderColor: 'divider'}}>
              <Tabs
                orientation={'vertical'}
                scrollButtons={true}
                sx={{
                  overflowX: 'auto',
                }}
                value={value}
                onChange={handleChange} aria-label="basic tabs example">
                {sections.map((value, index) => {
                    return <Tab key={value} label={value} {...a11yProps(index)} />
                  }
                )}
              </Tabs>
              <CustomTabPanel typeTab={typeTab} value={value} index={value}>
                <Stack direction={'row'} spacing={2}>
                  <Stack>
                    <Typography variant={'h5'}>Версии раздела</Typography>
                    <TimeLineBasic/>
                    <Button variant={'contained'}>Добавить новую версию</Button>
                  </Stack>
                  <Stack>
                    <Typography variant={'h5'}>Переданные документации</Typography>
                    <TimeLineBasic/>
                    <Button variant={'contained'}>Отправить файл</Button>
                  </Stack>
                </Stack>


              </CustomTabPanel>
            </Stack>

          </Stack>

        </Card>
      </Stack>


    </Box>
  )
    ;
}

export default Home;
