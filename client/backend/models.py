class User:
    def __init__(self, user_id, username, email):
        self.user_id = user_id
        self.username = username
        self.email = email

class Instructor(User):
    def __init__(self, user_id, username, email):
        super().__init__(user_id, username, email)
        self.classes = [Class_Instructor]

class Student(User):
    def __init__(self, user_id, username, email):
        super().__init__(user_id, username, email)
        self.classes = [Class_Student]

class Class:
    def __init__(self, class_id, class_name, professor):
        self.class_id = class_id
        self.class_name = class_name
        self.professor = professor
        self.std = []

class Class_Instructor(Class):
    def __init__(self, class_id, class_name, professor):
        super().__init__(class_id, class_name, professor)

class Class_Student(Class):
    def __init__(self, class_id, class_name, professor):
        super().__init__(class_id, class_name, professor)

