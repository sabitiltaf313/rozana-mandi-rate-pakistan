import React, { useState } from 'react';
import { Calculator, ArrowRight, Share2, Check, RefreshCw } from 'lucide-react';
import { OWNER_INFO } from '../data/mandiData';

export const MandiCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<'maund' | 'kg'>('maund');
  const [weight, setWeight] = useState<number>(40);
  const [ratePerMaund, setRatePerMaund] = useState<number>(3950);
  const [commissionPercent, setCommissionPercent] = useState<number>(1.5);
  const [labourPerMaund, setLabourPerMaund] = useState<number>(30);
  const [cropTitle, setCropTitle] = useState<string>('گندم (Wheat)');

  // Preset quick fill
  const presets = [
    { title: 'گندم (Wheat)', rate: 3950 },
    { title: 'کپاس / پھٹی (Cotton)', rate: 7850 },
    { title: 'مکئی ہائبرڈ (Corn)', rate: 2350 },
    { title: 'سرسوں (Mustard)', rate: 8250 },
    { title: 'چاول کائنات (Rice)', rate: 11800 },
  ];

  // Weight normalized to maunds (40 kg = 1 maund)
  const totalMaunds = calculationType === 'maund' ? weight : weight / 40;
  const totalKg = calculationType === 'kg' ? weight : weight * 40;

  const grossTotal = Math.round(totalMaunds * ratePerMaund);
  const commission = Math.round((grossTotal * commissionPercent) / 100);
  const labour = Math.round(totalMaunds * labourPerMaund);
  const netPayment = grossTotal - (commission + labour);

  const handleShareCalculation = () => {
    const text = `*روزانہ منڈی ریٹ پاکستان - تخمینہ حساب*\n🌾 جنس: ${cropTitle}\n⚖️ کل وزن: ${totalMaunds.toFixed(1)} من (${totalKg.toLocaleString()} کلو)\n💰 ریٹ فی من: PKR ${ratePerMaund.toLocaleString()}\n💵 کل رقم: PKR ${grossTotal.toLocaleString()}\n📉 منہا کمیشن (${commissionPercent}%): PKR ${commission.toLocaleString()}\n📉 منہا تلائی و مزدوری: PKR ${labour.toLocaleString()}\n✅ خالص رقم برائے کاشتکار: *PKR ${netPayment.toLocaleString()}*\n\nتصدیق بذریعہ نعیم: 03105423365`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div id="mandi-calculator-section" className="bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-700 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2 border border-emerald-500/30">
              <Calculator className="w-3.5 h-3.5" />
              <span>کاشتکار و بیوپاری منڈی کیلکولیٹر</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              من (40 کلو) اور کلو کے حساب سے خالص رقم نکالیں
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              آڑھت کمیشن اور مزدوری منہا کر کے کاشتکار کو ملنے والی اصل رقم فوری معلوم کریں
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCropTitle(p.title);
                  setRatePerMaund(p.rate);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  ratePerMaund === p.rate
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                }`}
              >
                {p.title.split(' ')[0]} (Rs. {p.rate})
              </button>
            ))}
          </div>
        </div>

        {/* Input & Output Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Unit Toggle */}
            <div className="flex items-center gap-2 bg-stone-800/80 p-1 rounded-xl border border-stone-700 max-w-sm">
              <button
                type="button"
                onClick={() => setCalculationType('maund')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  calculationType === 'maund'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                وزن بذریعہ من (Maunds - 40kg)
              </button>
              <button
                type="button"
                onClick={() => setCalculationType('kg')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  calculationType === 'kg'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                وزن بذریعہ کلوگرام (Kilograms)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Weight */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  کل وزن ({calculationType === 'maund' ? 'من (40 کلو فی من)' : 'کلوگرام'})
                </label>
                <input
                  type="number"
                  min="1"
                  value={weight || ''}
                  onChange={(e) => setWeight(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white font-mono text-base focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-stone-400 mt-1 block">
                  برابر ہے: <strong className="text-white">{totalMaunds.toFixed(2)} من</strong> (یا {totalKg.toLocaleString()} کلو)
                </span>
              </div>

              {/* Rate per Maund */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  ریٹ فی من (PKR / Maund - 40kg)
                </label>
                <input
                  type="number"
                  min="100"
                  value={ratePerMaund || ''}
                  onChange={(e) => setRatePerMaund(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white font-mono text-base focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-stone-400 mt-1 block">
                  ریٹ فی کلو: <strong className="text-emerald-400 font-mono">PKR {(ratePerMaund / 40).toFixed(2)}</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Commission % */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  آڑھت کمیشن شرح (فیصد %)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={commissionPercent}
                  onChange={(e) => setCommissionPercent(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Labour / Mazdoori */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  پلیداری و تلائی (فی من روپے)
                </label>
                <input
                  type="number"
                  min="0"
                  value={labourPerMaund}
                  onChange={(e) => setLabourPerMaund(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Results Column (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-800/90 rounded-2xl p-6 border border-stone-700 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-4 flex items-center justify-between">
                <span>حساب کتاب کا خلاصہ</span>
                <span className="text-stone-400 font-mono text-[11px]">{cropTitle}</span>
              </div>

              <div className="space-y-3 text-sm text-stone-300">
                <div className="flex justify-between items-center">
                  <span>کل خام مالیت (Gross Total):</span>
                  <span className="font-mono font-bold text-white text-base">
                    PKR {grossTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-red-400 text-xs">
                  <span>منہا آڑھت کمیشن ({commissionPercent}%):</span>
                  <span className="font-mono font-semibold">- PKR {commission.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-red-400 text-xs">
                  <span>منہا پلیداری / تلائی خرچہ:</span>
                  <span className="font-mono font-semibold">- PKR {labour.toLocaleString()}</span>
                </div>

                <div className="pt-4 border-t border-stone-700 mt-2">
                  <div className="text-xs text-stone-400 mb-1">کاشتکار کی خالص آمدنی (Net Payment):</div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                    PKR {netPayment.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-700/80 mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleShareCalculation}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>حساب واٹس ایپ شیئر کریں</span>
              </button>

              <a
                href={OWNER_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-200 text-center font-bold text-xs transition border border-stone-600"
              >
                نعیم: {OWNER_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
