import React, { useState } from 'react';
import { OWNER_INFO } from '../data/mandiData';
import { useAuth } from '../context/AuthContext';
import { useMandi } from '../context/MandiContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  Wheat,
  ShieldCheck,
  TrendingUp,
  MessageCircle,
  PhoneCall,
  UserPlus,
  Crown,
  MapPin,
  CheckCircle2,
  Clock,
  Download,
  Smartphone,
  CreditCard
} from 'lucide-react';

interface HomeHeroProps {
  onOpenVipModal: () => void;
  onOpenAdmin: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onOpenVipModal, onOpenAdmin }) => {
  const { currentUser, navigateTo } = useAuth();
  const { last5AmUpdate, next5AmCountdown } = useMandi();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      alert('ایپ انسٹال کرنے کیلئے اپنے موبائل براؤزر کے مینیو (تین نقطوں ⋮) پر کلک کر کے "Install App" یا "Add to Home screen" منتخب کریں۔');
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-stone-950 to-stone-900 text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>روزانہ تازہ ترین غلہ و سبزی منڈی بھاؤ پاکستان</span>
              </div>

              {/* 5 AM Notice Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>لسٹ اپڈیٹ: صبح 05:00 بجے (Daily 5:00 AM Update)</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              روزانہ منڈی ریٹ <span className="text-emerald-400">پاکستان</span>
            </h1>

            {/* Subheading */}
            <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              پاکستان کی تمام غلہ اور سبزی منڈیوں (لاہور، ملتان، فیصل آباد، ساہیوال، کراچی وغیرہ) کے روزانہ صبح 5 بجے کے مصدقہ بھاؤ، تیزی مندی کا تجزیہ اور پکی منڈی پرچی۔
            </p>

            {/* Owner Single Number & JazzCash UmarIltaf Highlight Banner */}
            <div className="bg-stone-900/90 border border-emerald-500/40 rounded-2xl p-4 max-w-xl text-left shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                    واحد آفیشل اونر رابطہ (Official Number)
                  </div>
                  <div className="text-xl font-black text-white tracking-wide">
                    {OWNER_INFO.name}
                  </div>
                  <div className="font-mono text-emerald-400 font-bold text-sm">
                    {OWNER_INFO.phoneDisplay}
                  </div>
                  <div className="text-xs text-amber-200 mt-1">
                    JazzCash Title: <strong className="text-white underline font-mono">{OWNER_INFO.jazzCashTitle}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={OWNER_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${OWNER_INFO.phone}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs transition border border-stone-700"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    <span>کال</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              {/* Direct Install Button */}
              {!isInstalled && (
                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-stone-950" />
                  <span>براہ راست ایپ انسٹال کریں (Direct Install)</span>
                </button>
              )}

              {!currentUser ? (
                <>
                  <button
                    onClick={() => navigateTo('/signup')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-700/30 transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>نیا اکاؤنٹ بنائیں (/signup)</span>
                  </button>

                  <button
                    onClick={() => navigateTo('/login')}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm border border-stone-700 transition cursor-pointer"
                  >
                    <span>لاگ ان کریں (/login)</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigateTo('/dashboard')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-700/30 transition cursor-pointer"
                >
                  <span>ڈیش بورڈ پر جائیں ({currentUser.name})</span>
                </button>
              )}

              <button
                onClick={onOpenVipModal}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-black text-sm shadow-lg transition cursor-pointer"
              >
                <Crown className="w-4 h-4 fill-stone-950" />
                <span>VIP ممبرشپ</span>
              </button>

              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-bold text-xs border border-stone-700 transition cursor-pointer"
              >
                <span>ایڈمن پینل</span>
              </button>
            </div>
          </div>

          {/* Quick Stats / Highlights Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  منڈی نیٹ ورک برائے سال {new Date().getFullYear()}
                </span>
                <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  صبح 5 بجے اپڈیٹ
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">17+</div>
                  <div className="text-xs text-stone-400 font-medium mt-1">بڑے صنعتی و زرعی شہر</div>
                </div>
                <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
                  <div className="text-xs text-stone-400 font-medium mt-1">مستند آڑھت بھاؤ</div>
                </div>
                <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
                  <div className="text-xs text-amber-400 font-bold">JazzCash Title</div>
                  <div className="text-lg font-black text-white font-mono mt-0.5 truncate">
                    {OWNER_INFO.jazzCashTitle}
                  </div>
                </div>
                <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">5:00 AM</div>
                  <div className="text-xs text-stone-400 font-medium mt-1">روزانہ لسٹ جاری</div>
                </div>
              </div>

              {/* Security check note */}
              <div className="p-3.5 rounded-xl bg-stone-800/40 border border-stone-700 text-xs text-stone-300 space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>محفوظ سنگل ڈیوائس لاگ ان پروٹیکشن</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  ہر کسان اور بیوپاری کا اکاؤنٹ مکمل محفوظ ہے۔ صرف 1 ڈیوائس پر چلے گا تاکہ آپ کا ڈیٹا اور VIP رسائی محفوظ رہے۔
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
