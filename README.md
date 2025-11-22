⭐ DRIVING SCHOOL MANAGEMENT SYSTEM — (React + Node + OpenAI Chatbot)

A modernized, responsive, full-stack Driving School Management System built with React, Node.js, and an integrated OpenAI-powered AI Chatbot for real-time conversation and support.

This project is a rewrite of an older Angular version, redesigned with a more scalable architecture, cleaner UI, and integrated AI capabilities.

🚀 Features
Frontend (React)

Clean, responsive interface

CoreUI + Material UI styling

Redux-based state management

Chat widget (react-chat-window)

Backend (Node.js)

Custom Express server

AI Chat endpoint using OpenAI API

Secure .env variable handling

CORS-enabled for local dev

AI Chatbot

Real-time responses using OpenAI

Context-aware conversation

Floating chat widget integrated into the UI

Fully customizable theme

🗂 Project Structure
project-root/
│
├── server/           # Node backend (OpenAI calls)
│   ├── server.js
│   ├── package.json
│   ├── .env          # contains API keys (NOT committed)
│   └── .env.example  # safe template for others
│
├── src/              # React frontend
│   ├── components/
│   │    └── ChatWidget.jsx
│   ├── chat-widget-theme.css
│   └── ...
│
├── package.json      # Frontend dependencies
└── README.md

🛠 Getting Started (Local Development)

This project uses two servers:

React frontend → http://localhost:3000

Node backend (AI server) → http://localhost:3001

Follow these steps carefully 👇

1️⃣ Clone the Repository
git clone https://github.com/YOUR_USERNAME/driving-schools-web-app.git
cd driving-schools-web-app

2️⃣ Install Frontend Dependencies
npm install

3️⃣ Set Up Backend (AI Server)

Go inside the server folder:

cd server
npm install


Create an .env file:

cp .env.example .env


Then open .env and put your actual OpenAI API key:

OPENAI_API_KEY=sk-xxxxxxx
PORT=3001


⚠️ Never commit this file.
The repo already includes a .gitignore entry so .env stays private.

4️⃣ Start Backend
npm run dev


Expected output:

OPENAI key loaded: true
API listening on http://localhost:3001


Leave this running.

5️⃣ Start Frontend

Open a new terminal:

npm start


Your app is now available at:

👉 http://localhost:3000

And the chatbot will communicate with the backend through:

POST /api/chat

🔐 Environment Variables

We use .env files to keep secrets safe.

Example environment file:

(server/.env.example)

OPENAI_API_KEY=your_openai_key_here
PORT=3001

To create your own .env:
cp server/.env.example server/.env


Then edit the values inside.

🧠 AI Chatbot Integration

The chatbot uses:

react-chat-window for UI

Custom ChatWidget.jsx

/api/chat backend endpoint

OpenAI's GPT models

Example backend call:

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages,
});

📦 Deployment Guide

When deploying:

❗ You must set environment variables on the host:

For example on Render, Railway, Heroku, Vercel:

OPENAI_API_KEY=sk-xxxxx
PORT=3001


You do not upload .env to GitHub.

Your frontend should be configured to call the deployed server URL.

📑 Scripts
Frontend
npm start        # run dev server
npm run build    # production build

Backend
npm run dev      # development (nodemon)
npm start        # production

🤝 Contributing

Pull requests are welcome!
If you want to add features, just open an issue.

🛡 License

This project is licensed under the MIT License.
