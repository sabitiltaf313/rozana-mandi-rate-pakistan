import React from 'react';
import { OWNER_INFO } from '../data/mandiData';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, PhoneCall, MessageCircle, RefreshCw, XCircle } from 'lucide-react';

interface BlockedScreenProps {
  phone?: string | null;
  onClose?: () => void;
}

export const BlockedScreen: React.FC<BlockedScreenProps> = ({ phone, onClose }) => {
  const { unblockUser, closeBlockedScreen } = useAuth();
  const targetPhone = phone || 'User';

  const handleUnblock = () => {
    if (phone) {
      unblockUser(phone);
    } else {
      closeBlockedScreen();
    }
    if (onClose) onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `السلام علیکم نعیم بھائی! میرا روزانہ منڈی ریٹ اکاؤنٹ بلاک ہو گیا ہے کیونکہ 2 جگہ استعمال ہوا۔ برائے مہربانی ان بلاک کر دیں۔ میرا موبائل نمبر: ${targetPhone}`
  );

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-stone-900 border-2 border-red-500/80 rounded-2xl p-6 sm:p-8 text-center text-white shadow-2xl shadow-red-950/50">
        {/* Urgent Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center mb-6 animate-pulse">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>

        {/* Warning Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold tracking-wide uppercase mb-3 border border-red-500/30">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          سیکیورٹی خلاف ورزی (Security Violation)
        </div>

        {/* Exact User Prompt Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Account Blocked!
        </h1>
        <p className="text-lg sm:text-xl font-bold text-red-400 mb-4 font-urdu">
          اکاؤنٹ بلاک ہے کیونکہ آپ نے 2 جگہ استعمال کیا۔ رابطہ کریں
        </p>

        {/* Roman Urdu & Details */}
        <div className="bg-stone-800/80 rounded-xl p-4 mb-6 border border-stone-700 text-stone-300 text-sm sm:text-base leading-relaxed space-y-2">
          <p className="font-semibold text-stone-100">
            &ldquo;Account Block hai kyunki aapne 2 jagah use kiya. Rabta karein&rdquo;
          </p>
          <p className="text-xs text-stone-400">
            حفاظتی قوانین کے مطابق ایک اکاؤنٹ بیک وقت صرف ایک موبائل یا ڈیوائس پر چلایا جا سکتا ہے۔
            دوبارہ بحالی (Unblock) کیلئے اونر نعیم صاحب سے رابطہ فرمائیں۔
          </p>
          {phone && (
            <div className="text-xs text-amber-400 pt-1 border-t border-stone-700">
              متاثرہ نمبر (Registered Phone): <span className="font-mono font-bold text-white">{phone}</span>
            </div>
          )}
        </div>

        {/* Owner Details Card */}
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 mb-6 text-emerald-200">
          <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">
            واحد آفیشل رابطہ (Official Single Contact)
          </div>
          <div className="text-xl sm:text-2xl font-black text-white tracking-wide">
            {OWNER_INFO.name} - {OWNER_INFO.phoneDisplay}
          </div>
          <p className="text-xs text-emerald-300 mt-1">
            تمام منڈی اپڈیٹس، وی آئی پی پلان اور اکاؤنٹ ان بلاک کیلئے صرف یہی نمبر ہے۔
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <a
            href={`https://wa.me/923105423365?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-900/40 hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>واٹس ایپ پر رابطہ کریں</span>
          </a>

          <a
            href={`tel:${OWNER_INFO.phone}`}
            className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm sm:text-base transition-all border border-stone-600 hover:scale-[1.02]"
          >
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <span>کال کریں: {OWNER_INFO.phoneDisplay}</span>
          </a>
        </div>

        {/* Testing / Quick Unblock Button */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>ٹیسٹنگ موڈ (Testing Demonstration)</span>
          <button
            onClick={handleUnblock}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors border border-stone-700 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>اکاؤنٹ ان بلاک کریں (Test Reset)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
