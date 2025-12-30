import Table from '@mui/joy/Table';

export default function BasicTable() {
  return (
    <Table aria-label="basic table">
      <thead>
      <tr>
        <th style={{ width: '15%' }}>Раздел</th>
        <th>Утверждено</th>
        <th>Дата последней версии</th>
        <th>Исполнитель</th>
        <th>Ссылка</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>ГП</td>
        <td>false</td>
        <td>03.02.25</td>
        <td>Петров</td>
        <td>открыть</td>
      </tr>
      <tr>
        <td>НВК</td>
        <td>true</td>
        <td>03.05.25</td>
        <td>Иванов</td>
        <td>открыть</td>
      </tr>
      <tr>
        <td>АР</td>
        <td>true</td>
        <td>02.06.25</td>
        <td>Сидоров</td>
        <td>открыть</td>
      </tr>
      <tr>
        <td>КЖ0</td>
        <td>false</td>
        <td>02.07.25</td>
        <td>Сидоров</td>
        <td>открыть</td>
      </tr>
      <tr>
        <td>КМ</td>
        <td>true</td>
        <td>02.06.25</td>
        <td>Федоров</td>
        <td>открыть</td>
      </tr>
      </tbody>
    </Table>
  );
}
