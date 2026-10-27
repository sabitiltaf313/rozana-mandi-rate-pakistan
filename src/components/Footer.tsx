import React from 'react';
import { OWNER_INFO, PAKISTAN_CITIES } from '../data/mandiData';
import { Wheat, PhoneCall, MessageCircle, ShieldCheck, Heart, Clock, Download, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenVipModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenVipModal }) => {
  const { navigateTo } = useAuth();
  const { isInstallable, install } = usePWAInstall();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Owner */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
                <Wheat className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="text-xl font-black text-white">روزانہ منڈی ریٹ</span>
                <span className="text-xs text-emerald-400 block font-bold">پاکستان (Rozana Mandi Rate)</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              پاکستان کی تمام غلہ، سبزی، اور فروٹ منڈیوں کے روزانہ صبح 5 بجے جاری کردہ مستند بھاؤ۔ کاشتکاروں، بیوپاریوں، اور آڑھتیوں کا بااعتماد ترین ڈیجیٹل پورٹل۔
            </p>

            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
              <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                واحد آفیشل اونر رابطہ
              </div>
              <div className="text-base font-extrabold text-white">{OWNER_INFO.name}</div>
              <div className="font-mono text-emerald-400 font-bold text-sm">
                موبائل و واٹس ایپ: {OWNER_INFO.phoneDisplay}
              </div>
              <div className="text-xs text-stone-400 pt-1 border-t border-stone-800">
                JazzCash Title: <strong className="text-white font-mono">{OWNER_INFO.jazzCashTitle}</strong>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              اہم صفحات و لنکس
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => navigateTo('/')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  تازہ ترین منڈی ریٹس (صبح 5 بجے لسٹ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/signup')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  نیا اکاؤنٹ بنائیں (/signup)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/login')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  اکاؤنٹ لاگ ان (/login)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/dashboard')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  یوزر ڈیش بورڈ (/dashboard)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVipModal}
                  className="hover:text-amber-400 text-amber-300 font-bold transition cursor-pointer"
                >
                  VIP ممبرشپ پلانز (VIP Plans)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-white text-emerald-400 font-bold transition cursor-pointer flex items-center gap-1"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>ایڈمن پینل (You Control)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Covered Cities & 5 AM info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2 flex items-center justify-between">
              <span>نمایاں غلہ و سبزی منڈیاں</span>
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-stone-400 mb-4">
              {PAKISTAN_CITIES.slice(0, 10).map((city) => (
                <span
                  key={city.id}
                  className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800"
                >
                  {city.nameUrdu} ({city.nameEn})
                </span>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900 text-xs text-emerald-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>روزانہ لسٹ اپڈیٹ: <strong>صبح 05:00 بجے</strong></span>
            </div>
          </div>

          {/* Col 4: Contact & JazzCash UmarIltaf */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              واٹس ایپ و JazzCash
            </h4>
            <div className="space-y-2 mb-3">
              <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs">
                <div className="text-amber-400 font-bold text-[11px]">JazzCash تفصیلات:</div>
                <div className="font-mono text-white font-bold">{OWNER_INFO.jazzCashNumber}</div>
                <div className="text-stone-300 text-[11px]">
                  ٹائٹل / Name: <strong className="text-white font-mono">{OWNER_INFO.jazzCashTitle}</strong>
                </div>
              </div>

              <a
                href={OWNER_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {OWNER_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`tel:${OWNER_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-bold text-xs transition border border-stone-800"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>کال: {OWNER_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} روزانہ منڈی ریٹ پاکستان • تمام جملہ حقوق محفوظ ہیں۔ اونر: {OWNER_INFO.name} ({OWNER_INFO.phoneDisplay}) • JazzCash: {OWNER_INFO.jazzCashTitle}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">صبح 5:00 بجے کی لسٹ</span>
            <span>•</span>
            <span>پاکستان کے کسانوں اور بیوپاریوں کی خدمت میں پیش</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
