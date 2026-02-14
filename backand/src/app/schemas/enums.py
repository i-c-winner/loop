from enum import Enum


class ProjectRole(str, Enum):
    chief = "chief"
    designer = "designer"
    pm = "pm"


class TaskStatus(str, Enum):
    todo = "todo"
    in_progress = "in_progress"
    done = "done"
    blocked = "blocked"


class UserRole(str, Enum):
    admin = "admin"
    chief = "chief"
    designer = "designer"
    pm = "pm"
