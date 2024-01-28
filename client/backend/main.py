import fastapi
import database

# resource
import openai
from models import *
from dotenv import load_dotenv

from chat import llm_chat

load_dotenv()


client = openai.Client()

db = database.Database()
db.create_tables()


app = fastapi.FastAPI()

header_dict = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}


@app.get("course/{course_id}")
async def get_course(course_id: str)-> GetCourseResponse:
    course = db.get_class_by_id(course_id)
    if course:
        return GetCourseResponse(course=course)
    return GetCourseResponse(error="Course not found")


@app.post("/add_course")
async def add_course(request: AddCourseRequest)->AddCourseResponse:
    # check if the user id is valid

    user = db.get_user_by_id(request.user_id)
    if not user:
        return AddCourseResponse(error="User ID Not Found")
    if not user.is_instructor:
        return AddCourseResponse(error="User is not an instructor")

    if db.get_class_by_id(request.course_id):
        return AddCourseResponse(error="Course ID already exists")

    if db.add_course(request):
        return AddCourseResponse(success="Course added")

    return AddCourseResponse(error="Course not added")

@app.get("/user/{user_id}")
async def get_user(user_id: str)->GetUserResponse:
    user = db.get_user_by_id(user_id)
    if user:
        return GetUserResponse(user=user)
    return GetUserResponse(error="User not found")


@app.post("/add_user")
async def add_user(user: User)->AddUserResponse:
    exists = db.get_user_by_id(user.user_id)

    if exists:
        return fastapi.responses.JSONResponse(
            content={"error": "user already exists"},
            status_code=400,
            headers=header_dict,
        )

    try:
        db.add_user(user)
    except Exception as e:
        return fastapi.responses.JSONResponse(
            content={"error": str(e)}, status_code=400, headers=header_dict
        )
    return fastapi.responses.JSONResponse(
        content={"success": "user added"}, status_code=200, headers=header_dict
    )


@app.post("/chat")
async def chat_endpoint(request: ChatRequest)->ChatResponse:

    history = request.messages

    history = history[:-1]
    prompt = request.messages[-1]["content"]
    try:
        response = llm_chat(prompt, history=history)
        return ChatResponse(responses=response)
    except Exception as e:
        return ChatResponse(error=str(e))


@app.get("course/{course_id}/chat")
async def get_chat(course_id: str):
    return fastapi.responses.JSONResponse(
        content={"error": "not implemented"}, status_code=400, headers=header_dict
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8080)
