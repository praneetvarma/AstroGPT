# 🌌 AstroGPT — AI-Powered Astrology Assistant

AstroGPT is a full-stack AI-powered astrology application that combines **astronomical calculations** with **Generative AI** to provide personalized astrology readings based on a user's birth details.

The application calculates planetary positions, zodiac signs, and Nakshatras using **Swiss Ephemeris**, then uses **Google Gemini AI** to generate meaningful and personalized interpretations.

---

## ✨ Features

### 🔮 Astrology Engine

* Calculates planetary positions using Swiss Ephemeris
* Determines:

  * Zodiac signs
  * Moon sign (Rashi)
  * Nakshatra
  * Planetary longitudes
* Supports accurate astronomical calculations

### 🤖 AI-Powered Readings

* Uses Google Gemini API for generating astrology insights
* Creates personalized interpretations based on:

  * Name
  * Date of birth
  * Time of birth
  * Place of birth
  * Planetary positions

### 🌍 Location-Based Astrology

* Converts user-entered birth locations into coordinates
* Uses OpenStreetMap Nominatim API for geocoding

### 🖥️ Modern Web Interface

* Responsive React frontend
* Interactive birth form
* Dynamic birth chart display
* Loading states and user-friendly UI

---

# 🏗️ System Architecture

```
                User
                 |
                 ↓
        React + Vite Frontend
                 |
                 ↓
          FastAPI Backend
                 |
        -------------------
        |                 |
        ↓                 ↓
Swiss Ephemeris       Gemini API
(Astrology Data)      (AI Reading)
        |
        ↓
OpenStreetMap
(Geocoding)
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* JavaScript
* CSS
* Axios

## Backend

* Python
* FastAPI
* Pydantic
* Uvicorn

## AI / GenAI

* Google Gemini API
* Prompt Engineering

## Astrology & Data

* Swiss Ephemeris (`pyswisseph`)
* OpenStreetMap Nominatim API

## Development Tools

* Git
* GitHub
* npm
* Python Virtual Environment

---

# 📂 Project Structure

```
AstroGPT/
│
├── backend/
│   │
│   ├── app/
│   │   ├── astrology_service.py
│   │   ├── gemini_service.py
│   │   ├── geocoding_services.py
│   │   ├── models.py
│   │   └── routes.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/praneetvarma/AstroGPT.git

cd AstroGPT
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

Run backend server:

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔌 API Endpoints

## Health Check

```
GET /
```

Response:

```json
{
  "message": "Welcome to AstroGPT"
}
```

---

## Generate Astrology Reading

```
POST /generate-reading
```

Request:

```json
{
  "name": "Praneet",
  "dob": "2005-01-01",
  "time": "10:30",
  "place": "Hyderabad"
}
```

Response:

```json
{
  "reading": "Your personalized astrology reading..."
}
```

---

# 🔐 Environment Variables

Create a `.env` file inside backend:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit your API keys to GitHub.

---

# 🚀 Future Improvements

* [ ] User authentication
* [ ] Save birth charts
* [ ] Generate downloadable PDF reports
* [ ] Add planetary house calculations
* [ ] Add chatbot-style astrology assistant
* [ ] Deploy frontend and backend
* [ ] Add database integration

---

# 👨‍💻 Author

**Praneet Varma**

Computer Science Student | AI & GenAI Enthusiast

Interested in:

* Large Language Models
* Retrieval-Augmented Generation (RAG)
* AI Agents
* Full Stack Development

---

# ⭐ If you like this project

Give it a star ⭐ on GitHub and feel free to contribute!
