# MindShare
A Platform for sharing innovative ideas. Build for APIhub Hackathon 1.0.


## ✨ Features
- ✅ User authentication (JWT)
- 📝 Idea creation with images (Cloudinary)
- 🔍 Browse ideas with sorting (newest first)
- 🗑️ Secure idea deletion (creator-only)
- 🖼️ Automatic image cleanup

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, MongoDB
- **Image Storage**: Cloudinary
- **Authentication**: JWT

## 🚀 API Endpoints

| Method | Endpoint          | Description                          | Auth Required |
|--------|-------------------|--------------------------------------|---------------|
| POST   | `/api/ideas`      | Create idea with image               | Yes           |
| GET    | `/api/ideas`      | Get all ideas (sorted newest first)  | No            |
| DELETE | `/api/ideas/:id`  | Delete idea (creator-only)           | Yes           |

## 🔧 Installation
1. Clone repo:
   ```bash
   git clone https://github.com/RajSathawara/MindShare.git
   cd backend