import sqlite3
from models import User, Course


class Database:
    def __init__(self, db_name="VTA.db"):
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()
        self.create_tables()

    def create_tables(self):
        self.cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                user_id VARCHAR(255) PRIMARY KEY,
                email TEXT NOT NULL,
                courses TEXT NOT NULL,
                name TEXT NOT NULL,
                is_instructor INTEGER NOT NULL
            )
        """
            # courses is a list of course ids, separated by commas
        )

        self.cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS classes (
                class_id TEXT PRIMARY KEY,
                class_name TEXT NOT NULL,
                class_description TEXT NOT NULL,
                professor TEXT NOT NULL
            )
            """
        )

        self.conn.commit()

    def add_user(self, user: User):
        self.cursor.execute(
            """
            INSERT INTO users VALUES (?, ?, ?, ?, ?)
            """,
            (
                user.user_id,
                user.email,
                ",".join(user.courses),
                user.name,
                user.is_instructor,
            ),
        )
        self.conn.commit()

    def get_user_by_id(self, user_id: str):
        self.cursor.execute(
            """
            SELECT * FROM users WHERE user_id=?
            """,
            (user_id,),
        )
        user = self.cursor.fetchone()
        if user:
            return User(
                user_id=user[0],
                email=user[1],
                courses=user[2].split(","),
                name=user[3],
                is_instructor=user[4],
            )
        return None

    def get_course_by_id(self, course_id: str):
        self.cursor.execute(
            """
            SELECT * FROM classes WHERE class_id=?
            """,
            (course_id,),
        )
        course = self.cursor.fetchone()
        if course:
            return Course(
                course_id=course[0],
                class_name=course[1],
                course_description=course[2],
                professor=course[3],
            )
        return None

    def add_course(self, course: Course):

        if self.get_course_by_id(course.course_id):
            return False
        try:
            self.cursor.execute(
                """
                INSERT INTO classes VALUES (?, ?, ?, ?)
                """,
                (
                    course.course_id,
                    course.class_name,
                    course.course_description,
                    course.professor,
                ),
            )
            self.conn.commit()

        except Exception as e:
            print(e)
            return False

        return True
