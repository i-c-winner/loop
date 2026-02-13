"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MyContext } from "@/app/providers/MyContext";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

type DashboardRow = {
  id: number;
  pageNumber: string;
  pageName: string;
  completed: number;
};

type DashboardColumn = {
  key: "pageNumber" | "pageName" | "completed" | "actions";
  label: string;
};

type DashboardTableState = {
  title: string;
  columns: DashboardColumn[];
  rows: DashboardRow[];
};

type SectionItem = {
  id: number;
  name: string;
  progress?: unknown;
};

const COLUMNS: DashboardColumn[] = [
  { key: "pageNumber", label: "Номер страницы" },
  { key: "pageName", label: "Наименование страницы" },
  { key: "completed", label: "Выполнено %"  },
  { key: "actions", label: "Действия" },
];

function createInitialTableState(title: string): DashboardTableState {
  return {
    title,
    columns: COLUMNS,
    rows: [{ id: 1, pageNumber: "1", pageName: "", completed: 0 }],
  };
}

function isDashboardColumnKey(value: unknown): value is DashboardColumn["key"] {
  return value === "pageNumber" || value === "pageName" || value === "completed" || value === "actions";
}

function normalizeTableStateFromProgress(title: string, progress: unknown): DashboardTableState {
  if (!progress || typeof progress !== "object") {
    return createInitialTableState(title);
  }

  const candidate = progress as {
    title?: unknown;
    columns?: unknown;
    rows?: unknown;
  };

  const normalizedTitle =
    typeof candidate.title === "string" && candidate.title.trim().length > 0 ? candidate.title : title;

  const normalizedColumns = Array.isArray(candidate.columns)
    ? candidate.columns
        .map((column) => {
          if (!column || typeof column !== "object") return null;
          const raw = column as { key?: unknown; label?: unknown };
          if (!isDashboardColumnKey(raw.key)) return null;
          if (typeof raw.label !== "string") return null;
          return { key: raw.key, label: raw.label };
        })
        .filter(Boolean) as DashboardColumn[]
    : [];

  const normalizedRows = Array.isArray(candidate.rows)
    ? candidate.rows
        .map((row, index) => {
          if (!row || typeof row !== "object") return null;
          const raw = row as { id?: unknown; pageNumber?: unknown; pageName?: unknown; completed?: unknown };
          const id = Number(raw.id);
          const safeId = Number.isFinite(id) ? id : index + 1;
          const completedNumber = Number(raw.completed);
          return {
            id: safeId,
            pageNumber: raw.pageNumber == null ? "" : String(raw.pageNumber),
            pageName: raw.pageName == null ? "" : String(raw.pageName),
            completed: Number.isFinite(completedNumber) ? completedNumber : 0,
          };
        })
        .filter(Boolean) as DashboardRow[]
    : [];

  return {
    title: normalizedTitle,
    columns: normalizedColumns.length ? normalizedColumns : COLUMNS,
    rows: normalizedRows.length ? normalizedRows : [{ id: 1, pageNumber: "1", pageName: "", completed: 0 }],
  };
}

