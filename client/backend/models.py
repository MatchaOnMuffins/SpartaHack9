from pydantic import BaseModel
from typing import Optional, List, Union
from langchain.schema import HumanMessage, SystemMessage, AIMessage


class User(BaseModel):
    user_id: str
    email: str
    name: str
    courses: list[str]
    is_instructor: bool


class Course(BaseModel):
    course_id: str
    class_name: str
    professor: str
    course_description: str


class AddCourseRequest(BaseModel):
    course_id: str
    class_name: str
    professor: str
    course_description: str
    user_id: str


class AddCourseResponse(BaseModel):
    success: str


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]


class ChatResponse(BaseModel):
    messages: Optional[List[dict]] = None
    error: Optional[str] = None
    
    
class GetCourseResponse(BaseModel):
    course: Course
    error: Optional[str] = None


class GetUserResponse(BaseModel):
    user: Optional[User] = None
    error: Optional[str] = None
    
    
class AddUserResponse(BaseModel):
    success: str
    error: Optional[str] = None
    