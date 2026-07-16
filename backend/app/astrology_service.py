from datetime import datetime
import swisseph as swe


SIGNS = [
    "Aries","Taurus","Gemini","Cancer",
    "Leo","Virgo","Libra","Scorpio",
    "Sagittarius","Capricorn","Aquarius","Pisces"
]

NAKSHATRAS = [
    "Ashwini","Bharani","Krittika",
    "Rohini","Mrigashira","Ardra",
    "Punarvasu","Pushya","Ashlesha",
    "Magha","Purva Phalguni","Uttara Phalguni",
    "Hasta","Chitra","Swati",
    "Vishakha","Anuradha","Jyeshtha",
    "Mula","Purva Ashadha","Uttara Ashadha",
    "Shravana","Dhanishta","Shatabhisha",
    "Purva Bhadrapada","Uttara Bhadrapada","Revati"
]


PLANETS = {
    "Sun": swe.SUN,
    "Moon": swe.MOON,
    "Mars": swe.MARS,
    "Mercury": swe.MERCURY,
    "Jupiter": swe.JUPITER,
    "Venus": swe.VENUS,
    "Saturn": swe.SATURN,
    "Rahu": swe.MEAN_NODE
}


def get_zodiac(longitude):
    return SIGNS[int(longitude / 30)]


def get_nakshatra(longitude):

    size = 360 / 27

    index = int(longitude / size)

    return NAKSHATRAS[index]


def get_julian_day(dob: datetime):
    return swe.julday(
        dob.year,
        dob.month,
        dob.day,
        dob.hour + dob.minute / 60
    )


def calculate_planet(jd, planet):

    result = swe.calc_ut(
        jd,
        planet,
        swe.FLG_SIDEREAL
    )

    longitude = result[0][0]

    return {
        "longitude": longitude,
        "longitude_rounded": round(longitude,2),
        "sign": get_zodiac(longitude)
    }


def calculate_birth_chart(dob: datetime):

    swe.set_sid_mode(swe.SIDM_LAHIRI)

    jd = get_julian_day(dob)

    birth_chart = {}

    for name, planet in PLANETS.items():
        birth_chart[name] = calculate_planet(jd, planet)

    rahu = birth_chart["Rahu"]["longitude"]

    ketu = (rahu + 180) % 360

    birth_chart["Ketu"] = {
        "longitude": ketu,
        "longitude_rounded": round(ketu,2),
        "sign": get_zodiac(ketu)
    }

    moon_longitude = birth_chart["Moon"]["longitude"]

    birth_chart["Nakshatra"] = get_nakshatra(moon_longitude)

    return birth_chart