function Page() {
  const { currentProjectId, currentRole } = useContext(MyContext);
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [tablesBySection, setTablesBySection] = useState<Record<number, DashboardTableState>>({});
  const [savingSectionId, setSavingSectionId] = useState<number | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSections() {
      try {
        setLoading(true);
        setError(null);

        // Static mode: имитируем данные без бекенда.
        const normalizedRole = (currentRole || "").toLowerCase().trim();
        const baseItems: SectionItem[] = [
          { id: 1, name: "Раздел 1" },
          { id: 2, name: "Раздел 2" },
          { id: 3, name: "Раздел 3" },
        ];
        const items = normalizedRole === "designer" ? baseItems.slice(0, 2) : baseItems;

        setSections(items);
        setActiveSectionId(items[0]?.id ?? null);

        setTablesBySection((prev) => {
          const next = { ...prev };
          for (const section of items) {
            const storageKey = `dashboardTable:${currentProjectId || "default"}:${section.id}`;
            const cached = localStorage.getItem(storageKey);
            if (cached) {
              try {
                const parsed = JSON.parse(cached);
                next[section.id] = normalizeTableStateFromProgress(section.name, parsed);
                continue;
              } catch {
                // ignore invalid cache
              }
            }

            next[section.id] = next[section.id]
              ? { ...next[section.id], title: section.name }
              : createInitialTableState(section.name);
          }
          return next;
        });
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unknown error");
        setSections([]);
        setActiveSectionId(null);
      } finally {
        setLoading(false);
      }
    }

    loadSections();
  }, [currentProjectId, currentRole]);

  const activeTableState = useMemo(() => {
    if (!activeSectionId) return null;
    return tablesBySection[activeSectionId] ?? null;
  }, [activeSectionId, tablesBySection]);

  const chartOption = useMemo<EChartsOption | null>(() => {
    if (!activeTableState) return null;
    const categories = activeTableState.rows.map((row) => row.pageNumber);
    const values = activeTableState.rows.map((row) => row.completed);

    return {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      grid: { left: 16, right: 16, top: 24, bottom: 24, containLabel: true },
      xAxis: {
        type: "category",
        data: categories,
        axisLabel: { interval: 0 },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
      },
      series: [
        {
          type: "bar",
          data: values,
          barMaxWidth: 48,
        },
      ],
    };
  }, [activeTableState]);

  const chartRef = useRef<HTMLDivElement | null>(null);
  const gaugeRef = useRef<HTMLDivElement | null>(null);

  const gaugeOption = useMemo<EChartsOption | null>(() => {
    if (!activeTableState) return null;
    const values = activeTableState.rows.map((row) => row.completed);
    const avgRaw = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
    const avg = Number.isFinite(avgRaw) ? Math.max(0, Math.min(100, avgRaw)) : 0;

    return {
      series: [
        {
          type: "gauge",
          min: 0,
          max: 100,
          progress: { show: true, width: 10 },
          axisLine: { lineStyle: { width: 10 } },
          axisTick: { show: false },
          splitLine: { length: 10, lineStyle: { width: 2 } },
          axisLabel: { distance: 14 },
          pointer: { width: 4, length: "70%" },
          detail: { valueAnimation: true, formatter: "{value}%", fontSize: 18 },
          data: [{ value: Math.round(avg) }],
        },
      ],
    };
  }, [activeTableState]);

  useEffect(() => {
    if (!gaugeRef.current || !gaugeOption) return;
    const chart = echarts.init(gaugeRef.current);
    chart.setOption(gaugeOption, { notMerge: true });
    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [gaugeOption]);

  useEffect(() => {
    if (!chartRef.current || !chartOption) return;
    const chart = echarts.init(chartRef.current);
    chart.setOption(chartOption, { notMerge: true });
    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [chartOption]);

  function addRow() {
    if (!activeSectionId || !activeTableState) return;
    setTablesBySection((prev) => {
      const sectionState = prev[activeSectionId];
      if (!sectionState) return prev;
      const nextId = sectionState.rows.length ? Math.max(...sectionState.rows.map((row) => row.id)) + 1 : 1;
      return {
        ...prev,
        [activeSectionId]: {
          ...sectionState,
          rows: [
            ...sectionState.rows,
            {
              id: nextId,
              pageNumber: String(sectionState.rows.length + 1),
              pageName: "",
              completed: 0,
            },
          ],
        },
      };
    });
  }

  function deleteRow(id: number) {
    if (!activeSectionId) return;
    setTablesBySection((prev) => {
      const sectionState = prev[activeSectionId];
      if (!sectionState) return prev;
      return {
        ...prev,
        [activeSectionId]: {
          ...sectionState,
          rows: sectionState.rows.filter((row) => row.id !== id),
        },
      };
    });
  }

  function updateRow(id: number, patch: Partial<DashboardRow>) {
    if (!activeSectionId) return;
    setTablesBySection((prev) => {
      const sectionState = prev[activeSectionId];
      if (!sectionState) return prev;
      return {
        ...prev,
        [activeSectionId]: {
          ...sectionState,
          rows: sectionState.rows.map((row) => (row.id === id ? { ...row, ...patch } : row)),
        },
      };
    });
  }

  async function updateSectionProgress() {
    if (!activeSectionId || !activeTableState) return;

    try {
      setSavingSectionId(activeSectionId);
      setSaveMessage(null);
      const storageKey = `dashboardTable:${currentProjectId || "default"}:${activeSectionId}`;
      localStorage.setItem(storageKey, JSON.stringify(activeTableState));
      setSaveMessage("Прогресс сохранен локально");
    } catch (saveError) {
      setSaveMessage(saveError instanceof Error ? `Ошибка обновления: ${saveError.message}` : "Ошибка обновления");
    } finally {
      setSavingSectionId(null);
    }
  }

  return (
    <Box sx={{ padding: "64px 58px" }}>
      <Card sx={{
        p:2,
        marginBottom: 2,
      }}>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            График выполнения
          </Typography>
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Box sx={{ width: 320, height: 320, flex: "0 0 auto" }} ref={gaugeRef} />
            <Box sx={{ flex: 1, minWidth: 0, height: 320 }} ref={chartRef} />
          </Stack>
        </Box>
      </Card>
      <Card sx={{ p: 2 }}>
        <Tabs
          value={activeSectionId ?? false}
          onChange={(_, value: number) => setActiveSectionId(value)}
          sx={{ mb: 2 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {sections.map((section) => (
            <Tab key={section.id} label={section.name} value={section.id} />
          ))}
        </Tabs>

        {loading && <Typography>Загрузка разделов...</Typography>}
        {error && <Typography color="error">Ошибка загрузки разделов: {error}</Typography>}

        {!loading && !error && activeTableState && (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h5">{activeTableState.title}</Typography>
              <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={addRow}>
                  Добавить строку
                </Button>
              </Stack>
            </Stack>
            {saveMessage && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                {saveMessage}
              </Typography>
            )}

            <TableContainer>
              <Table
                size="small"
                sx={{
                  "& .MuiTableCell-root": { py: 0.5 },
                }}
              >
                <TableHead>
                  <TableRow>
                    {activeTableState.columns.map((column) => (
                      <TableCell key={column.key} align={column.key === "actions" ? "right" : "left"}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activeTableState.rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ width: "20%" }}>
                        <TextField
                          key={`${activeSectionId}-${row.id}-pageNumber-${row.pageNumber}`}
                          size="small"
                          fullWidth
                          defaultValue={row.pageNumber}
                          onBlur={(event) => updateRow(row.id, { pageNumber: event.target.value })}
                          sx={{
                            "& .MuiInputBase-root": { height: 30 },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          key={`${activeSectionId}-${row.id}-pageName-${row.pageName}`}
                          size="small"
                          fullWidth
                          defaultValue={row.pageName}
                          onBlur={(event) => updateRow(row.id, { pageName: event.target.value })}
                          sx={{
                            "& .MuiInputBase-root": { height: 30 },
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: "15%" }}>
                        <TextField
                          key={`${activeSectionId}-${row.id}-completed-${row.completed}`}
                          size="small"
                          fullWidth
                          type="number"
                          defaultValue={row.completed}
                          inputProps={{ min: 0, max: 100 }}
                          onBlur={(event) => {
                            const value = Number(event.target.value);
                            const safeValue = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
                            updateRow(row.id, { completed: safeValue });
                          }}
                          sx={{
                            "& .MuiInputBase-root": { height: 30 },
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ width: "10%" }}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => deleteRow(row.id)}
                          aria-label="Удалить строку"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        <Button
          sx={{
            marginTop: 2,
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          variant="outlined" onClick={updateSectionProgress} disabled={savingSectionId === activeSectionId}>
          {savingSectionId === activeSectionId ? "Обновление..." : "Обновить"}
        </Button>
      </Card>
    </Box>
  );
}

export default Page;
