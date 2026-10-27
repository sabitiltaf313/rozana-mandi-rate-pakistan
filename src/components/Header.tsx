import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMandi } from '../context/MandiContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { OWNER_INFO } from '../data/mandiData';
import {
  Wheat,
  PhoneCall,
  MessageCircle,
  LogIn,
  UserPlus,
  User as UserIcon,
  Crown,
  Menu,
  X,
  Settings,
  Download,
  Smartphone,
  Clock,
  ShieldCheck,
  Share,
  PlusSquare,
  CheckCircle
} from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenVipModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onOpenVipModal }) => {
  const { currentUser, logout, navigateTo, activeRoute } = useAuth();
  const { last5AmUpdate } = useMandi();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  const handleInstall = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // In case browser ambient badge or instructions
      alert('ایپ انسٹال کرنے کیلئے اپنے موبائل براؤزر کے اوپر تین نقطوں (⋮) پر کلک کر کے "Install App" یا "Add to Home screen" پر ٹیپ کریں۔');
    }
  };

  const todayDate = new Date().toLocaleDateString('ur-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      {/* Topmost Official Owner Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-6 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Official Owner notice */}
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span className="px-2 py-0.5 rounded bg-emerald-800 text-[10px] font-bold tracking-wide uppercase text-emerald-200">
              واحد آفیشل رابطہ
            </span>
            <span>
              اونر: <strong>{OWNER_INFO.name}</strong> • رابطہ و واٹس ایپ:{' '}
              <a
                href={OWNER_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-300 hover:underline font-mono"
              >
                {OWNER_INFO.phoneDisplay}
              </a>
            </span>
            <span className="hidden lg:inline text-stone-400">|</span>
            <span className="text-amber-200 text-[11px] font-semibold hidden md:inline">
              جاز کیش: <strong className="text-white font-mono">{OWNER_INFO.jazzCashNumber}</strong> ({OWNER_INFO.jazzCashTitle})
            </span>
          </div>

          {/* Quick Actions & 5 AM Badge */}
          <div className="flex items-center gap-2.5">
            {/* 5 AM Update Badge */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-amber-300 text-[11px] font-bold border border-emerald-700">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>صبح 5 بجے تازہ ریٹ جاری</span>
            </div>

            {/* Direct Install Button in Header */}
            {!isInstalled && (
              <button
                onClick={handleInstall}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-black transition text-[11px] cursor-pointer shadow-sm hover:scale-105"
                title="موبائل پر براہ راست ایپ انسٹال کریں"
              >
                <Download className="w-3 h-3 text-stone-950" />
                <span>انسٹال ایپ (Install)</span>
              </button>
            )}

            <a
              href={OWNER_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition text-[11px]"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>

            {/* Admin Panel Button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold transition text-[11px] border border-stone-700 cursor-pointer"
              title="ایڈمن کنٹرول پینل"
            >
              <Settings className="w-3 h-3" />
              <span>ایڈمن پینل</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div
            onClick={() => navigateTo('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-green-600 flex items-center justify-center text-white shadow-md shadow-emerald-800/20 group-hover:scale-105 transition">
              <Wheat className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-none">
                  روزانہ منڈی ریٹ
                </span>
                <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  پاکستان
                </span>
              </div>
              <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1.5">
                <span>صبح 5 بجے اپڈیٹ شدہ</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">اونر نعیم: 03105423365</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-700">
            <button
              onClick={() => navigateTo('/')}
              className={`hover:text-emerald-700 transition cursor-pointer ${
                activeRoute === '/' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600 pb-1' : ''
              }`}
            >
              منڈی ریٹ لسٹ (Live Rates)
            </button>

            <button
              onClick={() => {
                navigateTo('/');
                setTimeout(() => {
                  document.getElementById('mandi-calculator-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-emerald-700 transition cursor-pointer"
            >
              منڈی کیلکولیٹر (Calculator)
            </button>

            <button
              onClick={() => {
                navigateTo('/');
                setTimeout(() => {
                  document.getElementById('city-comparison-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-emerald-700 transition cursor-pointer"
            >
              شہر وار موازنہ (City Compare)
            </button>

            <button
              onClick={onOpenVipModal}
              className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300 transition cursor-pointer font-bold text-xs"
            >
              <Crown className="w-4 h-4 text-amber-600" />
              <span>VIP ممبرشپ</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-xl border border-stone-200 transition cursor-pointer text-xs font-bold"
            >
              <Settings className="w-3.5 h-3.5 text-stone-600" />
              <span>ایڈمن پینل</span>
            </button>
          </nav>

          {/* User Auth Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('/dashboard')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeRoute === '/dashboard'
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>{currentUser.name} ({currentUser.city})</span>
                  {currentUser.status === 'VIP' && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-400 text-stone-900 text-[9px] font-black">
                      VIP
                    </span>
                  )}
                </button>

                <button
                  onClick={logout}
                  title="لاگ آؤٹ"
                  className="p-2 rounded-xl text-stone-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('/login')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeRoute === '/login'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>لاگ ان (Login)</span>
                </button>

                <button
                  onClick={() => navigateTo('/signup')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>نیا اکاؤنٹ (Signup)</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            {!isInstalled && (
              <button
                onClick={handleInstall}
                className="px-2.5 py-1.5 rounded-lg bg-amber-400 text-stone-950 font-black text-[11px] flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>انسٹال</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3">
          {currentUser ? (
            <div className="p-3 bg-stone-50 rounded-xl mb-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-stone-900 text-sm">{currentUser.name}</div>
                <div className="text-xs text-stone-500">
                  {currentUser.city} • <span className="font-mono text-emerald-700">{currentUser.phone}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-red-600 font-bold"
              >
                لاگ آؤٹ
              </button>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                navigateTo('/');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-lg bg-stone-100 text-stone-800 font-bold text-xs"
            >
              منڈی ریٹس (5 AM)
            </button>

            <button
              onClick={() => {
                navigateTo('/dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200"
            >
              ڈیش بورڈ
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-stone-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>ایڈمن پینل</span>
            </button>

            <button
              onClick={() => {
                onOpenVipModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>VIP پلان</span>
            </button>
          </div>

          {!currentUser && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
              <button
                onClick={() => {
                  navigateTo('/login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-stone-800 text-white font-bold text-xs"
              >
                لاگ ان (Login)
              </button>
              <button
                onClick={() => {
                  navigateTo('/signup');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
              >
                سائن اپ (Signup)
              </button>
            </div>
          )}

          <div className="pt-2 text-center text-xs text-stone-500 border-t border-stone-100">
            جاز کیش: <strong>{OWNER_INFO.jazzCashNumber} ({OWNER_INFO.jazzCashTitle})</strong> | اونر: {OWNER_INFO.name}
          </div>
        </div>
      )}

      {/* iOS Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-stone-900 shadow-2xl relative">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-extrabold text-stone-900">
              iPhone پر انسٹال کرنے کا طریقہ
            </h3>
            <div className="mt-3 text-xs text-stone-600 space-y-2">
              <p>1. سفاری کے نیچے موجود <strong>Share</strong> بٹن دبائیں۔</p>
              <p>2. <strong>Add to Home Screen</strong> پر ٹیپ کریں۔</p>
              <p>3. <strong>Add</strong> پر کلک کریں۔ ایپ اسکرین پر آ جائے گی!</p>
            </div>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full mt-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl"
            >
              ٹھیک ہے
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
