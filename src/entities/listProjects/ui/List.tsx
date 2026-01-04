import {Box, List, ListItem, Button, Typography} from '@mui/material';
import styles from './listProjects.module.scss'

const nodes= [
  "Общие данные",
  "Архитектурные решения",
  "Конструктивные решения",
  "Технологические решения",
  "Водоснабжение и канализация",
  "Отопление, вентиляция и кондиционирование",
  "Электроснабжение и электроосвещение",
  "Слаботочные системы",
  "Газоснабжение",
  "Наружные инженерные сети",
  "Генеральный план и транспорт",
  "Организация строительства",
  "Мероприятия по обеспечению пожарной безопасности",
  "Мероприятия по охране окружающей среды",
  "Сметная документация"
]
export default function BasicSimpleTreeView() {
  return (
    <Box className={styles.list} sx={{ color: 'text.primary'}}>
      <List>
        {nodes.map((node) => (
           <ListItem key={node}>
             <Button
               sx={{
                 '&:hover': {
                   backgroundColor: 'initial'
               }}}
               variant='text' disableFocusRipple={true}><Typography color='text.primary'>{node}</Typography></Button>
             </ListItem>
        ))}
      </List>
    </Box>
  );
}

