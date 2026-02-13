FROM postgres:15

# Установка имени базы данных
ENV POSTGRES_DB=loop
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

# Копируем скрипт инициализации
COPY init.sql /docker-entrypoint-initdb.d/

# Открываем порт 5432 (внутренний порт PostgreSQL)
EXPOSE 5432