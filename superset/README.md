## Superset service

This folder contains Apache Superset setup as a separate service near `backand` and `front`.

### Start

```bash
cd superset
docker compose up -d
```

The local Superset image includes PostgreSQL driver `psycopg2-binary`.

Superset UI: `http://localhost:8088`

Default credentials:

- username: `admin`
- password: `admin`

Override credentials and secrets with environment variables:

- `SUPERSET_ADMIN_USERNAME`
- `SUPERSET_ADMIN_PASSWORD`
- `SUPERSET_ADMIN_FIRSTNAME`
- `SUPERSET_ADMIN_LASTNAME`
- `SUPERSET_ADMIN_EMAIL`
- `SUPERSET_SECRET_KEY`

### Embedded Superset prerequisites

1. Create a dashboard in Superset.
2. Open dashboard `... -> Share -> Embed dashboard` and copy dashboard ID.
3. Make sure `http://localhost:3000` is allowed for embedding.
4. Put this ID into frontend env (`NEXT_PUBLIC_SUPERSET_DASHBOARD_ID`).
