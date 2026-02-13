'use client'

import React, { useContext, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { MyContext } from '@/app/providers/MyContext'

type Section = { id: number; name: string; progress: number }
type Designer = { id: number; name: string; email: string }
type SectionDesigner = { sectionId: number; designerId: number }

function CustomTabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index } = props
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

function ValueGauge(props: { value: number; title?: string }) {
  const { value, title } = props
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!ref.current) return
    const chart = echarts.init(ref.current)
    const option: EChartsOption = {
      title: title ? { text: title, left: 'center', top: 0, textStyle: { fontSize: 12 } } : undefined,
      series: [
        {
          type: 'gauge',
          min: 0,
          max: 100,
          progress: { show: true, width: 10 },
          axisLine: { lineStyle: { width: 10 } },
          axisTick: { show: false },
          splitLine: { length: 10, lineStyle: { width: 2 } },
          axisLabel: { distance: 14 },
          pointer: { width: 4, length: '70%' },
          detail: { valueAnimation: true, formatter: '{value}%', fontSize: 18 },
          data: [{ value: Math.max(0, Math.min(100, Math.round(value))) }],
        },
      ],
    }
    chart.setOption(option, { notMerge: true })
    const onResize = () => chart.resize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      chart.dispose()
    }
  }, [value, title])

  return <Box ref={ref} sx={{ width: 260, height: 260 }} />
}

