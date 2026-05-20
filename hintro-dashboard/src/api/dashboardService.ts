import axiosClient from './axiosClient';
import { API } from '@/constants/apiEndpoints';

// Types matching expected API responses
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  login_method: string;
  status: string;
  is_hintro_admin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  user: UserProfile;
  subscription: {
    plan: string;
    billing_cycle: string;
    status: string;
  } | null;
  usage: {
    kb_files: { used: number; limit: number; percentage: number };
    vocab_terms: number;
    notes: number;
  };
}

export interface CallStats {
  totalSessions: number;
  averageDuration: number;
  totalAIInteractions: number;
  lastSession: string[];
}

export interface Participant {
  name: string;
  isUser: boolean;
}

export interface CallSession {
  _id: string;
  user_id: string;
  status: string;
  client: string;
  description: string;
  started_at: string;
  ended_at: string;
  total_duration_seconds: number;
  language: string[];
  auto_gen_ai_response: boolean;
  save_transcript: boolean;
  transcript: string | null;
  transcript_final: boolean;
  ai_interactions: number;
  call_framework_id: string | null;
  participants: Participant[];
  ended_reason: string;
  createdAt: string;
  updatedAt: string;
}

export interface CallHistoryResponse {
  callSessions: CallSession[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// ─── Auth ───────────────────────────────────────────────
export const getProfile = async (): Promise<UserProfile> => {
  return axiosClient.get(API.AUTH.PROFILE);
};

export const getDashboard = async (): Promise<DashboardData> => {
  return axiosClient.get(API.AUTH.DASHBOARD);
};

// ─── Call Sessions ──────────────────────────────────────
export const getCallStats = async (): Promise<CallStats> => {
  return axiosClient.get(API.CALL_SESSIONS.STATS);
};

export const getCallHistory = async (limit: number = 10): Promise<CallHistoryResponse> => {
  return axiosClient.get(API.CALL_SESSIONS.HISTORY(limit));
};

// ─── Health ─────────────────────────────────────────────
export const healthCheck = async (): Promise<{ status: string }> => {
  return axiosClient.get(API.HEALTH);
};
