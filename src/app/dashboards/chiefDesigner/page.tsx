'use client'
import {Box, Stack, Card, Typography} from "@mui/material";
import React from "react";
import {sections} from "@/shared/assets/data/pipeData";
import Gauge from "@/widgets/charts/ui/Gauge";
import {UserBadge} from "@/widgets/userBadge/ui/UserBadge";

function Page() {
  return <Box
    sx={{
      padding: '128px 64px',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    <Card
      sx={{
        padding: '16px',
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <Typography
        variant={'h3'}>Исполнение проектной части</Typography>
      <Stack
        direction={'row'}
        spacing={2}
        sx={{
          marginTop: '32px',
          width: '100%',
          height: '100%',

        }}>
        <Card sx={
          {
            width: '25%',
            height: '80vh',
            textAlign: 'center',
          }
        }>
          <Typography variant={'h5'}>Суммарно по проекту</Typography>
          <Gauge/>
        </Card>

        <Box sx={{
          width: '75%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '32px',
        }}>
          {sections.map((item, index) =>
            <Card
              key={index}
              sx={
              {
                padding: '8px',
                textAlign: 'center',
                flex: '0 0 300px',
                height: '350px',
              }
            }>
              <Typography
                noWrap
                sx={{
                  textOverflow: 'ellipsis',
                }}
                variant={'h5'}>
                {item}
              </Typography>
              <Box
                sx={{
                  padding: '16px',
                  textAlign: 'center',
                  width: '100%',
                  height: '80%',
                }}
               >
                <Gauge key={item}></Gauge>
              </Box>
              <UserBadge name={'Petrov'}/>
            </Card>
          )
          }
        </Box>
      </Stack>
    </Card>
  </Box>
}

export default Page

