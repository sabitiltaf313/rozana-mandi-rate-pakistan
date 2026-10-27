import React, { useState } from 'react';
import { VIP_PLANS, OWNER_INFO } from '../data/mandiData';
import { useAuth } from '../context/AuthContext';
import { Crown, CheckCircle, MessageCircle, PhoneCall, Sparkles, X, Smartphone, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipModal: React.FC<VipModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, upgradeToVip, navigateTo } = useAuth();
  const [selectedPlanId, setSelectedPlanId] = useState<string>('season');

  if (!isOpen) return null;

  const currentPlan = VIP_PLANS.find((p) => p.id === selectedPlanId) || VIP_PLANS[1];

  const handleDemoActivate = () => {
    if (currentUser) {
      upgradeToVip(currentUser.id, selectedPlanId === 'annual' ? 12 : selectedPlanId === 'season' ? 6 : 1);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
      onClose();
    } else {
      onClose();
      navigateTo('/login');
    }
  };

  const whatsappMsg = encodeURIComponent(
    `السلام علیکم نعیم بھائی! میں روزانہ منڈی ریٹ کا VIP ممبرشپ پلان (${currentPlan.nameUrdu} - PKR ${currentPlan.price}) خریدنا چاہتا ہوں۔ میں نے جاز کیش (UmarIltaf - 03105423365) پر رقم بھیج دی ہے، برائے مہربانی اکاؤنٹ ایکٹیویٹ کر دیں۔`
  );

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs mb-2 border border-amber-300">
            <Crown className="w-4 h-4 text-amber-600" />
            <span>روزانہ منڈی ریٹ VIP سروس • صبح 5 بجے الرٹس</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            VIP ممبرشپ حاصل کریں
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            صبح 5:00 بجے تازہ لسٹ، واٹس ایپ الرٹس اور براہ راست رہنمائی
          </p>
        </div>

        {/* Plan Selector Radio Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {VIP_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-800">{plan.nameUrdu.split('(')[0]}</div>
                <div className="text-lg font-black text-stone-900 mt-1">PKR {plan.price}</div>
                <div className="text-[11px] text-stone-500">{plan.duration}</div>
              </div>
            );
          })}
        </div>

        {/* Plan Details Box */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
            {currentPlan.nameUrdu} میں شامل سہولیات:
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
            {currentPlan.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Account Details: JazzCash Name UmarIltaf */}
        <div className="bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-950 text-white rounded-2xl p-5 mb-6 border border-emerald-800/80 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-amber-300 font-extrabold flex items-center gap-1.5">
              <CreditCard className="w-4 h-4" />
              <span>JazzCash و EasyPaisa اکاؤنٹ تفصیلات</span>
            </span>
            <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-black">
              JazzCash
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700">
              <div className="text-xs text-stone-400 font-medium">JazzCash نمبر:</div>
              <div className="text-2xl font-black font-mono tracking-wide text-white mt-0.5">
                {OWNER_INFO.jazzCashNumber}
              </div>
              <div className="text-xs text-amber-300 font-bold mt-1">
                اکاؤنٹ ٹائٹل (Name): <strong className="text-white bg-emerald-900 px-2 py-0.5 rounded font-mono">{OWNER_INFO.jazzCashTitle}</strong>
              </div>
            </div>

            <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700">
              <div className="text-xs text-stone-400 font-medium">EasyPaisa نمبر:</div>
              <div className="text-2xl font-black font-mono tracking-wide text-white mt-0.5">
                {OWNER_INFO.easyPaisaNumber}
              </div>
              <div className="text-xs text-emerald-300 font-bold mt-1">
                اکاؤنٹ ٹائٹل (Name): <strong className="text-white bg-emerald-900 px-2 py-0.5 rounded font-mono">{OWNER_INFO.accountTitle}</strong>
              </div>
            </div>
          </div>

          <div className="text-xs text-stone-300 mt-3 pt-3 border-t border-stone-800 flex items-center justify-between flex-wrap gap-2">
            <span>پیمنٹ بھیجنے کے بعد واٹس ایپ پر اسکرین شاٹ بھیجیں</span>
            <span className="text-amber-300 font-bold">اونر: {OWNER_INFO.name} ({OWNER_INFO.phoneDisplay})</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`https://wa.me/923105423365?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>پیمنٹ رسید واٹس ایپ بھیجیں</span>
            </a>

            <a
              href={`tel:${OWNER_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs sm:text-sm transition border border-stone-700"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>کال کریں: {OWNER_INFO.phoneDisplay}</span>
            </a>
          </div>

          {/* Test Activate */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
            <span className="text-[11px] text-stone-500">ٹیسٹ موڈ برائے جائزہ:</span>
            <button
              onClick={handleDemoActivate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>فوری VIP ایکٹیویٹ کریں (Demo Test)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
