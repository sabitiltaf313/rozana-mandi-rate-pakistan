import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { OWNER_INFO } from '../data/mandiData';
import { Lock, Phone, LogIn, CheckCircle2, AlertTriangle, ArrowRight, Eye, EyeOff, ShieldAlert, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginError, signupSuccessMessage, clearSignupMessage, navigateTo } = useAuth();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    // If there's an active signup message, scroll up and keep it visible
  }, [signupSuccessMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleanPhone = phone.trim().replace(/[-\s]/g, '');
    if (!cleanPhone) {
      setLocalError('برائے مہربانی اپنا موبائل نمبر درج کریں (Enter mobile number)');
      return;
    }

    if (!password) {
      setLocalError('برائے مہربانی اپنا پاس ورڈ درج کریں (Enter password)');
      return;
    }

    // Call login from AuthContext which handles:
    // a) If user not found -> "Number ghalat hai"
    // b) If password wrong -> "Password ghalat hai"
    // c) If status = BLOCKED -> Show full screen blocked screen
    const success = login(cleanPhone, password);
    if (success) {
      clearSignupMessage();
    }
  };

  const handleQuickFill = (demoPhone: string, demoPass: string) => {
    setPhone(demoPhone);
    setPassword(demoPass);
    setLocalError(null);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-stone-200/60 border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/60 border border-emerald-400/30 text-emerald-100 text-xs font-semibold mb-2">
            <LogIn className="w-3.5 h-3.5 text-emerald-300" />
            <span>روزانہ منڈی ریٹ پورٹل لاگ ان</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            لاگ ان کریں (Login)
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            اپنا رجسٹرڈ موبائل نمبر اور پاس ورڈ درج کریں
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Signup Success Banner as requested: "Account ban gaya, ab login karein" */}
          {signupSuccessMessage && (
            <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-sm font-bold flex items-center gap-3 animate-fade-in shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="text-base text-emerald-800 font-extrabold">
                  {signupSuccessMessage}
                </p>
                <p className="text-xs text-emerald-700 font-normal">
                  آپ کا فری اکاؤنٹ کامیابی سے بن چکا ہے۔ اب نیچے موبائل نمبر اور پاس ورڈ سے لاگ ان کریں۔
                </p>
              </div>
            </div>
          )}

          {/* Login Errors as requested: "Number ghalat hai" or "Password ghalat hai" */}
          {(loginError || localError) && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-700 text-sm font-semibold flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <span>{loginError || localError}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                موبائل نمبر (Registered Mobile Number)*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="03001234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  پاس ورڈ (Password)*
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="پاس ورڈ درج کریں"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <LogIn className="w-5 h-5" />
                <span>لاگ ان کریں (Sign In)</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Test Buttons */}
          <div className="mt-6 pt-5 border-t border-stone-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>فوری ٹیسٹ اکاؤنٹس (Demo Test Logins)</span>
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('03001234567', 'password123')}
                className="w-full text-left p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-emerald-50 hover:border-emerald-300 transition text-xs flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-bold text-stone-800">1. فری ممبر (Free User)</div>
                  <div className="text-stone-500 font-mono">03001234567 • pass: password123</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-700 text-[10px] font-bold">
                  FREE
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('03019876543', 'password123')}
                className="w-full text-left p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/60 transition text-xs flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-bold text-emerald-900">2. وی آئی پی ممبر (VIP User)</div>
                  <div className="text-emerald-700 font-mono">03019876543 • pass: password123</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-stone-900 text-[10px] font-black">
                  VIP
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('03215554433', 'password123')}
                className="w-full text-left p-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 transition text-xs flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-bold text-red-900 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                    <span>3. بلاک اکاؤنٹ ٹیسٹ (Blocked User)</span>
                  </div>
                  <div className="text-red-700 font-mono">03215554433 • pass: password123</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">
                  BLOCKED
                </span>
              </button>
            </div>
          </div>

          {/* Links to Signup */}
          <div className="mt-6 text-center pt-4 border-t border-stone-100">
            <p className="text-sm text-stone-600">
              اکاؤنٹ نہیں ہے؟{' '}
              <button
                onClick={() => navigateTo('/signup')}
                className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>نیا اکاؤنٹ بنائیں (Signup)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </p>

            <div className="mt-4 text-xs text-stone-400">
              کوئی مسئلہ ہے؟ رابطہ کریں: <strong className="text-stone-700">{OWNER_INFO.name}</strong>{' '}
              <a
                href={OWNER_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 font-bold hover:underline font-mono"
              >
                {OWNER_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
