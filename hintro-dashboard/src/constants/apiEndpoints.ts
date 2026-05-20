// Matches the Postman collection exactly
// baseUrl = http://localhost:3001

export const API = {
  HEALTH: '/health',

  AUTH: {
    PROFILE: '/api/auth/profile',
    DASHBOARD: '/api/auth/dashboard',
  },

  CALL_SESSIONS: {
    STATS: '/api/call-sessions/stats',
    HISTORY: (limit: number = 10) => `/api/call-sessions?limit=${limit}`,
  },
};
