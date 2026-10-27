import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMandi } from '../context/MandiContext';
import { OWNER_INFO, VIP_PLANS } from '../data/mandiData';
import {
  User,
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  Calendar,
  MapPin,
  Sparkles,
  LogOut,
  Crown,
  FileSpreadsheet,
  CheckCircle,
  MessageCircle,
  Share2,
  Printer,
  Calculator,
  TrendingUp,
  AlertCircle,
  Clock,
  Download,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    logout,
    upgradeToVip,
    simulateMultiDeviceLogin,
    navigateTo
  } = useAuth();

  const { rates, last5AmUpdate } = useMandi();

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'season' | 'annual'>('season');
  const [showSlipModal, setShowSlipModal] = useState(false);

  // Mandi Slip State
  const [slipCommodity, setSlipCommodity] = useState('گندم (Wheat)');
  const [slipWeightMaund, setSlipWeightMaund] = useState<number>(50);
  const [slipRatePerMaund, setSlipRatePerMaund] = useState<number>(3950);
  const [slipCommissionPercent, setSlipCommissionPercent] = useState<number>(1.5);
  const [slipLabourPerBag, setSlipLabourPerBag] = useState<number>(40);
  const [slipFarmerName, setSlipFarmerName] = useState(currentUser?.name || 'کاشتکار بھائی');
  const [slipTraderName, setSlipTraderName] = useState('ملک ٹریڈرز غلہ منڈی');

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
        <h2 className="text-2xl font-bold text-stone-900 mb-2">ڈیش بورڈ کیلئے لاگ ان درکار ہے</h2>
        <p className="text-stone-600 mb-6 max-w-md">
          برائے مہربانی اپنے رجسٹرڈ موبائل نمبر اور پاس ورڈ کے ساتھ لاگ ان کریں
        </p>
        <button
          onClick={() => navigateTo('/login')}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-lg shadow-emerald-700/20 cursor-pointer"
        >
          لاگ ان پیج پر جائیں (Go to Login)
        </button>
      </div>
    );
  }

  // Filter dynamic rates for user's city
  const cityRates = rates.filter(
    (r) => r.city.toLowerCase() === currentUser.city.toLowerCase()
  );

  // Mandi Slip Calculations
  const grossTotal = slipWeightMaund * slipRatePerMaund;
  const commissionDeduction = Math.round((grossTotal * slipCommissionPercent) / 100);
  const bagsCount = Math.ceil(slipWeightMaund);
  const labourDeduction = bagsCount * slipLabourPerBag;
  const netPayable = grossTotal - (commissionDeduction + labourDeduction);

  const handleInstantVipUpgrade = () => {
    upgradeToVip(currentUser.id, selectedPlan === 'annual' ? 12 : selectedPlan === 'season' ? 6 : 1);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleTriggerDeviceBlock = () => {
    simulateMultiDeviceLogin(currentUser.phone);
  };

  const selectedPlanDetails = VIP_PLANS.find((p) => p.id === selectedPlan) || VIP_PLANS[1];

  const whatsappUpgradeMsg = encodeURIComponent(
    `السلام علیکم نعیم بھائی! میں روزانہ منڈی ریٹ کا VIP ممبرشپ پلان (${selectedPlanDetails.nameEn} - PKR ${selectedPlanDetails.price}) ایکٹیویٹ کروانا چاہتا ہوں۔ میں نے جاز کیش (UmarIltaf: 03105423365) پر فیس بھیج دی ہے۔ میرا فون نمبر: ${currentUser.phone}، نام: ${currentUser.name}`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* User Welcome & Status Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                روزانہ منڈی ریٹ یوزر ڈیش بورڈ
              </span>

              {/* 5 AM Notice */}
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs border border-amber-400/30">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>صبح 5 بجے لسٹ اپڈیٹ شدہ</span>
              </span>

              {currentUser.status === 'VIP' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 font-black text-xs shadow-md">
                  <Crown className="w-4 h-4 fill-stone-950" />
                  VIP MEMBER ACTIVE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-700 text-stone-200 font-bold text-xs">
                  FREE MEMBER (مفت اکاؤنٹ)
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              خوش آمدید، {currentUser.name}
            </h1>
            <p className="text-stone-300 text-sm max-w-xl">
              آپ کا رجسٹرڈ شہر: <strong className="text-white underline">{currentUser.city}</strong> | موبائل نمبر: <span className="font-mono text-emerald-400 font-bold">{currentUser.phone}</span>
            </p>
          </div>

          {/* Action buttons on header */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSlipModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-900/30 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>منڈی پرچی بنائیں (Mandi Slip)</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-medium text-sm transition border border-stone-700 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>لاگ آؤٹ (Logout)</span>
            </button>
          </div>
        </div>

        {/* Security & Device info strip */}
        <div className="mt-6 pt-5 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-stone-400 font-medium">اکاؤنٹ اسٹیٹس</div>
            <div className="font-bold text-white mt-0.5">{currentUser.status}</div>
          </div>
          <div>
            <div className="text-stone-400 font-medium">سنگل ڈیوائس آئی ڈی</div>
            <div className="font-mono text-emerald-400 font-bold mt-0.5 truncate">
              {currentUser.deviceId || 'DEV-PK-ACTIVE'}
            </div>
          </div>
          <div>
            <div className="text-stone-400 font-medium">پلان مدت (Expiry)</div>
            <div className="font-medium text-stone-200 mt-0.5">
              {currentUser.planExpiry ? `${currentUser.planExpiry} تک فعال` : 'کوئی پلان نہیں (Free)'}
            </div>
          </div>
          <div>
            <div className="text-stone-400 font-medium">صبح 5 بجے لسٹ اسٹیٹس</div>
            <div className="font-medium text-amber-300 mt-0.5">تازہ اپڈیٹ شدہ</div>
          </div>
        </div>
      </div>

      {/* Free Status Warning & Upgrade Prompt (if Free) */}
      {currentUser.status === 'FREE' && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Crown className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-amber-900">
                  آپ کا اکاؤنٹ FREE ہے — VIP پلان میں اپگریڈ کریں
                </h3>
                <p className="text-xs sm:text-sm text-amber-800 mt-0.5">
                  صبح 5 بجے کے لائیو منڈی ریٹ، تیزی مندی کی پیشگی رپورٹس، اور نعیم صاحب (03105423365) سے براہ راست ٹیلی فونک رہنمائی حاصل کریں۔
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('vip-upgrade-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-extrabold text-sm shadow-md transition whitespace-nowrap cursor-pointer"
            >
              VIP پلان چنیں (Upgrade to VIP)
            </button>
          </div>
        </div>
      )}

      {/* Grid: City Mandi Rates + Security & Multi-Device Testing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: City Mandi Rates */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-stone-900">
                  آپ کے شہر ({currentUser.city}) کے صبح 5 بجے کے منڈی ریٹ
                </h2>
              </div>
              <button
                onClick={() => navigateTo('/')}
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                تمام شہر دیکھیں →
              </button>
            </div>

            {cityRates.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 text-xs uppercase bg-stone-50">
                      <th className="py-3 px-3">جنس / اناج</th>
                      <th className="py-3 px-3">منڈی کا نام</th>
                      <th className="py-3 px-3">کم سے کم</th>
                      <th className="py-3 px-3">زیادہ سے زیادہ</th>
                      <th className="py-3 px-3">اوسط بھاؤ</th>
                      <th className="py-3 px-3">رجحان</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {cityRates.map((rate) => (
                      <tr key={rate.id} className="hover:bg-stone-50 transition">
                        <td className="py-3 px-3 font-bold text-stone-900">
                          <div>{rate.nameUrdu}</div>
                          <div className="text-xs text-stone-500 font-normal">{rate.nameEn}</div>
                        </td>
                        <td className="py-3 px-3 text-stone-600 text-xs">{rate.mandiName}</td>
                        <td className="py-3 px-3 font-mono font-semibold text-stone-800">
                          Rs. {rate.minPrice.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 font-mono font-semibold text-stone-800">
                          Rs. {rate.maxPrice.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 font-mono font-extrabold text-emerald-700">
                          Rs. {rate.modalPrice.toLocaleString()}
                          <span className="text-[10px] text-stone-500 font-normal block">{rate.unit}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                              rate.trend === 'up'
                                ? 'bg-emerald-100 text-emerald-800'
                                : rate.trend === 'down'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-stone-100 text-stone-800'
                            }`}
                          >
                            {rate.trend === 'up' ? '▲ تیزی' : rate.trend === 'down' ? '▼ مندی' : 'مستحکم'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-stone-500 text-sm">
                <p>فی الحال {currentUser.city} کے مخصوص براہ راست ریٹ لوڈ ہو رہے ہیں، یا آپ نیچے آل پاکستان ریٹس دیکھ سکتے ہیں۔</p>
                <button
                  onClick={() => navigateTo('/')}
                  className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                >
                  مرکزی ریٹ لسٹ دیکھیں
                </button>
              </div>
            )}
          </div>

          {/* Quick Mandi Calculator Shortcut */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-6 shadow-sm border border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4" />
                <span>کاشتکار و بیوپاری کیلکولیٹر</span>
              </div>
              <h3 className="text-lg font-bold">من کے حساب سے مال کی کل رقم اور آڑھت کمیشن نکالیں</h3>
              <p className="text-xs text-stone-300 mt-1">
                40 کلو من وزن، کھاد/باردانہ، تلائی اور کمیشن کا ایک کلک میں حساب
              </p>
            </div>
            <button
              onClick={() => setShowSlipModal(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm whitespace-nowrap transition cursor-pointer"
            >
              پرچی کیلکولیٹر کھولیں
            </button>
          </div>
        </div>

        {/* Right 1 Col: Single Device Policy & Testing */}
        <div className="space-y-6">
          {/* Security & Multi-device simulation card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-red-600">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-bold text-stone-900 text-base">سنگل ڈیوائس پالیسی چیک</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              روزانہ منڈی ریٹ کے قوائد کے مطابق ہر ممبر کا اکاؤنٹ صرف 1 ڈیوائس پر چلایا جا سکتا ہے۔
              اگر آپ 2 جگہ بیک وقت لاگ ان کریں گے تو اکاؤنٹ خودکار بلاک ہو جائے گا۔
            </p>

            <button
              onClick={handleTriggerDeviceBlock}
              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-red-700/20 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Simulate 2nd Device Login (ٹیسٹ بلاک)</span>
            </button>
          </div>

          {/* JazzCash UmarIltaf Official Box */}
          <div className="bg-stone-900 text-white border border-stone-800 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                JazzCash ادائیگی
              </span>
              <span className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-black">
                JazzCash
              </span>
            </div>

            <div>
              <div className="text-xs text-stone-400">جاز کیش اکاؤنٹ نمبر:</div>
              <div className="text-2xl font-black font-mono text-white tracking-wide">
                {OWNER_INFO.jazzCashNumber}
              </div>
              <div className="text-xs text-amber-300 font-bold mt-1">
                ٹائٹل (Name): <strong className="text-white bg-emerald-900 px-2 py-0.5 rounded font-mono">{OWNER_INFO.jazzCashTitle}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800 text-xs text-stone-400">
              اونر رابطہ: <strong className="text-white">{OWNER_INFO.name}</strong> ({OWNER_INFO.phoneDisplay})
            </div>
          </div>
        </div>
      </div>

      {/* VIP Upgrade Section */}
      <div id="vip-upgrade-section" className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs mb-3 border border-amber-300">
            <Crown className="w-4 h-4 text-amber-600" />
            <span>VIP ممبرشپ پلانز • صبح 5 بجے نوٹیفکیشن</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            اپنی منڈی کا کاروبار محفوظ اور منافع بخش بنائیں
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            روزانہ صبح 5 بجے واٹس ایپ الرٹس، 17 شہروں کی منڈیوں کے تفصیلی بھاؤ، اور نعیم صاحب سے ون آن ون رہنمائی
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {VIP_PLANS.map((plan) => {
            const isChosen = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id as any)}
                className={`relative rounded-2xl p-6 transition-all cursor-pointer border-2 ${
                  isChosen
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-lg scale-[1.02]'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-sm">
                    {plan.tag}
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-extrabold text-stone-900 text-lg">{plan.nameUrdu}</h3>
                  <p className="text-xs text-stone-500">{plan.nameEn}</p>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-black text-stone-900">PKR {plan.price}</span>
                  <span className="text-stone-500 text-xs font-semibold ml-1">/ {plan.duration}</span>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-700 mb-6">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${
                    isChosen
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {isChosen ? 'منتخب شدہ (Selected)' : 'یہ پلان منتخب کریں'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Payment Details with JazzCash UmarIltaf */}
        <div className="bg-stone-900 text-white rounded-2xl border border-stone-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <span>آسان ادائیگی بذریعہ JazzCash یا EasyPaisa</span>
            </h4>
            <div className="text-xs text-stone-300 space-y-1">
              <p>
                JazzCash نمبر: <strong className="font-mono text-amber-300 text-sm">03105423365</strong> (عنوان / Name: <strong className="text-white underline font-mono">UmarIltaf</strong>)
              </p>
              <p>
                EasyPaisa نمبر: <strong className="font-mono text-emerald-400 text-sm">03105423365</strong> (عنوان / Title: <strong>UmarIltaf</strong>)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/923105423365?text=${whatsappUpgradeMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition shadow-md shadow-emerald-700/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>پیمنٹ سلپ واٹس ایپ بھیجیں</span>
            </a>

            {/* Instant Demo Upgrade Button */}
            <button
              onClick={handleInstantVipUpgrade}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm transition shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>فوری VIP ایکٹیویٹ ٹیسٹ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mandi Rate Slip / Parchi Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8">
            <button
              onClick={() => setShowSlipModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 cursor-pointer text-lg font-bold"
            >
              ✕
            </button>

            <div className="text-center pb-4 border-b border-stone-200">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                روزانہ منڈی ریٹ پاکستان • مستند ڈیجیٹل پرچی
              </span>
              <h3 className="text-2xl font-black text-stone-900 mt-2">
                کاشتکار و بیوپاری منڈی پرچی (Mandi Sale Slip)
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                تاریخ: {new Date().toLocaleDateString('en-GB')} | اونر: نعیم 03105423365 | جاز کیش: UmarIltaf
              </p>
            </div>

            {/* Form to tweak slip values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">کاشتکار کا نام</label>
                <input
                  type="text"
                  value={slipFarmerName}
                  onChange={(e) => setSlipFarmerName(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">آڑھت / خریدار کا نام</label>
                <input
                  type="text"
                  value={slipTraderName}
                  onChange={(e) => setSlipTraderName(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">جنس / اناج</label>
                <select
                  value={slipCommodity}
                  onChange={(e) => setSlipCommodity(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-stone-300"
                >
                  <option value="گندم (Wheat)">گندم (Wheat)</option>
                  <option value="مکئی (Corn)">مکئی (Corn)</option>
                  <option value="کپاس / پھٹی (Cotton)">کپاس / پھٹی (Cotton)</option>
                  <option value="چاول کائنات (Rice Kainat)">چاول کائنات (Rice Kainat)</option>
                  <option value="دھان سپر کرنل (Paddy)">دھان سپر کرنل (Paddy)</option>
                  <option value="سرسوں (Mustard)">سرسوں (Mustard)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">کل وزن (من - 40 کلو)</label>
                <input
                  type="number"
                  min="1"
                  value={slipWeightMaund}
                  onChange={(e) => setSlipWeightMaund(Number(e.target.value) || 0)}
                  className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">ریٹ فی من (PKR / Maund)</label>
                <input
                  type="number"
                  min="100"
                  value={slipRatePerMaund}
                  onChange={(e) => setSlipRatePerMaund(Number(e.target.value) || 0)}
                  className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">آڑھت کمیشن (فیصد %)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={slipCommissionPercent}
                  onChange={(e) => setSlipCommissionPercent(Number(e.target.value) || 0)}
                  className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono"
                />
              </div>
            </div>

            {/* Rendered Slip Card */}
            <div className="border-2 border-dashed border-emerald-600 bg-emerald-50/20 rounded-2xl p-6 relative">
              <div className="flex justify-between items-start text-xs border-b border-stone-200 pb-3">
                <div>
                  <div className="text-stone-500">کاشتکار / فروخت کنندہ:</div>
                  <div className="font-bold text-stone-900 text-sm">{slipFarmerName}</div>
                </div>
                <div className="text-right">
                  <div className="text-stone-500">منڈی / آڑھتی:</div>
                  <div className="font-bold text-stone-900 text-sm">{slipTraderName}</div>
                </div>
              </div>

              <div className="py-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">جنس:</span>
                  <span className="font-bold text-stone-900">{slipCommodity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">مقدار:</span>
                  <span className="font-mono font-bold text-stone-900">{slipWeightMaund} من ({(slipWeightMaund * 40).toLocaleString()} کلو)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">ریٹ فی من:</span>
                  <span className="font-mono font-bold text-stone-900">PKR {slipRatePerMaund.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 font-bold">
                  <span>کل مالیت (Gross Total):</span>
                  <span className="font-mono text-base text-stone-900">PKR {grossTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-xs text-red-600 pt-1">
                  <span>منہا کمیشن ({slipCommissionPercent}%):</span>
                  <span className="font-mono">- PKR {commissionDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-red-600">
                  <span>منہا پلیداری / تلائی ({slipLabourPerBag} فی بوری):</span>
                  <span className="font-mono">- PKR {labourDeduction.toLocaleString()}</span>
                </div>

                <div className="flex justify-between pt-3 border-t-2 border-emerald-600 text-base font-black text-emerald-900 bg-emerald-100/60 p-3 rounded-xl">
                  <span>خالص واجب الادا رقم (Net Cash):</span>
                  <span className="font-mono text-lg text-emerald-800">PKR {netPayable.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-[10px] text-stone-400 text-center pt-2">
                تصدیق شدہ برائے روزانہ منڈی ریٹ پاکستان • رابطہ نعیم: 03105423365 • جاز کیش: UmarIltaf
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>پرنٹ کریں (Print)</span>
              </button>
              <button
                onClick={() => {
                  alert('پرچی کاپی کر لی گئی ہے! آپ واٹس ایپ پر شیئر کر سکتے ہیں۔');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>واٹس ایپ شیئر (Share Slip)</span>
              </button>
              <button
                onClick={() => setShowSlipModal(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-800 text-white font-medium text-xs cursor-pointer"
              >
                بند کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
