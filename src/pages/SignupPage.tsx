import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { OWNER_INFO, PAKISTAN_CITIES } from '../data/mandiData';
import { UserCheck, ShieldCheck, Phone, MapPin, Lock, User, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { signup, navigateTo } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mandatory cities specified by the user prompt
  const mandatoryCities = [
    'Lahore',
    'Faisalabad',
    'Multan',
    'Gujranwala',
    'Sargodha',
    'Rawalpindi',
    'Islamabad',
    'Karachi',
    'Hyderabad',
    'Sukkur',
    'Peshawar',
    'Mardan',
    'Swat',
    'Quetta',
    'Sahiwal',
    'Okara',
    'Bahawalpur'
  ];

  const validatePhone = (num: string): boolean => {
    const cleaned = num.trim().replace(/[-\s]/g, '');
    // Must start with 03 and have exactly 11 digits
    return /^03\d{9}$/.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('برائے مہربانی اپنا مکمل نام درج کریں (Full Name is required)');
      return;
    }

    const cleanPhone = phone.trim().replace(/[-\s]/g, '');
    if (!validatePhone(cleanPhone)) {
      setError('موبائل نمبر درست نہیں ہے۔ پاکستان کا 03xx نمبر درج کریں (مثلاً: 03001234567)');
      return;
    }

    if (!city) {
      setError('برائے مہربانی اپنا شہر منتخب کریں (Please select your city)');
      return;
    }

    if (password.length < 6) {
      setError('پاس ورڈ کم از کم 6 ہندسوں یا حروف کا ہونا چاہیے (Password must be at least 6 characters)');
      return;
    }

    if (password !== confirmPassword) {
      setError('پاس ورڈ اور کنفرم پاس ورڈ میچ نہیں ہو رہے (Passwords do not match)');
      return;
    }

    const success = signup({
      name: fullName,
      phone: cleanPhone,
      city,
      password,
    });

    if (!success) {
      setError('یہ موبائل نمبر پہلے سے رجسٹرڈ ہے۔ براہ کرم لاگ ان کریں۔');
    }
  };

  const handleQuickDemoFill = () => {
    const randomDigits = Math.floor(1000000 + Math.random() * 9000000);
    setFullName('چوہدری اکرم کسان');
    setPhone(`0300${randomDigits}`);
    setCity('Faisalabad');
    setPassword('pakistan123');
    setConfirmPassword('pakistan123');
    setError(null);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-stone-200/60 border border-stone-200 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/60 border border-emerald-400/30 text-emerald-100 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>نیا اکاؤنٹ بنائیں (Create New Account)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            روزانہ منڈی ریٹ پاکستان
          </h2>
          <p className="text-sm text-emerald-100 mt-1">
            اپنی غلہ و سبزی منڈی کے روزانہ تازہ ترین ریٹ جاننے کیلئے مفت سائن اپ کریں
          </p>

          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 rounded-lg text-xs font-medium border border-amber-400/40 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>آٹو فل ٹیسٹ ڈیٹا (Auto-fill Demo Data)</span>
          </button>
        </div>

        {/* Signup Form */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-start gap-2 animate-shake">
              <span className="font-bold">نوٹ:</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                مکمل نام (Full Name)*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="مثلاً: محمد اکرم / Muhammad Akram"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  موبائل نمبر (Pakistan 03xx)*
                </label>
                <span className="text-[11px] text-emerald-700 font-semibold font-mono">
                  مثال: 03001234567
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  maxLength={11}
                  placeholder="03xxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* City Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                شہر منتخب کریں (City)*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition bg-white"
                >
                  {mandatoryCities.map((c) => {
                    const info = PAKISTAN_CITIES.find(
                      (p) => p.nameEn.toLowerCase() === c.toLowerCase()
                    );
                    const urdu = info ? ` (${info.nameUrdu})` : '';
                    return (
                      <option key={c} value={c}>
                        {c}{urdu}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                پاس ورڈ (Password - Min 6 characters)*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="کم از کم 6 ہندسے یا حروف"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                پاس ورڈ کی تصدیق (Confirm Password)*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="دوبارہ پاس ورڈ درج کریں"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <UserCheck className="w-5 h-5" />
                <span>اکاؤنٹ بنائیں (Register Account)</span>
              </button>
            </div>
          </form>

          {/* Policy notes */}
          <div className="mt-5 p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-500 space-y-1">
            <p>• نیا اکاؤنٹ <strong>FREE اسٹیٹس</strong> پر بنے گا اور رجسٹریشن کے بعد آپ سیدھے لاگ ان کر سکیں گے۔</p>
            <p>• سنگل ڈیوائس سیکیورٹی: اکاؤنٹ صرف ایک موبائل پر لاگ ان رکھیں۔ بیک وقت 2 جگہ استعمال کرنے پر اکاؤنٹ خودکار بلاک ہو جائے گا۔</p>
          </div>

          {/* Navigation to Login */}
          <div className="mt-6 text-center pt-4 border-t border-stone-100">
            <p className="text-sm text-stone-600">
              پہلے سے اکاؤنٹ موجود ہے؟{' '}
              <button
                onClick={() => navigateTo('/login')}
                className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>لاگ ان کریں (Login)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </p>

            <div className="mt-4 text-xs text-stone-400">
              اونر و ایڈمن رابطہ: <strong className="text-stone-700">{OWNER_INFO.name}</strong> -{' '}
              <a
                href={OWNER_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 font-bold hover:underline"
              >
                WhatsApp: {OWNER_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
