from datetime import datetime
from app.astrology_service import calculate_birth_chart

dob = datetime(2005,7,15,10,30)

chart = calculate_birth_chart(dob)

for key,value in chart.items():
    print(key,":",value)