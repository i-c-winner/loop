# PostgreSQL Docker контейнер с базой данных loop

## Описание
Docker-контейнер с PostgreSQL, автоматически создающий базу данных с именем "loop" и пробрасывающий порт 5435.

## Структура проекта
- `Dockerfile` - конфигурация Docker-образа
- `init.sql` - скрипт инициализации базы данных
- `docker-compose.yml` - конфигурация для запуска контейнера

## Быстрый старт

### 1. Сборка и запуск контейнера
```bash
docker-compose up -d
```

### 2. Проверка состояния контейнера
```bash
docker-compose ps
```

### 3. Подключение к базе данных
Параметры подключения:
- **Хост**: localhost
- **Порт**: 5435
- **База данных**: loop
- **Пользователь**: postgres
- **Пароль**: postgres

### 4. Остановка контейнера
```bash
docker-compose down
```

## Команды Docker

### Ручная сборка образа
```bash
docker build -t postgres-loop .
```

### Запуск контейнера вручную
```bash
docker run -d \
  --name postgres-loop \
  -p 5435:5432 \
  -e POSTGRES_DB=loop \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -v postgres_data:/var/lib/postgresql/data \
  postgres-loop
```

### Подключение к контейнеру
```bash
docker exec -it postgres-loop psql -U postgres -d loop
```

### Просмотр логов
```bash
docker logs postgres-loop
```

## Настройка

Для изменения параметров подключения отредактируйте:
- `docker-compose.yml` - для изменения портов и переменных окружения
- `init.sql` - для добавления таблиц и начальных данных

## Полезные команды SQL

После подключения к базе данных можно выполнить:

```sql
-- Просмотр всех таблиц
\dt

-- Просмотр текущей базы данных
SELECT current_database();

-- Просмотр содержимого таблицы chiefs
SELECT * FROM "chiefs";

-- Просмотр содержимого таблицы Projects
SELECT * FROM "Projects";

-- Создание новой таблицы
CREATE TABLE example (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Вставка данных
INSERT INTO example (name) VALUES ('Тестовая запись');

-- Просмотр данных
SELECT * FROM example;
```