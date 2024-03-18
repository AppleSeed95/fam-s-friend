import openai
from dotenv import load_dotenv
import os
from functions.database import get_recent_messages
from fastapi.responses import FileResponse
from io import BytesIO
from fastapi.responses import StreamingResponse

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
        print("----------This is the gpt responese---------", message_text)
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
        "content": message_input,
        # + "You must make funny story with input message. Remember! only funny and encourage story within 50 words. Please make response using same language as message input",
    }
    messages.append(user_message)
    print(messages)

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
        )
        message_text = response["choices"][0]["message"]["content"]
        return message_text
    except Exception as e:
        return


# response with stream
def get_chat_response_with_text(message_input):

    messages = get_recent_messages()
    user_message = {
        "role": "user",
        "content": message_input,
        # + "You must make funny story with input message. Remember! only funny and encourage story within 50 words. Please make response using same language as message input",
    }
    messages.append(user_message)
    print(messages)

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages, stream=True
        )
        message_text = response["choices"][0]["message"]["content"]
        return message_text
    except Exception as e:
        print("---------This is an error from openai-----------", e)
        return


def convert_text_to_speech_with_openai(audio_file):
    from pathlib import Path

    # client = OpenAI()
    try:

        speech_file_path = Path(__file__).parent / "speech.mp3"
        response = openai.audio.speech.create(
            model="tts-1", voice="echo", input=audio_file
        )
        response.stream_to_file(speech_file_path)
        print("-------------This is the audio file---------", speech_file_path)
        return StreamingResponse(BytesIO(response.audio), media_type="audio/mpeg")

    except Exception as e:
        print("---------------This is an error to cov------", e)
        return
