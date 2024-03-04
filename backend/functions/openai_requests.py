import openai
from dotenv import load_dotenv
import os
from functions.database import get_recent_messages

# Load .env file
load_dotenv()
# Retrieve Enviornment Variables
# openai.organization = config("OPEN_AI_ORG")
api_key = os.getenv("OPEN_AI_KEY")

openai.api_key = api_key


# Open AI - Whisper
# Convert audio to text
def convert_audio_to_text(audio_file):
    try:
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        message_text = transcript["text"]
        return message_text
    except Exception as e:
        print("---------This is an error from openai-----------", e)
        return None


# Open AI - Chat GPT
# Convert audio to text
def get_chat_response(message_input):

    messages = get_recent_messages()
    user_message = {
        "role": "user",
        "content": message_input
        + "You must make funny story with input message. Remember! only funny and encourage story within 50 words",
    }
    messages.append(user_message)
    print(messages)

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages
        )
        message_text = response["choices"][0]["message"]["content"]
        return message_text
    except Exception as e:
        return
