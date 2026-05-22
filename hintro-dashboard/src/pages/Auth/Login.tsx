import React, { useState } from 'react';
import { Mail, EyeOff, Eye } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppStore, MOCK_USERS } from '@/store/useAppStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // If already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    // Check if email matches u1, otherwise default to u2
    if (email.toLowerCase().includes('john')) {
      setUser(MOCK_USERS[0]);
    } else {
      setUser(MOCK_USERS[1]);
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      {/* Inner Box */}
      <div 
        className="flex flex-col animate-fade-in"
        style={{ width: '384px', height: '291px' }}
      >
        <h1 className="text-[28px] font-bold text-black text-center mb-6">Login</h1>

        <form className="flex flex-col flex-1" onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-[13px] font-medium text-slate-900 mb-1.5">
              Email
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-slate-400">
                <Mail className="w-[15px] h-[15px]" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@email.com"
                className="w-full h-10 pl-[34px] pr-3 bg-[#F8F9FA] border border-[#E2E2E8] rounded-md text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block text-[13px] font-medium text-slate-900 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full h-10 px-3 pr-[34px] bg-[#F8F9FA] border border-[#E2E2E8] rounded-md text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <Eye className="w-[15px] h-[15px]" /> : <EyeOff className="w-[15px] h-[15px]" />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-10 bg-black text-white rounded-md text-[13px] font-medium hover:bg-slate-800 transition-colors mt-auto"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
