# Hintro Dashboard

A premium, production-grade, highly interactive administration and analytics dashboard built using **React + TypeScript + Vite + Tailwind CSS (v4)**.

---

## 🚀 Key Features

1. **🎨 Premium Modern Design System**
   - Harmonious HSL colors, typography, glassmorphic panels, and subtle micro-animations.
   - **Full Dark/Light Mode Theme support** (`darkMode: 'class'`), stored persistently in local storage.
   - Smooth custom-tailored transition animations.

2. **⚡ API Service Integration with Mock Fallbacks**
   - Automated concurrent queries utilizing `Promise.all` via a central Axios wrapper.
   - Graceful offline/error state handling with instant fallback mock values.
   - Manual **Retry Connection** buttons on UI failure components.

3. **📊 Dynamic Data Visualizations**
   - Interactive Area Charts using `Recharts`.
   - Granular time filters: **Weekly**, **Monthly**, and **Yearly** chart filters.
   - Custom-themed recharts tooltips matching dark mode.

4. **📬 Robust Feedback Form Modal**
   - Validated email & ratings form fields.
   - Stores submitted items to local storage.
   - Live "Submitted History" logs tab in the modal with dynamic layout rendering.

5. **🔔 Global Stacked Toast Notifications**
   - Lightweight custom Zustand notification state controller.
   - Visual success / error / warning indicator cards with fade-out animations.

6. **🛠️ Core UI Library & Performance Opts**
   - Accessible and polymorphic custom UI components (`Button`, `Input`, `Card`).
   - Numerical increment counters (`AnimatedCounter.tsx`) with customizable decimal/currency styles.
   - Route-based code-splitting using React `lazy` and `Suspense`.
   - Global Error Boundaries capturing rendering incidents.

---

## 📁 Folder Structure

```
hintro-dashboard/
├── src/
│   ├── api/
│   │   └── axiosClient.ts       # Axios instances & request interceptors
│   ├── components/
│   │   ├── charts/
│   │   │   └── RevenueChart.tsx # Recharts configuration
│   │   ├── common/
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ToastContainer.tsx
│   │   ├── feedback/
│   │   │   ├── FeedbackModal.tsx
│   │   │   └── LogoutModal.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Sidebar.tsx
│   ├── constants/
│   │   ├── apiEndpoints.ts
│   │   ├── routes.ts
│   │   └── sidebarItems.ts
│   ├── hooks/
│   │   └── useDashboardData.ts  # Fetches and transforms metrics
│   ├── layouts/
│   │   ├── DashboardLayout.tsx
│   │   └── MainLayout.tsx
│   ├── pages/
│   │   ├── Dashboard/
│   │   └── NotFound/
│   ├── store/
│   │   ├── useAppStore.ts       # Zustand general theme & profile state
│   │   └── useToastStore.ts     # Zustand toast notifier queue
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── storage.ts
│   ├── App.tsx
│   ├── index.css                # Global styles and Tailwind imports
│   └── main.tsx
├── tailwind.config.js           # Extended core themes and keyframe definitions
└── vite.config.ts
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install all dependencies:
   ```bash
   npm install
   ```

2. Launch local dev environment:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Running Production Builds

Validate the build and bundle assets using:
```bash
npm run build
```
The compiled SPA builds are written to `/dist`.

---

## ⚙️ central API Configuration

To point the dashboard to a production API server, configure the base path:
```ts
// src/api/axiosClient.ts
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://mock-backend-hintro.vercel.app/api',
  timeout: 10000,
});
```

Configure endpoints inside:
`src/constants/apiEndpoints.ts`
