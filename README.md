# AptiQ - AI-Powered Adaptive Learning Platform

AptiQ is a production-ready web application that acts as a personal human tutor. It uses Generative AI to teach aptitude and technical concepts through an adaptive learning loop.

## 🚀 Features

- **Personalized Learning**: AI adapts the difficulty based on your performance.
- **Interactive Sessions**: Logic explanation, worked examples, and practice questions.
- **Real-time Feedback**: Instant analysis of your answers with corrective explanations.
- **Smart Dashboard**: Track your progress, strong areas, and weak topics.
- **Premium UI**: Dark mode, glassmorphism, and smooth animations.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB
- **AI Engine**: OpenAI API (Prompt Engineered for education)
- **Authentication**: JWT & Bcrypt

## 📂 Project Structure

```
AptiQ/
├── backend/            # Express Server & API
│   ├── src/
│   │   ├── config/     # DB Connection
│   │   ├── controllers/# Business Logic (Auth, Learning)
│   │   ├── models/     # Mongoose Schemas (User, Session)
│   │   ├── routes/     # API Endpoints
│   │   ├── services/   # AI Service (OpenAI Integration)
│   └── app.js          # App Setup
├── frontend/           # React Client
│   ├── src/
│   │   ├── api/        # Axios Setup
│   │   ├── components/ # Reusable UI Components
│   │   ├── context/    # Auth Context
│   │   ├── pages/      # Application Pages (Dashboard, Learn, etc.)
│   └── tailwind.config.js
└── README.md
```

## ⚡ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or Atlas URI)
- OpenAI API Key

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/` with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aptiq
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
OPENAI_API_KEY=your_openai_api_key
```
Start the server:
```bash
npm run dev
# or
node server.js
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Start the client:
```bash
npm run dev
```

### 3. Usage
1. Open `http://localhost:5173`.
2. Sign up for an account.
3. Choose a topic from the Dashboard.
4. Start learning!

## 🧠 AI Prompt Engine
The core of AptiQ is the `aiService.js` which uses a structured prompt template to generate educational content in JSON format, ensuring consistent and high-quality tutoring.
