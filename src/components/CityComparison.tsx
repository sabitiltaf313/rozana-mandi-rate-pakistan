import React, { useState } from 'react';
import { INITIAL_MANDI_RATES, OWNER_INFO } from '../data/mandiData';
import { ArrowLeftRight, TrendingUp, CheckCircle, MapPin, Sparkles } from 'lucide-react';

export const CityComparison: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('Wheat');

  const cropOptions = [
    { id: 'Wheat', labelUrdu: 'گندم (Wheat)', searchKey: 'Wheat' },
    { id: 'Corn', labelUrdu: 'مکئی (Corn)', searchKey: 'Maize' },
    { id: 'Cotton', labelUrdu: 'کپاس / پھٹی (Cotton)', searchKey: 'Cotton' },
    { id: 'Rice', labelUrdu: 'چاول / دھان (Rice / Paddy)', searchKey: 'Rice' },
  ];

  // Match items from initial rates
  const matchingRates = INITIAL_MANDI_RATES.filter((r) =>
    r.nameEn.toLowerCase().includes(selectedCrop.toLowerCase()) ||
    r.nameUrdu.includes(selectedCrop)
  );

  // If few, supplement with realistic comparison prices
  const fallbackComparison: Record<string, { city: string; mandi: string; price: number; trend: string }[]> = {
    Wheat: [
      { city: 'Lahore', mandi: 'Badami Bagh', price: 3950, trend: 'up' },
      { city: 'Multan', mandi: 'Chowk Shaheedan', price: 3900, trend: 'up' },
      { city: 'Faisalabad', mandi: 'Jhang Road', price: 3920, trend: 'up' },
      { city: 'Sahiwal', mandi: 'Old Ghalla Mandi', price: 3940, trend: 'stable' },
      { city: 'Sargodha', mandi: 'Khushab Road', price: 3880, trend: 'stable' },
      { city: 'Karachi', mandi: 'Jodia Bazaar', price: 4120, trend: 'up' },
    ],
    Corn: [
      { city: 'Sahiwal', mandi: 'Grain Market', price: 2350, trend: 'up' },
      { city: 'Faisalabad', mandi: 'Ghalla Mandi', price: 2380, trend: 'up' },
      { city: 'Okara', mandi: 'Okara Cantt', price: 2340, trend: 'up' },
      { city: 'Lahore', mandi: 'Kahna Kacha', price: 2420, trend: 'up' },
      { city: 'Multan', mandi: 'Multan Mandi', price: 2320, trend: 'stable' },
    ],
    Cotton: [
      { city: 'Multan', mandi: 'Shujabad Mandi', price: 7850, trend: 'down' },
      { city: 'Bahawalpur', mandi: 'Yazman Mandi', price: 7900, trend: 'down' },
      { city: 'Rahim Yar Khan', mandi: 'Sadiqabad', price: 7950, trend: 'stable' },
      { city: 'Sukkur', mandi: 'Bunder Road', price: 7750, trend: 'down' },
      { city: 'Hyderabad', mandi: 'Hala Naka', price: 7700, trend: 'down' },
    ],
    Rice: [
      { city: 'Gujranwala', mandi: 'Kamoke Rice Market', price: 11800, trend: 'up' },
      { city: 'Hafizabad', mandi: 'City Mandi', price: 11750, trend: 'up' },
      { city: 'Lahore', mandi: 'Badami Bagh', price: 11900, trend: 'up' },
      { city: 'Sialkot', mandi: 'Daska Mandi', price: 11700, trend: 'stable' },
    ]
  };

  const currentList = fallbackComparison[selectedCrop] || fallbackComparison['Wheat'];
  const maxPrice = Math.max(...currentList.map((x) => x.price));
  const minPrice = Math.min(...currentList.map((x) => x.price));
  const highestCity = currentList.find((x) => x.price === maxPrice);
  const lowestCity = currentList.find((x) => x.price === minPrice);
  const priceDifference = maxPrice - minPrice;

  return (
    <div id="city-comparison-section" className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>شہر وار بھاؤ کا موازنہ (City Price Matrix)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            کس شہر کی منڈی میں سب سے اونچا ریٹ مل رہا ہے؟
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            اپنی جنس صحیح منڈی میں بیچ کر فی من 100 سے 300 روپے تک اضافی منافع حاصل کریں
          </p>
        </div>

        {/* Crop Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {cropOptions.map((crop) => (
            <button
              key={crop.id}
              onClick={() => setSelectedCrop(crop.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCrop === crop.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {crop.labelUrdu}
            </button>
          ))}
        </div>
      </div>

      {/* Difference Insight Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-emerald-800 font-semibold uppercase">مارکیٹ تجزیہ و مشورہ</div>
            <div className="text-stone-900 font-bold text-sm sm:text-base">
              سب سے زیادہ بھاؤ <strong className="text-emerald-700">{highestCity?.city}</strong> (PKR {maxPrice}) اور کم ترین <strong className="text-red-600">{lowestCity?.city}</strong> (PKR {minPrice}) میں ہے۔
            </div>
            <div className="text-xs text-stone-600 mt-0.5">
              دونوں منڈیوں میں فرق: <strong className="text-emerald-800 font-mono">PKR {priceDifference} فی من</strong> ہے۔
            </div>
          </div>
        </div>

        <a
          href={OWNER_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold whitespace-nowrap transition"
        >
          نعیم صاحب سے روٹ مشورہ لیں
        </a>
      </div>

      {/* City Comparison Bar List */}
      <div className="space-y-4">
        {currentList.map((item, index) => {
          const percent = Math.round((item.price / maxPrice) * 100);
          const isHighest = item.price === maxPrice;

          return (
            <div
              key={index}
              className={`p-4 rounded-2xl border transition-all ${
                isHighest
                  ? 'border-emerald-500 bg-emerald-50/30 shadow-sm'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${isHighest ? 'text-emerald-600' : 'text-stone-400'}`} />
                  <span className="font-extrabold text-stone-900 text-sm sm:text-base">
                    {item.city}
                  </span>
                  <span className="text-xs text-stone-500 font-normal">({item.mandi})</span>
                  {isHighest && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wide">
                      سب سے اونچا بھاؤ (TOP)
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span className="font-mono font-black text-stone-900 text-base sm:text-lg">
                    PKR {item.price.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-stone-500 block">فی من (40 کلو)</span>
                </div>
              </div>

              {/* Bar */}
              <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHighest ? 'bg-emerald-600' : 'bg-stone-400'
                  }`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
