from pydantic import BaseModel

class UserData(BaseModel):
    name: str
    dob: str          # YYYY-MM-DD
    time: str         # HH:MM
    place: str