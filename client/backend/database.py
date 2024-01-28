import sqlite3
from models import User, Class

class Database:
    def __init__(self, db_name='mydatabase.db'):
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()
        self.create_tables()

    def create_tables(self):
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY,
                username TEXT NOT NULL,
                email TEXT NOT NULL
            )
        ''')

        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS classes (
                class_id INTEGER PRIMARY KEY,
                class_name TEXT NOT NULL,
                professor TEXT NOT NULL
            )
        ''')

        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS deadlines (
                deadline_id INTEGER PRIMARY KEY,
                class_id INTEGER NOT NULL,
                content TEXT NOT NULL,
                due_date TEXT NOT NULL,
                FOREIGN KEY (class_id) REFERENCES classes (class_id)
            )
        ''')

        self.conn.commit()

    def add_user(self, user):
        self.cursor.execute('''
            INSERT INTO users (username, email) VALUES (?, ?)
        ''', (user.username, user.email))
        self.conn.commit()

    def add_class(self, class_obj):
        self.cursor.execute('''
            INSERT INTO classes (class_name, professor) VALUES (?, ?)
        ''', (class_obj.class_name, class_obj.professor))
        class_id = self.cursor.lastrowid
        self.conn.commit()
        return class_id

    def add_deadline(self, deadline):
        self.cursor.execute('''
            INSERT INTO deadlines (class_id, content, due_date) VALUES (?, ?, ?)
        ''', (deadline.class_id, deadline.content, deadline.due_date))
        self.conn.commit()

    def get_user_by_id(self, user_id):
        self.cursor.execute('SELECT * FROM users WHERE user_id = ?', (user_id,))
        row = self.cursor.fetchone()
        if row:
            return User(*row)
        return None

    def get_class_by_id(self, class_id):
        self.cursor.execute('SELECT * FROM classes WHERE class_id = ?', (class_id,))
        row = self.cursor.fetchone()
        if row:
            return Class(*row)
        return None