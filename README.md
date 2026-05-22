# Hintro Dashboard

A modern and responsive frontend dashboard built for the Hintro Frontend Assignment using React, Vite, Tailwind CSS, and Mock APIs.

---

## 🚀 Live Demo

[https://mock-dashboard-v8su.vercel.app](https://mock-dashboard-v8su.vercel.app)

---

## 📂 GitHub Repository

[https://github.com/Aditya-Raj-25/Mock-Dashboard](https://github.com/Aditya-Raj-25/Mock-Dashboard)

---

# 📖 Project Overview

This project is a frontend dashboard implementation based on the provided Figma design and mock backend APIs.

The application supports:

- Responsive desktop and mobile layouts
- Dynamic dashboard statistics
- Analytics charts
- Recent call history
- Empty state handling
- User switching
- Feedback modal with localStorage persistence
- Reusable scalable frontend architecture

---

# ✨ Features

## 📊 Dashboard
- Responsive dashboard layout
- Sidebar navigation
- Top navbar/header
- Stats cards
- Analytics charts
- Recent calls section
- Empty states

---

## 🔄 API Integration
Integrated with the provided mock backend APIs.

Supports:
- Dashboard stats
- User profile
- Recent call history
- Dynamic analytics data

---

## 👥 User Switching

The project supports 2 mock users:

### User 1 (`u1`)
- Empty dashboard state
- No recent calls
- Empty analytics

### User 2 (`u2`)
- Populated dashboard
- Analytics charts
- Dynamic call history

---

## 💬 Feedback System
- Feedback modal
- LocalStorage persistence
- Validation handling

---

## 📱 Responsive Design
Fully responsive across:
- Mobile
- Tablet
- Desktop

---

# 🛠 Tech Stack

| Technology | Usage |
|---|---|
| React | Frontend Library |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router DOM | Routing |
| Axios | API Requests |
| Recharts | Analytics Charts |
| Zustand / Context API | State Management |
| LocalStorage | Feedback Persistence |

---

# 📁 Folder Structure

```txt
src/
│
├── api/
│   ├── axiosClient.js
│   └── endpoints.js
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── illustrations/
│
├── components/
│   ├── charts/
│   ├── common/
│   ├── dashboard/
│   ├── layout/
│   └── modals/
│
├── constants/
│   ├── routes.js
│   ├── sidebarItems.js
│   └── theme.js
│
├── hooks/
│   ├── useDashboard.js
│   ├── useProfile.js
│   └── useCallHistory.js
│
├── layouts/
│   └── DashboardLayout.jsx
│
├── pages/
│   ├── Dashboard/
│   ├── Analytics/
│   ├── Settings/
│   └── Feedback/
│
├── services/
│   ├── authService.js
│   └── callSessionService.js
│
├── store/
│   └── userStore.js
│
├── styles/
│   └── globals.css
│
├── utils/
│   ├── formatTime.js
│   ├── formatDate.js
│   └── localStorage.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# ⚙️ Setup Instructions

## 1️⃣ Open the Project Directory

Navigate to the project folder in your terminal:

```bash
cd hintro-dashboard
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Start Development Server

```bash
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001
```

---

# 🔌 API Information

Base URL:

```txt
http://localhost:3001
```

Required Header:

```txt
x-user-id: u1
```

or

```txt
x-user-id: u2
```

---

# 📡 API Endpoints Used

| Endpoint | Description |
|---|---|
| `/health` | Health Check |
| `/api/auth/profile` | User Profile |
| `/api/auth/dashboard` | Dashboard Summary |
| `/api/call-sessions/stats` | Dashboard Stats |
| `/api/call-sessions` | Recent Calls |

---

# 🧠 Assumptions Made

- Mock APIs may return empty or randomized data
- `u1` represents empty dashboard state
- `u2` represents populated dashboard state
- Feedback data is stored locally using localStorage
- Dashboard charts dynamically adapt to API data

---

# 🏗 Architecture Decisions

## Reusable Components
The UI is broken into reusable components for scalability and maintainability.

Examples:
- `Sidebar`
- `Navbar`
- `StatCard`
- `ChartCard`
- `EmptyState`
- `FeedbackModal`

---

## API Layer Separation
Business logic is separated from UI using:
- services
- hooks
- centralized axios instance

---

## Responsive Strategy
Mobile-first responsive design using:
- Tailwind breakpoints
- responsive grids
- collapsible sidebar

---

# 🎨 UI/UX Enhancements

- Smooth transitions
- Responsive layouts
- Loading skeletons
- Empty state handling
- Dynamic charts
- Mobile sidebar drawer

---

# 🚀 Future Improvements

- Authentication flow
- Dark/Light theme toggle
- Pagination
- Unit testing
- Performance optimizations
- Advanced chart filtering

---

# 🎯 Design Reference

Figma design provided by Hintro.

---

# 👨‍💻 Author

Aditya Raj Srivastava

Frontend Developer | React Developer
