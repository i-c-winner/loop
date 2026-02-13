from sqlalchemy import Enum

APP_SCHEMA = "app"

project_role_enum = Enum(
    "owner",
    "viewer",
    name="project_role",
    schema=APP_SCHEMA,
)

task_status_enum = Enum(
    "todo",
    "in_progress",
    "done",
    "blocked",
    name="task_status",
    schema=APP_SCHEMA,
)

user_role_enum = Enum(
    "admin",
    "chief",
    "designer",
    "pm",
    name="user_role",
    schema=APP_SCHEMA,
)
