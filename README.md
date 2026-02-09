<p align="center">
  <img src="client/src/assets/screenShort/short1.jpeg" alt="Popcorn Films Banner" width="100%" />
</p>

<h1 align="center">🍿 Popcorn Films</h1>

<p align="center">
  <strong>A modern, full-featured movie and TV show streaming platform built with the MERN stack</strong>
</p>

<p align="center">
  <a href="https://popcornflims.netlify.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <a href="#-introduction">Introduction</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-running-the-project">Running</a> •
  <a href="#-folder-structure">Structure</a> •
  <a href="#-screen-shot">ScreenShot</a> •
<a href="#-contributing">Contributing</a>
</p>

---

## 📖 Introduction

**Popcorn Films** is a comprehensive movie and TV show streaming platform that provides users with an immersive entertainment experience. Built with modern web technologies, it offers a Netflix-like interface with features including user authentication, personalized watchlists, viewing history, and social interactions through comments and reviews.

The platform integrates with **The Movie Database (TMDB) API** for high-quality images and metadata, and **Ophim API** for streaming content, delivering a seamless viewing experience across all devices.

### Why Popcorn Films?

- 🎬 **Rich Content Library** - Access thousands of movies and TV shows
- 🔐 **Secure Authentication** - Email/password and Google Sign-In support
- 📱 **Responsive Design** - Perfect experience on desktop, tablet, and mobile
- 🌙 **Dark Mode** - Eye-friendly viewing experience
- ⚡ **Blazing Fast** - Optimized with React Query and modern caching strategies

---

## ✨ Key Features

### 🎥 Content Discovery

- Browse movies and TV shows by categories (Popular, Top Rated, Upcoming, Trending)
- Advanced search with intelligent keyword suggestions
- Filter content by type, genre, country, and year
- Personalized recommendations based on viewing history

### 👤 User Management

- **Authentication**: Register, login, and logout with email/password
- **Google Sign-In**: Quick authentication via Firebase
- **Email Verification**: Secure account activation
- **Password Recovery**: Forgot password with email reset

### 📚 Personal Library

- **Favorites**: Bookmark your favorite films for quick access
- **Watch History**: Track recently watched content with progress
- **Custom Lists**: Organize content your way

### 💬 Social Features

- **Reviews & Comments**: Share your thoughts on movies and shows
- **Reactions**: React to other users' comments
- **Community Engagement**: See what others are saying

### 🎨 User Experience

- **Responsive Design**: Optimized for all screen sizes
- **Dark/Light Mode**: Toggle between themes
- **Smooth Animations**: Powered by Framer Motion
- **Intuitive Navigation**: Easy-to-use interface

---

## 🏗 Architecture

### System Overview

```mermaid
flowchart TB
    subgraph Client["🖥️ Client (React + Vite)"]
        UI[UI Components]
        Redux[Redux Toolkit]
        RQ[React Query]
        Router[React Router]
    end

    subgraph Server["⚙️ Server (Express.js)"]
        API[REST API]
        Auth[Authentication]
        MW[Middleware]
        Controllers[Controllers]
    end

    subgraph External["🌐 External Services"]
        TMDB[TMDB API]
        Ophim[Ophim API]
        Firebase[Firebase Auth]
        Cloudinary[Cloudinary CDN]
    end

    subgraph Database["🗄️ Database"]
        MongoDB[(MongoDB)]
    end

    Client <--> Server
    Server <--> Database
    Client <--> External
    Server <--> Firebase
    Server <--> Cloudinary
```

### Tech Stack

| Layer                | Technologies                           |
| -------------------- | -------------------------------------- |
| **Frontend**         | React 18, Vite, TailwindCSS, Shadcn/UI |
| **State Management** | Redux Toolkit, TanStack React Query    |
| **Backend**          | Node.js, Express.js                    |
| **Database**         | MongoDB with Mongoose ODM              |
| **Authentication**   | JWT, Firebase Admin SDK                |
| **File Storage**     | Cloudinary                             |
| **Email Service**    | Nodemailer                             |
| **Styling**          | TailwindCSS, Framer Motion             |
| **UI Components**    | Radix UI, Lucide Icons, Ant Design     |

### Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant Server
    participant MongoDB
    participant TMDB

    User->>Client: Browse Movies
    Client->>TMDB: Fetch Movie Data
    TMDB-->>Client: Return Movies
    Client->>User: Display Content

    User->>Client: Add to Favorites
    Client->>Server: POST /api/v1/favorites
    Server->>MongoDB: Save Favorite
    MongoDB-->>Server: Confirm
    Server-->>Client: Success Response
    Client->>User: Update UI
```

---

## 🚀 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **MongoDB** (local or Atlas connection string)
- **Git**

### Clone the Repository

```bash
git clone https://github.com/JustTaiCorn/Corn.films.git
cd Corn.films
```

### Install Dependencies

#### Client Setup

```bash
cd client
npm install
```

#### Server Setup

```bash
cd ../server
npm install
```

---

## ⚙️ Environment Configuration

### Client Environment Variables

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api/v1
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Server Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URL=mongodb://localhost:27017/popcorn-films
# Or use MongoDB Atlas:
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/popcorn-films

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# Email Configuration
EMAIL_USER=yourEmail@gmail.com
EMAIL_PASSWORD=yourEmailPassword
# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Firebase Service Account

For Firebase Admin SDK, create a `Myservice.json` file in the `server` directory with your Firebase service account credentials. You can download this from the Firebase Console under Project Settings > Service Accounts.

---

## 🏃 Running the Project

### Development Mode

#### Start the Server

```bash
cd server
npm run dev
```

Server will run on `http://localhost:5000`

#### Start the Client

```bash
cd client
npm run dev
```

Client will run on `http://localhost:5173`

### Production Build

#### Build Client

```bash
cd client
npm run build
npm run preview  # Preview production build locally
```

#### Start Server in Production

```bash
cd server
npm start
```

### Quick Start (Both Services)

You can use two terminal windows or a process manager like `concurrently`:

```bash
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Client
cd client && npm run dev
```

---

## 📁 Folder Structure

