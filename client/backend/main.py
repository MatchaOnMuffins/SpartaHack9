import fastapi
import database

# resource
import openai
from models import User, Course, AddCourseRequest, ChatRequest, ChatResponse
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
async def get_course(course_id: str):
    course = db.get_class_by_id(course_id)
    if course:
        return fastapi.responses.JSONResponse(
            content=course, status_code=200, headers=header_dict
        )
    return fastapi.responses.JSONResponse(
        content={"error": "course not found"}, status_code=404, headers=header_dict
    )


@app.post("/add_course")
async def add_course(request: AddCourseRequest):
    # check if the user id is valid

    user = db.get_user_by_id(request.user_id)
    if not user:
        return fastapi.responses.JSONResponse(
            content={"error": "Unauthorized"}, status_code=403, headers=header_dict
        )

    if not user.is_instructor:
        return fastapi.responses.JSONResponse(
            content={"error": "Unauthorized"}, status_code=403, headers=header_dict
        )

    if db.get_class_by_id(request.course_id):
        return fastapi.responses.JSONResponse(
            content={"error": "Course ID Not Unique"},
            status_code=400,
            headers=header_dict,
        )

    if db.add_course(request):
        return fastapi.responses.JSONResponse(
            content={"success": "course added"}, status_code=200, headers=header_dict
        )

    return fastapi.responses.JSONResponse(
        content={"error": "course not added"}, status_code=400, headers=header_dict
    )


@app.get("/user/{user_id}")
async def get_user(user_id: str):
    user = db.get_user_by_id(user_id)
    if user:
        return fastapi.responses.JSONResponse(
            content=user, status_code=200, headers=header_dict
        )
    return fastapi.responses.JSONResponse(
        content={"error": "user not found"}, status_code=404, headers=header_dict
    )


@app.post("/add_user")
async def add_user(user: User):
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
async def chat_endpoint(request: ChatRequest):

    history = request.messages

    history = history[:-1]
    prompt = request.messages[-1]["content"]
    try:
        response = llm_chat(prompt, history=history)
        return ChatResponse(responses=response)
    except Exception as e:
        raise fastapi.HTTPException(status_code=500, detail=str(e))


@app.get("course/{course_id}/chat")
async def get_chat(course_id: str):
    pass


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8080)
