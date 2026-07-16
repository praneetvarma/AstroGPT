from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_astrology_response(user, birth_chart, coordinates):

    prompt = f"""
You are AstroGPT, an AI Vedic astrologer.

The following astrology calculations were already computed using Swiss Ephemeris.
Do NOT recalculate anything.

User Details
-------------
Name: {user.name}
Date of Birth: {user.dob}
Time: {user.time}
Place: {user.place}

Coordinates
-----------
Latitude: {coordinates['latitude']}
Longitude: {coordinates['longitude']}

Birth Chart
-----------
{birth_chart}

Using ONLY this birth chart:

1. Give a short personality analysis.
2. Mention strengths.
3. Mention weaknesses.
4. Suggest suitable career paths.
5. Mention relationship tendencies.
6. Mention health precautions.
7. End with a positive conclusion.

Keep the tone friendly.
Do not mention that you are an AI.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text