-- Скрипт инициализации базы данных loop
-- Этот скрипт автоматически выполнится при первом запуске контейнера

-- Подключение к базе данных loop (уже создана через POSTGRES_DB)
-- Скрипт выполняется в контексте базы данных loop

-- Создание таблиц
CREATE TABLE IF NOT EXISTS "Projects" (
	"id" serial NOT NULL UNIQUE,
	"full_name" varchar(255) NOT NULL,
	"second_name" varchar(200) NOT NULL,
	"id_chief" bigint NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "chiefs" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(100) NOT NULL,
	"password" varchar(200) NOT NULL,
	"company" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(15) NOT NULL,
	PRIMARY KEY ("id")
);

-- Добавление расширений (если необходимо)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Вставка тестовых данных в таблицы
INSERT INTO "chiefs" ("name", "password", "company", "email", "phone") VALUES 
    ('John Doe', 'hashed_password1', 'Company A', 'john@example.com', '+1234567890'),
    ('Jane Smith', 'hashed_password2', 'Company B', 'jane@example.com', '+0987654321')
ON CONFLICT DO NOTHING;

INSERT INTO "Projects" ("full_name", "second_name", "id_chief") VALUES 
    ('Project Alpha', 'Alpha', 1),
    ('Project Beta', 'Beta', 2)
ON CONFLICT DO NOTHING;