```
Corn.films/
├── 📁 client/                    # Frontend React application
│   ├── 📁 public/                # Static assets
│   ├── 📁 src/
│   │   ├── 📁 api/               # API client configuration
│   │   │   ├── 📁 client/        # Axios instances
│   │   │   ├── 📁 configs/       # API endpoints config
│   │   │   └── 📁 modules/       # API modules (user, favorite, etc.)
│   │   ├── 📁 assets/            # Images, fonts, screenshots
│   │   ├── 📁 components/        # Reusable UI components
│   │   │   ├── 📁 common/        # Shared components
│   │   │   ├── 📁 layout/        # Layout components
│   │   │   └── 📁 media/         # Media-specific components
│   │   ├── 📁 hooks/             # Custom React hooks
│   │   ├── 📁 lib/               # Utility libraries
│   │   ├── 📁 pages/             # Page components
│   │   ├── 📁 redux/             # Redux store & slices
│   │   │   ├── 📁 features/      # Feature slices
│   │   │   └── store.js          # Redux store config
│   │   ├── 📁 routes/            # Route definitions
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── .env                      # Environment variables
│   ├── package.json              # Dependencies
│   ├── tailwind.config.js        # Tailwind configuration
│   └── vite.config.js            # Vite configuration
│
├── 📁 server/                    # Backend Express application
│   ├── 📁 configs/               # Server configurations
│   ├── 📁 controllers/           # Route controllers
│   │   ├── user.controller.js    # User operations
│   │   ├── review.controller.js  # Reviews & comments
│   │   ├── history.controller.js # Watch history
│   │   └── favorite.controller.js# Favorites management
│   ├── 📁 handlers/              # Response handlers
│   ├── 📁 mailtrap/              # Email templates & config
│   ├── 📁 middlewares/           # Express middlewares
│   ├── 📁 models/                # Mongoose schemas
│   │   ├── user.model.js         # User schema
│   │   ├── review.model.js       # Review schema
│   │   ├── history.model.js      # History schema
│   │   └── favorite.model.js     # Favorite schema
│   ├── 📁 routes/                # API routes
│   ├── 📁 utils/                 # Helper utilities
│   ├── index.js                  # Server entry point
│   ├── .env                      # Environment variables
│   └── package.json              # Dependencies
│
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

---

## 📸 ScreenShot

<details>
<summary><strong>🏠 Homepage</strong> - Click to expand</summary>

![Homepage](client/src/assets/screenShort/short1.jpeg)
_Featured slider with trending movies and TV shows_

</details>

<details>
<summary><strong>🔍 Search & Discovery</strong> - Click to expand</summary>

![Search Page](client/src/assets/screenShort/short2.png)
_Smart search with keyword suggestions_

</details>

<details>
<summary><strong>🎬 Media Details</strong> - Click to expand</summary>

![Detail Page](client/src/assets/screenShort/short3.jpeg)
_Comprehensive movie information and recommendations_

</details>

<details>
<summary><strong>▶️ Video Player</strong> - Click to expand</summary>

![Watch Page](client/src/assets/screenShort/short4.jpeg)
_Smooth video player with episode list_

</details>

<details>
<summary><strong>🌍 Browse by Country</strong> - Click to expand</summary>

![Country Filter](client/src/assets/screenShort/short5.jpeg)
_Filter content by country of origin_

</details>

<details>
<summary><strong>❤️ Favorites & History</strong> - Click to expand</summary>

![Favorites](client/src/assets/screenShort/short6.jpeg)
_Easy access to your saved content_

</details>

<details>
<summary><strong>💬 Comments & Reviews</strong> - Click to expand</summary>

![Comments](client/src/assets/screenShort/short7.jpeg)
_Community engagement through comments_

</details>

<details>
<summary><strong>👤 User Profile</strong> - Click to expand</summary>

![Profile](client/src/assets/screenShort/short8.jpeg)
_Manage your profile, avatar, and password_

</details>

<details>
<summary><strong>🔐 Authentication</strong> - Click to expand</summary>

![Login](client/src/assets/screenShort/short9.jpeg)
_Secure login and registration_

</details>

<details>
<summary><strong>📱 Mobile Responsive</strong> - Click to expand</summary>

|                         Light Mode                          |                         Dark Mode                          |
| :---------------------------------------------------------: | :--------------------------------------------------------: |
| ![Mobile Light](client/src/assets/screenShort/short10.jpeg) | ![Mobile Dark](client/src/assets/screenShort/short11.jpeg) |

_Fully responsive design for mobile devices_

</details>

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- **Code Style**: Follow the existing code style and ESLint configuration
- **Commits**: Use clear, descriptive commit messages
- **Documentation**: Update documentation for any new features
- **Testing**: Test your changes thoroughly before submitting
- **Issues**: Check existing issues before creating new ones

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🌍 Internationalization (i18n)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Popcorn Films

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🗺️ Roadmap

### ✅ Completed

- [x] Core video streaming functionality
- [x] User authentication (Email & Google)
- [x] Favorites and watch history
- [x] Comments and reviews system
- [x] Responsive design with dark mode
- [x] Email verification and password reset

### 🚧 In Progress

- [ ] Multi-language support (i18n)
- [ ] Subtitle customization
- [ ] Enhanced recommendation engine

### 📋 Planned

- [ ] Social sharing integration
- [ ] User watchlist sync across devices
- [ ] Advanced filtering and sorting
- [ ] Content rating system
- [ ] Admin dashboard for content management
- [ ] Push notifications for new releases
- [ ] Offline viewing capability (PWA)
- [ ] Video quality selection
- [ ] Picture-in-Picture mode

---

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) - Movie and TV show metadata
- [Ophim API](https://ophim.cc/) - Streaming content source
- [Shadcn/UI](https://ui.shadcn.com/) - Beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful open source icons

---

<p align="center">
  <strong>⭐ If you found this project helpful, please consider giving it a star!</strong>
</p>

<p align="center">
  Made with ❤️ by the Popcorn Films Team
</p>

<p align="center">
  <a href="https://popcornflims.netlify.app/">🌐 Live Demo</a> •
  <a href="#-installation">📥 Install</a> •
  <a href="#-contributing">🤝 Contribute</a>
</p>
