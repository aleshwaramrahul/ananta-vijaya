import React, { useState } from 'react';
import { ROLES, ROLE_LABELS } from '../data/roles';
import { loginUser, loginAsDemoRole } from '../utils/auth';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    const res = loginUser(email, password);
    if (res.success) {
      if (onAuthSuccess) onAuthSuccess(res.user);
      onClose();
    }
  };

  const handleDemoLogin = (role) => {
    const user = loginAsDemoRole(role);
    if (user) {
      if (onAuthSuccess) onAuthSuccess(user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FFF8F1] max-w-md w-full rounded-2xl border-2 border-[#C59A45]/50 shadow-[0_20px_50px_rgba(0,39,29,0.3)] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#00271d] text-white p-5 flex items-center justify-between border-b border-[#C59A45]/40">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFF8F1]">
              {isRegister ? 'Create Account' : 'Portal Sign In'}
            </h3>
            <p className="text-[11px] text-[#fdcd73]">
              Role-Based Access: Super Admin • Manager • User
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* 1-Click Role Switcher Demo Bar */}
        <div className="bg-[#faecd4]/70 p-3.5 border-b border-[#E8D4B5] text-xs">
          <p className="text-[#00271d] font-bold uppercase tracking-wider text-[10px] mb-2 text-center">
            ⚡ Quick 1-Click Demo Login (Select Role):
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin(ROLES.SUPER_ADMIN)}
              className="py-2 px-1.5 bg-[#00271d] hover:bg-[#173D32] text-[#fdcd73] rounded-lg font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 border border-[#C59A45]/50 shadow-sm transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">shield_person</span>
              <span>Super Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin(ROLES.MANAGER)}
              className="py-2 px-1.5 bg-[#7B5802] hover:bg-[#624501] text-white rounded-lg font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">manage_accounts</span>
              <span>Manager</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin(ROLES.USER)}
              className="py-2 px-1.5 bg-white hover:bg-[#FAF5EB] text-[#173D32] border border-[#C59A45]/60 rounded-lg font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span>User (Buyer)</span>
            </button>
          </div>
        </div>

        {/* Regular Login / Register Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-300 text-red-800 text-xs">
              {error}
            </div>
          )}

          {isRegister && (
            <div>
              <label className="block text-[#414845] font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8D4B5] bg-white text-[#173D32] focus:outline-none focus:border-[#00271d]"
              />
            </div>
          )}

          <div>
            <label className="block text-[#414845] font-semibold mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E8D4B5] bg-white text-[#173D32] focus:outline-none focus:border-[#00271d]"
            />
          </div>

          <div>
            <label className="block text-[#414845] font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E8D4B5] bg-white text-[#173D32] focus:outline-none focus:border-[#00271d]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#00271d] hover:bg-[#173D32] text-[#fdcd73] font-serif font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all mt-2"
          >
            {isRegister ? 'Register Account' : 'Sign In'}
          </button>

          <div className="text-center pt-2 border-t border-[#E8D4B5]">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-[#7B5802] font-semibold hover:underline"
            >
              {isRegister ? 'Already registered? Sign In' : 'New customer? Create User Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

