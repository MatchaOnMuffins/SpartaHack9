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
):
    history_content = [message["content"] for message in history]
    # try to only get the last 3 messages
    try:
        retreival_query = " \n".join(history_content[-3:])
    except:
        retreival_query = ' '.join(history_content)
    

    retreival_query = retreival_query + " \n" + query

    docs = retriever.invoke(retreival_query)
    
    #print(retreival_query)

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
            elif message["role"] == "system":
                messages.append(
                    SystemMessage(
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
            Generate your response by following the steps below:

1. Recursively break-down the post into smaller questions/directives

2. For each atomic question/directive:

2a. Select the most relevant information from the context in light of the conversation history

3. Generate a draft response using the selected information, whose brevity/detail are tailored to the student's expertise

4. Remove duplicate content from the draft response

5. Generate your final response after adjusting it to increase accuracy and relevance

6. Now only show your final response! Do not provide any explanations or details

CONTEXT:
            {docs[0].page_content
            }
            
            If the user asks a question that is not in the text above, you have to refuse to answer the question.
            
        However, you should remember that the users can't see the text above, so you should avoid referencing it in your response.
        
        If the user wants elaboration on a topic, you should explain it in more detail.
        
        If the student says "Hello", you should introduce yourself and ask them how you can help them.
        
        
        CONVERSATION HISTORY:
        
        {history_content}
        
        User Query:
        {query}"""
        )
    )
    
    #print(messages)

    # return chat(
    #    messages,
    # ).content

    # print(messages)
    
    
    messages.append(chat(
        messages,
    ))
    
    formatted_messages = []
    
    # replace the second to last message with the query only
    messages[-2] = HumanMessage(
        content=query
    )
    
    
    
    for interaction in messages:
        
        
        if interaction.type == "human":
            formatted_messages.append(
                {"role": "user", "content": interaction.content}
            )
            
        elif interaction.type == "system":
            formatted_messages.append(
                {"role": "assistant", "content": interaction.content}
            )
            
        elif interaction.type == "ai":
            formatted_messages.append(
                {"role": "assistant", "content": interaction.content}
            )
            
        else:
            raise ValueError("Invalid message type")
        
        
        
    return formatted_messages
    #return messages


if __name__ == "__main__":

    history = []

    while True:
        query = input("query: ")
        history = llm_chat(query, history=history)

        # print(history)

        print(history[-1]["content"])
