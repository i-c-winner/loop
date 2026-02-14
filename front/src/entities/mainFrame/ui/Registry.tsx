import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import LaunchIcon from '@mui/icons-material/Launch';

const rows = [
  { date: '03.02.25', name: 'Техническое задание', author: 'Ivanov', recipient: 'Petrov' },
  { date: '15.03.25', name: 'Лист 1, 2, 5-11', author: 'Ivanov', recipient: 'Petrov' },
  { date: '20.03.25', name: 'Пояснительная записка', author: 'Petrov', recipient: 'Ivanov' },
];

function Registry() {
  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '14px',
          overflow: 'hidden',
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Наименование</TableCell>
              <TableCell>Автор</TableCell>
              <TableCell>Получатель</TableCell>
              <TableCell align="center">Открыть</TableCell>
              <TableCell align="center">Скачать</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={`${row.name}-${index}`} hover>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Typography variant="body2">{row.author}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.recipient}</Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="open" size="small">
                    <LaunchIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="download" size="small">
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export { Registry };