export default function Page() {
  const { currentRole } = useContext(MyContext)
  const role = (currentRole || '').toLowerCase().trim()

  const [tab, setTab] = useState(0)

  const [sections, setSections] = useState<Section[]>([
    { id: 1, name: 'Раздел 1', progress: 35 },
    { id: 2, name: 'Раздел 2', progress: 62 },
    { id: 3, name: 'Раздел 3', progress: 10 },
  ])
  const [designers, setDesigners] = useState<Designer[]>([
    { id: 1, name: 'Designer A', email: 'a@demo.local' },
    { id: 2, name: 'Designer B', email: 'b@demo.local' },
  ])
  const [pairs, setPairs] = useState<SectionDesigner[]>([
    { sectionId: 1, designerId: 1 },
    { sectionId: 2, designerId: 2 },
  ])

  const [newSectionName, setNewSectionName] = useState('')
  const [deleteSectionId, setDeleteSectionId] = useState<number | ''>('')

  const [newDesignerName, setNewDesignerName] = useState('')
  const [newDesignerEmail, setNewDesignerEmail] = useState('')
  const [deleteDesignerId, setDeleteDesignerId] = useState<number | ''>('')

  const [pairSectionId, setPairSectionId] = useState<number | ''>('')
  const [pairDesignerId, setPairDesignerId] = useState<number | ''>('')

  const overallAverage = useMemo(() => {
    if (!sections.length) return 0
    return sections.reduce((sum, s) => sum + s.progress, 0) / sections.length
  }, [sections])

  const designerSections = useMemo(() => {
    // Static mode: показываем "свои" разделы как первый связанный дизайнером.
    if (role !== 'designer') return sections
    const myId = designers[0]?.id
    if (!myId) return []
    const ids = new Set(pairs.filter((p) => p.designerId === myId).map((p) => p.sectionId))
    return sections.filter((s) => ids.has(s.id))
  }, [role, sections, designers, pairs])

  if (role === 'admin') {
    return <Box sx={{ p: 4 }} />
  }

  if (role === 'designer') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Личный кабинет (designer)
        </Typography>
        <Card sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
            <ValueGauge value={overallAverage} title="Среднее по всем" />
            {designerSections.map((section) => (
              <ValueGauge key={section.id} value={section.progress} title={section.name} />
            ))}
          </Stack>
        </Card>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Личный кабинет (chief)
      </Typography>

      <Card sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(_, v: number) => setTab(v)}>
          <Tab label="Пусто" value={0} />
          <Tab label="Управление" value={1} />
        </Tabs>

        <CustomTabPanel value={tab} index={0}>
          <Box sx={{ height: 24 }} />
        </CustomTabPanel>

        <CustomTabPanel value={tab} index={1}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'stretch', flexWrap: 'wrap' }}>
            <Card sx={{ flex: '1 1 320px', p: 2 }}>
              <Typography variant="h6">Разделы</Typography>
              <Divider sx={{ my: 1.5 }} />

              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                <TextField
                  label="Новый раздел"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    const name = newSectionName.trim()
                    if (!name) return
                    const nextId = sections.length ? Math.max(...sections.map((s) => s.id)) + 1 : 1
                    setSections((prev) => [...prev, { id: nextId, name, progress: 0 }])
                    setNewSectionName('')
                  }}
                >
                  Добавить
                </Button>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel id="delete-section-label">Удалить раздел</InputLabel>
                  <Select
                    labelId="delete-section-label"
                    label="Удалить раздел"
                    value={deleteSectionId}
                    onChange={(e) => setDeleteSectionId(e.target.value === '' ? '' : Number(e.target.value))}
                  >
                    <MenuItem value="">Не выбрано</MenuItem>
                    {sections.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={deleteSectionId === ''}
                  onClick={() => {
                    if (deleteSectionId === '') return
                    if (!confirm('Удалить раздел?')) return
                    const id = deleteSectionId
                    setSections((prev) => prev.filter((s) => s.id !== id))
                    setPairs((prev) => prev.filter((p) => p.sectionId !== id))
                    setDeleteSectionId('')
                  }}
                >
                  Удалить
                </Button>
              </Stack>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {sections.map((s) => (
                  <Typography key={s.id} variant="body2">
                    {s.name} — {s.progress}%
                  </Typography>
                ))}
              </Box>
            </Card>

            <Card sx={{ flex: '1 1 320px', p: 2 }}>
              <Typography variant="h6">Пользователи</Typography>
              <Divider sx={{ my: 1.5 }} />

              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                <TextField
                  label="Имя"
                  value={newDesignerName}
                  onChange={(e) => setNewDesignerName(e.target.value)}
                  size="small"
                />
                <TextField
                  label="Email"
                  value={newDesignerEmail}
                  onChange={(e) => setNewDesignerEmail(e.target.value)}
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    const name = newDesignerName.trim()
                    const email = newDesignerEmail.trim()
                    if (!name || !email) return
                    const nextId = designers.length ? Math.max(...designers.map((d) => d.id)) + 1 : 1
                    setDesigners((prev) => [...prev, { id: nextId, name, email }])
                    setNewDesignerName('')
                    setNewDesignerEmail('')
                  }}
                >
                  Создать
                </Button>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel id="delete-designer-label">Удалить</InputLabel>
                  <Select
                    labelId="delete-designer-label"
                    label="Удалить"
                    value={deleteDesignerId}
                    onChange={(e) => setDeleteDesignerId(e.target.value === '' ? '' : Number(e.target.value))}
                  >
                    <MenuItem value="">Не выбрано</MenuItem>
                    {designers.map((d) => (
                      <MenuItem key={d.id} value={d.id}>
                        {d.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={deleteDesignerId === ''}
                  onClick={() => {
                    if (deleteDesignerId === '') return
                    if (!confirm('Удалить пользователя?')) return
                    const id = deleteDesignerId
                    setDesigners((prev) => prev.filter((d) => d.id !== id))
                    setPairs((prev) => prev.filter((p) => p.designerId !== id))
                    setDeleteDesignerId('')
                  }}
                >
                  Удалить
                </Button>
              </Stack>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {designers.map((d) => (
                  <Typography key={d.id} variant="body2">
                    {d.name} ({d.email})
                  </Typography>
                ))}
              </Box>
            </Card>

            <Card sx={{ flex: '1 1 320px', p: 2 }}>
              <Typography variant="h6">Исполнители (section : designer)</Typography>
              <Divider sx={{ my: 1.5 }} />

              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel id="pair-section-label">Раздел</InputLabel>
                  <Select
                    labelId="pair-section-label"
                    label="Раздел"
                    value={pairSectionId}
                    onChange={(e) => setPairSectionId(e.target.value === '' ? '' : Number(e.target.value))}
                  >
                    <MenuItem value="">Не выбрано</MenuItem>
                    {sections.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel id="pair-designer-label">Исполнитель</InputLabel>
                  <Select
                    labelId="pair-designer-label"
                    label="Исполнитель"
                    value={pairDesignerId}
                    onChange={(e) => setPairDesignerId(e.target.value === '' ? '' : Number(e.target.value))}
                  >
                    <MenuItem value="">Не выбрано</MenuItem>
                    {designers.map((d) => (
                      <MenuItem key={d.id} value={d.id}>
                        {d.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  disabled={pairSectionId === '' || pairDesignerId === ''}
                  onClick={() => {
                    if (pairSectionId === '' || pairDesignerId === '') return
                    const exists = pairs.some((p) => p.sectionId === pairSectionId && p.designerId === pairDesignerId)
                    if (exists) return
                    setPairs((prev) => [...prev, { sectionId: pairSectionId, designerId: pairDesignerId }])
                  }}
                >
                  Добавить
                </Button>
              </Stack>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {pairs.map((p) => {
                  const section = sections.find((s) => s.id === p.sectionId)
                  const designer = designers.find((d) => d.id === p.designerId)
                  if (!section || !designer) return null
                  return (
                    <Stack
                      key={`${p.sectionId}:${p.designerId}`}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ gap: 1 }}
                    >
                      <Typography variant="body2">
                        {section.name} : {designer.name}
                      </Typography>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          if (!confirm('Удалить связь section-designer?')) return
                          setPairs((prev) =>
                            prev.filter((item) => !(item.sectionId === p.sectionId && item.designerId === p.designerId))
                          )
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  )
                })}
              </Box>
            </Card>
          </Stack>
        </CustomTabPanel>
      </Card>
    </Box>
  )
}

