from enum import Enum


class ProjectRole(str, Enum):
    owner = "owner"
    viewer = "viewer"


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
