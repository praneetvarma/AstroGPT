from app.geocoding_services import get_coordinates

place = "Hyderabad"

coordinates = get_coordinates(place)

print(coordinates)