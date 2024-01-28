import openai

from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
import os

from langchain_openai.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)

from langchain.schema import HumanMessage, SystemMessage, AIMessage
from langchain_openai import ChatOpenAI

from typing import List, Union

load_dotenv()


embeddings_model = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY"))


# query = "What is a pointer?"

db = FAISS.load_local("faiss_index", embeddings_model)


retriever = db.as_retriever()


"""

from langchain.text_splitter import CharacterTextSplitter

from langchain_community.document_loaders import PyPDFLoader


doc = PyPDFLoader("client/backend/eecs280notes.pdf").load_and_split(
    text_splitter=CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
)

print(docs)
for i in docs:
    print(1)



"""


chat = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-1106")


def llm_chat(
    query, history=None
) -> List[Union[HumanMessage, SystemMessage, AIMessage]]:

    # add up everything in history
    # embed it
    # search for it

    retreival_query = " ".join([message.content for message in history])

    retreival_query = retreival_query + " \n" + query

    docs = retriever.invoke(retreival_query)

    messages = []

    messages.append(
        SystemMessage(
            content="You are a TA for EECS 280. You are helping a student with their homework. you have to make your response as short as possible."
        ),
    )

    if history:
        for message in history:
            if message["role"] == "user":
                messages.append(
                    HumanMessage(
                        content=message["content"],
                    )
                )
            else:
                messages.append(
                    AIMessage(
                        content=message["content"],
                    )
                )

    messages.append(
        HumanMessage(
            content=f"""
            ONLY USE THE FOLLOWING TEXT TO ANSWER THE STUDENT'S QUESTIONS:
            {docs[0].page_content
            }
            
            If the user asks a question that is not in the text above, you have to refuse to answer the question.
            
        However, you should remember that the users can't see the text above, so you should avoid referencing it in your response.
        
        If the student says "Hello", you should introduce yourself and ask them how you can help them.
        User Query:
        {query}"""
        )
    )

    # return chat(
    #    messages,
    # ).content

    # print(messages)
    messages.append(
        chat(
            messages,
        )
    )

    return messages


if __name__ == "__main__":

    history = []

    while True:
        query = input("query: ")
        history = llm_chat(query, history=history)

        # print(history)

        print(history[-1].content)
