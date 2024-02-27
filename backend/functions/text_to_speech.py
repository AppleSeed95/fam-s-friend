import requests

ELEVEN_LABS_API_KEY = '0ce9df4f2d402cca7355b5fbd91214c3'


# Eleven Labs
# Convert text to speech
def convert_text_to_speech(message):
    body = {"text": message, "voice_settings": {"stability": 0, "similarity_boost": 0}}

    voice_shaun = "mTSvIrm2hmcnOvb21nW2"
    voice_rachel = "21m00Tcm4TlvDq8ikWAM"
    voice_antoni = "ErXwobaYiN019PkySvjV"

    # Construct request headers and url
    headers = {
        "x-api-key": ELEVEN_LABS_API_KEY,
        "Content-Type": "application/json",
        "accept": "audio/mpeg",
    }
    endpoint = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_rachel}"

    try:
        response = requests.post(endpoint, json=body, headers=headers)
    except Exception as e:
        return

    if response.status_code == 200:
        return response.content
    else:
        return
