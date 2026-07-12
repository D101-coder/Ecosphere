# EcoSphere ESG Management Platform

Production ready full stack scaffold:
- Frontend: React + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: MySQL 8
- Local file storage for uploads
- Docker Compose for local development

## Quick start (local)
1. Copy `.env.example` to `backend/.env` and `frontend/.env`.
2. Start MySQL and run:
   docker-compose up --build
3. Backend runs on http://localhost:4000
4. Frontend runs on http://localhost:3000

## Features
- Signup / Login with JWT and refresh tokens
- Environmental goals CRUD with progress
- CSR activities and participation with proof upload
- Governance audits and compliance issues
- Gamification system GreenQuest with challenges, leaderboards, badges, rewards
- Dark mode, profile update, image upload
- Security: bcrypt, helmet, rate limiter, input validation, prepared statements
