from fastapi import APIRouter
from datetime import datetime

from app.models import UserData
from app.astrology_service import calculate_birth_chart
from app.geocoding_services import get_coordinates
from app.gemini_service import generate_astrology_response

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Welcome to AstroGPT!"
    }


@router.post("/generate-reading")
def generate_reading(user: UserData):

    coordinates = get_coordinates(user.place)
    print(user.dob)
    print(user.time)
    dob = datetime.strptime(
        f"{user.dob} {user.time}",
        "%Y-%m-%d %H:%M"
    )

    chart = calculate_birth_chart(dob)

    reading = generate_astrology_response(
        user=user,
        birth_chart=chart,
        coordinates=coordinates
    )

    return {
        "coordinates": coordinates,
        "birth_chart": chart,
        "reading": reading
    }