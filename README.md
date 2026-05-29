# Quizify - Production-Ready Interactive Quiz Platform

Quizify is a production-ready, feature-rich MERN (MongoDB, Express.js, React, Node.js) Quiz Application built with security, scalability, and modern design in mind. It supports two user roles: **USER** and **ADMIN**, featuring secure JWT authentication, progressive answer saving, real-time leaderboard statistics, user analytics dashboards, and OpenAI-powered quiz generation.

---

## 🛠️ Tech Stack & Key Libraries

### Backend

- **Node.js & Express.js** - MVC API architecture
- **MongoDB & Mongoose** - Document-based schemas with indexed references and unique validations
- **JWT & bcryptjs** - Secure state tokens and hashed credentials
- **Zod** - Strict request schema validation middleware
- **Winston & Morgan** - High-fidelity HTTP logging and file logging
- **OpenAI Node SDK** - Latest structured JSON quiz generator outputs
- **Helmet, CORS, Rate Limiters** - Core security protection layers
- **Jest & Supertest** - Unified integration test suite

### Frontend

- **Vite & React (v18)** - Fast building and stable render engine
- **React Router Dom (v6)** - Client-side page routes
- **Context API** - Light and optimized auth/theme state providers
- **Axios** - Network client with silent refresh token interceptors
- **Tailwind CSS** - Modern styling supporting dark/light themes
- **React Hook Form** - Optimized form controls and validation states
- **Chart.js & React-Chartjs-2** - Metric aggregation diagrams

---

## 🏗️ Folder Structure

```
quiz_app_mern/
├── backend/
│   ├── config/             # DB, Logger, and Swagger specs
│   ├── controllers/        # Express handlers (MVC pattern)
│   ├── middlewares/        # JWT auth, error interceptors, rate limiters
│   ├── models/             # Mongoose schemas (User, Quiz, Attempt, etc.)
│   ├── routes/             # v1 REST API endpoints
│   ├── services/           # Business logic layer (Auth, AI prompt, Attempts)
│   ├── tests/              # Jest integration tests
│   ├── utils/              # Zod validation schemas
│   ├── Dockerfile
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/     # Common layouts, skeletons, buttons, alerts
│   │   ├── context/        # Auth and Theme provider states
│   │   ├── pages/          # Auth panels, Dashboards, Quiz flows, Admin editors
│   │   ├── services/       # Axios client with auto JWT interceptor
│   │   ├── index.css       # Tailwind entry styles & keyframe animations
│   │   └── main.jsx        # App entry point mounting routes and hooks
│   ├── Dockerfile
│   ├── tailwind.config.js
│   └── index.html
└── docker-compose.yml      # Orchestration setup
```

---

## 🗝️ API Routing Table Summary

| Method    | Endpoint                         | Description                                          | Role / Auth                   |
| :-------- | :------------------------------- | :--------------------------------------------------- | :---------------------------- |
| **POST**  | `/api/v1/auth/register`          | Sign up a new account                                | Guest (First user auto-admin) |
| **POST**  | `/api/v1/auth/login`             | Login and receive JWT access/refresh tokens          | Guest                         |
| **POST**  | `/api/v1/auth/refresh`           | Silent access token refresh using refresh token      | Logged In                     |
| **GET**   | `/api/v1/auth/me`                | Fetch details of the current logged-in user          | Logged In                     |
| **PUT**   | `/api/v1/users/profile`          | Update profile name and email                        | Logged In                     |
| **PUT**   | `/api/v1/users/avatar`           | Upload profile image (Multer)                        | Logged In                     |
| **PUT**   | `/api/v1/users/password`         | Change account password                              | Logged In                     |
| **GET**   | `/api/v1/categories`             | Get list of categories with quiz counts              | Logged In                     |
| **GET**   | `/api/v1/quizzes`                | Fetch page-indexed list of quizzes with search       | Logged In                     |
| **GET**   | `/api/v1/quizzes/:id/questions`  | Fetch questions (Strips correct options for users)   | Logged In                     |
| **POST**  | `/api/v1/attempts`               | Initialize a quiz attempt session                    | Logged In User                |
| **PUT**   | `/api/v1/attempts/:id/save`      | Save progressive answers during active session       | Logged In User                |
| **POST**  | `/api/v1/attempts/:id/submit`    | Grade and submit attempt (Writes to Leaderboard)     | Logged In User                |
| **GET**   | `/api/v1/attempts/dashboard`     | Fetch aggregate metrics for user analytics dashboard | Logged In User                |
| **GET**   | `/api/v1/leaderboard/:quizId`    | Fetch quiz rankings and rank offset of current user  | Logged In                     |
| **POST**  | `/api/v1/categories`             | Create category                                      | Admin Only                    |
| **POST**  | `/api/v1/quizzes`                | Create quiz metadata                                 | Admin Only                    |
| **POST**  | `/api/v1/questions`              | Add MCQ questions                                    | Admin Only                    |
| **POST**  | `/api/v1/questions/bulk/:quizId` | Paste array of JSON questions to load in bulk        | Admin Only                    |
| **POST**  | `/api/v1/ai/generate`            | Prompt OpenAI to build a quiz on a topic             | Admin Only                    |
| **GET**   | `/api/v1/users`                  | List all registered users                            | Admin Only                    |
| **PATCH** | `/api/v1/users/:userId/status`   | Suspend or Activate user status                      | Admin Only                    |

---

## ⚡ Setup & Run Guidelines

### 🐳 Running with Docker (Recommended)

To spin up the entire application stack including MongoDB, backend Node service, and Nginx frontend:

1. Clone or copy the folder files in workspace.
2. In the root folder (where `docker-compose.yml` resides), execute:
   ```bash
   docker compose up --build
   ```
3. Once completed:
   - Access Frontend: [http://localhost](http://localhost)
   - Access Swagger API Docs: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

### 💻 Running Locally

#### 1. Database Setup

Ensure you have a local MongoDB instance running on: `mongodb://localhost:27017`

#### 2. Backend Configurations

1. Navigate to the backend folder: `cd backend`
2. Run installation: `npm install`
3. Edit configurations inside `.env` (ensure you replace `OPENAI_API_KEY` for OpenAI generation).
4. Run testing script: `npm test`
5. Run dev server: `npm run dev` (running on `http://localhost:5000`)

#### 3. Frontend Configurations

1. Navigate to frontend folder: `cd ../frontend`
2. Run installation: `npm install`
3. Launch development workspace: `npm run dev` (running on `http://localhost:5173`)

---

## 🧠 OpenAI LLM Integration details

The AI Quiz Generation tool is located in the **Admin Panel** under **AI Quiz Builder**.

- **Prompt Engineering**: The backend passes structured guidelines requesting `MCQs`, `4 options`, `correct indices`, and a `logical explanation` tuned to a specific difficulty level ('easy', 'medium', 'hard').
- **JSON Structure**: Uses OpenAI's `response_format: { type: "json_object" }` to parse JSON blocks without issues.
- **Fail-safe Sandbox**: If the system runs without a valid `OPENAI_API_KEY` (e.g. `mock_key_for_now`), it falls back to creating high-fidelity sandbox mock quizzes so you can safely test the MERN schema pipeline without errors.
