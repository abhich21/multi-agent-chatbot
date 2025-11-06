# 🧠 Multi-Agent Collaboration Chatbot (MERN Stack)

This project demonstrates a **multi-agent AI collaboration system** where multiple agents — **Sales**, **Report**, and **Summary** — work together to generate business insights, store conversations, and deliver a **collaborative report in PDF format**.

Built with:
- ⚙️ **Backend:** Node.js, Express, MongoDB, Mongoose  
- 💻 **Frontend:** React + Vite  
- 🤖 **AI Integration:** Gemini (Google Generative AI)  
- 🧾 **PDF Generator:** PDFKit  
- 🧠 **Multi-Agent Logic:** Custom modular agent system  

---

## 🚀 Project Structure

project-root/
│
├── backend/
│ ├── server.js
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── chatController.js
│ ├── agents/
│ │ ├── agentManager.js
│ │ ├── salesAgent.js
│ │ ├── reportAgent.js
│ │ └── summaryAgent.js
│ ├── models/
│ │ ├── conversationModel.js
│ │ └── salesModel.js
│ ├── routes/
│ │ └── chatRoutes.js
│ ├── utils/
│ │ └── pdfGenerator.js
│ ├── .env
│ └── package.json
│
└── frontend/
├── src/
│ ├── api/
│ │ └── chatApi.js
│ ├── components/
│ │ ├── ChatWindow.jsx
│ │ ├── InputBox.jsx
│ │ └── MessageBubble.jsx
│ ├── pages/
│ │ └── ChatPage.jsx
│ ├── App.jsx
│ ├── config.js
│ └── index.css
├── vite.config.js
└── package.json

yaml
Copy code

---

## ⚙️ Backend Setup

### 1️⃣ Navigate to Backend Folder
```bash
cd backend
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Configure Environment Variables
Create a file named .env inside the backend/ directory.
You can use the example below 👇

.env.example
env
Copy code
# --- Server Configuration ---
PORT=5000
NODE_ENV=development

# --- Database Configuration (MongoDB) ---
# Local MongoDB URI
MONGO_URI=mongodb://localhost:27017/multiagent_chat_db

# (Optional) For MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/multiagent_chat_db?retryWrites=true&w=majority

# --- LLM / AI Configuration ---
# Gemini API Key (Google AI Studio)
GEMINI_API_KEY=your-gemini-api-key-here

# OpenAI API Key (optional, if using OpenAI models)
OPENAI_API_KEY=your-openai-api-key-here
⚠️ Never commit your real API keys to GitHub — use .env and add it to .gitignore.

4️⃣ Start MongoDB
If using local MongoDB:

bash
Copy code
mongod
If using MongoDB Atlas, ensure your connection string is correct in .env.

5️⃣ Start the Backend Server
bash
Copy code
npm run dev
Backend runs by default at: http://localhost:5000

💻 Frontend Setup
1️⃣ Navigate to Frontend Folder
bash
Copy code
cd frontend
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Update Backend API URL
In frontend/src/config.js, confirm this:

js
Copy code
export const API_BASE_URL = "http://localhost:5000/api";
4️⃣ Start the Frontend
bash
Copy code
npm run dev
Frontend runs by default at: http://localhost:5173

🧩 Full Workflow
1️⃣ User sends a message (e.g., "Give me the weekly revenue summary for October")
2️⃣ Backend routes message → AgentManager → triggers:

🧮 Sales Agent → fetches revenue data

📊 Report Agent → generates a report

🧠 Summary Agent → summarizes insights
3️⃣ All agent outputs are saved in MongoDB.
4️⃣ A PDF report is automatically generated and downloaded.
5️⃣ The chat UI stays active and displays the entire conversation.

📦 NPM Scripts Summary
Backend
Command	Description
npm run dev	Run backend with nodemon
npm start	Run backend in production mode
npm install	Install dependencies

Frontend
Command	Description
npm run dev	Start frontend dev server
npm run build	Create production build
npm run preview	Preview production build

🧠 Technologies Used
Backend

Node.js

Express

MongoDB + Mongoose

PDFKit

Google Generative AI (Gemini)

Frontend

React + Vite

Tailwind CSS / Custom CSS

React Icons

Axios

🔐 Environment Variables Recap
Variable	Description	Example
PORT	Backend server port	5000
MONGO_URI	MongoDB connection URI	mongodb://localhost:27017/multiagent_chat_db
GEMINI_API_KEY	Gemini API key (Google AI Studio)	your-gemini-api-key-here
OPENAI_API_KEY	Optional OpenAI key	your-openai-api-key-here

🧾 Quick Start Commands
bash
Copy code
# Clone repo
git clone https://github.com/abhich21/multi-agent-chatbot.git
cd multi-agent-chatbot

# Start backend
cd backend
npm install
npm run dev

# Start frontend
cd ../frontend
npm install
npm run dev
Then open 👉 http://localhost:5173
Your chatbot is live and ready 🎉

🧾 Example Conversation
User:

"Give me the summary for October."

Agents:

🧮 Sales Agent: “Here’s the October data: Week 1 - $5,000, Week 2 - $6,200, Week 3 - $4,800, Week 4 - $7,000.”

📊 Report Agent: “October Total: $23,000. Average weekly: $5,750. Growth: +15% vs. September.”

🧠 Summary Agent: “Revenue grew steadily this month — total $23K (+15% from last month).”

Response:
✅ PDF report automatically generated and downloaded.

🌐 Deployment Notes (Optional)
Backend: Deploy on Render or Railway

Frontend: Deploy on Vercel or Netlify

Update API_BASE_URL in frontend/src/config.js with your live backend URL.


✨ Enjoy building with AI-powered multi-agent systems!