import React, { useState } from 'react';
import { useMandi } from '../context/MandiContext';
import { MandiRate, CommodityCategory } from '../types/mandi';
import { PAKISTAN_CITIES, OWNER_INFO } from '../data/mandiData';
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Calendar,
  Share2,
  LineChart,
  X,
  Crown,
  Sparkles,
  Clock,
  ArrowUpDown
} from 'lucide-react';

interface MandiTableProps {
  onOpenVipModal: () => void;
}

export const MandiTable: React.FC<MandiTableProps> = ({ onOpenVipModal }) => {
  const { rates, last5AmUpdate, next5AmCountdown } = useMandi();
  const [selectedCategory, setSelectedCategory] = useState<CommodityCategory>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [trendModalRate, setTrendModalRate] = useState<MandiRate | null>(null);

  const categories: { id: CommodityCategory; labelUrdu: string; labelEn: string }[] = [
    { id: 'all', labelUrdu: 'تمام منڈیاں (All)', labelEn: 'All Commodities' },
    { id: 'grains', labelUrdu: 'غلہ و اناج (Grains)', labelEn: 'Wheat & Rice' },
    { id: 'oilseeds', labelUrdu: 'کپاس و تیل دار (Cotton & Oilseeds)', labelEn: 'Cotton & Mustard' },
    { id: 'vegetables', labelUrdu: 'سبزیاں (Vegetables)', labelEn: 'Fresh Veg' },
    { id: 'fruits', labelUrdu: 'پھل (Fruits)', labelEn: 'Fresh Fruits' },
    { id: 'pulses', labelUrdu: 'دالیں (Pulses)', labelEn: 'Pulses & Gram' },
    { id: 'poultry', labelUrdu: 'پولٹری (Poultry)', labelEn: 'Chicken & Eggs' },
  ];

  const filteredRates = rates.filter((r) => {
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesCity = selectedCity === 'all' || r.city.toLowerCase() === selectedCity.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      r.nameUrdu.toLowerCase().includes(query) ||
      r.nameEn.toLowerCase().includes(query) ||
      r.city.toLowerCase().includes(query) ||
      r.mandiName.toLowerCase().includes(query);

    return matchesCategory && matchesCity && matchesSearch;
  });

  const handleShareRate = (rate: MandiRate) => {
    const text = `*روزانہ منڈی ریٹ پاکستان - صبح 5:00 بجے کی لسٹ*\n📍 منڈی: ${rate.mandiName} (${rate.city})\n🌾 جنس: ${rate.nameUrdu}\n💰 اوسط بھاؤ: PKR ${rate.modalPrice.toLocaleString()} / ${rate.unit}\n📊 رجحان: ${rate.trend === 'up' ? 'تیزی ▲' : rate.trend === 'down' ? 'مندی ▼' : 'مستحکم'}\n⏰ اپڈیٹ: صبح 05:00 بجے\n📞 اونر: نعیم 03105423365\nجاز کیش: UmarIltaf (03105423365)`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Table Header Section */}
      <div className="p-6 sm:p-8 bg-gradient-to-b from-stone-50 to-white border-b border-stone-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>براہ راست منڈی تصدیق شدہ بھاؤ</span>
              </span>

              {/* 5 AM Notice */}
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black border border-amber-300">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>لسٹ اپڈیٹ: صبح 05:00 بجے (Daily 5:00 AM Update)</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              پاکستان کی تمام منڈیوں کے روزانہ ریٹ
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              پنجاب، سندھ، خیبر پختونخوا اور بلوچستان کی منڈیوں کی صبح 5 بجے جاری کردہ مستند لسٹ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenVipModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <Crown className="w-4 h-4 text-amber-200" />
              <span>VIP الرٹس حاصل کریں</span>
            </button>
          </div>
        </div>

        {/* Filters & Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="جنس یا منڈی کا نام تلاش کریں (مثلاً: گندم، کپاس، لاہور، مکئی)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* City Dropdown Filter */}
          <div className="md:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <MapPin className="w-4 h-4" />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
            >
              <option value="all">تمام شہر (All Cities of Pakistan)</option>
              {PAKISTAN_CITIES.map((c) => (
                <option key={c.id} value={c.nameEn}>
                  {c.nameEn} ({c.nameUrdu}) - {c.province}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-4 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.labelUrdu}
            </button>
          ))}
        </div>
      </div>

      {/* Mandi Rate Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">جنس / اناج (Commodity)</th>
              <th className="py-3.5 px-4">شہر و منڈی (Mandi)</th>
              <th className="py-3.5 px-4">کم از کم بھاؤ</th>
              <th className="py-3.5 px-4">زیادہ سے زیادہ</th>
              <th className="py-3.5 px-4">اوسط بھاؤ (Modal Price)</th>
              <th className="py-3.5 px-4">24 گھنٹے تبدیلی</th>
              <th className="py-3.5 px-4">آمد و وقت</th>
              <th className="py-3.5 px-4 text-center">ایکشن</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 text-sm">
            {filteredRates.length > 0 ? (
              filteredRates.map((rate) => (
                <tr key={rate.id} className="hover:bg-emerald-50/30 transition group">
                  {/* Commodity Name */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-extrabold text-stone-900 group-hover:text-emerald-800 transition">
                      {rate.nameUrdu}
                    </div>
                    <div className="text-xs text-stone-500 font-medium">{rate.nameEn}</div>
                  </td>

                  {/* Mandi / City */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-stone-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{rate.city}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 truncate max-w-[150px]">
                      {rate.mandiName}
                    </div>
                  </td>

                  {/* Min Price */}
                  <td className="py-4 px-4 font-mono font-semibold text-stone-700">
                    Rs. {rate.minPrice.toLocaleString()}
                  </td>

                  {/* Max Price */}
                  <td className="py-4 px-4 font-mono font-semibold text-stone-700">
                    Rs. {rate.maxPrice.toLocaleString()}
                  </td>

                  {/* Modal Price */}
                  <td className="py-4 px-4">
                    <div className="font-mono font-black text-emerald-700 text-base">
                      Rs. {rate.modalPrice.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-stone-500">{rate.unit}</div>
                  </td>

                  {/* Trend / Change */}
                  <td className="py-4 px-4">
                    {rate.trend === 'up' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>+{rate.change} تیزی</span>
                      </span>
                    ) : rate.trend === 'down' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-100 text-red-800 font-bold text-xs">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>{rate.change} مندی</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-medium text-xs">
                        <Minus className="w-3.5 h-3.5" />
                        <span>مستحکم</span>
                      </span>
                    )}
                  </td>

                  {/* Arrival & 5 AM Update */}
                  <td className="py-4 px-4">
                    <div className="text-xs font-semibold text-stone-800">
                      آمد: {rate.arrivalVolume}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{rate.updatedAt}</span>
                    </div>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setTrendModalRate(rate)}
                        title="7 دن کی ہسٹری اور ٹرینڈ چارٹ"
                        className="p-2 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-600 hover:text-emerald-800 transition cursor-pointer"
                      >
                        <LineChart className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleShareRate(rate)}
                        title="واٹس ایپ پر ریٹ شیئر کریں"
                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-12 text-center text-stone-500">
                  <p className="text-base font-semibold">کوئی ریٹ نہیں ملا</p>
                  <p className="text-xs mt-1">براہ کرم سرچ فلٹر تبدیل کر کے دوبارہ کوشش کریں۔</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span>دکھائے جا رہے ہیں: <strong>{filteredRates.length}</strong> منڈی بھاؤ</span>
          <span>•</span>
          <span className="text-amber-800 font-bold">تازہ لسٹ: صبح 5:00 بجے جاری</span>
        </div>

        <div className="flex items-center gap-2">
          <span>جاز کیش (UmarIltaf) / رابطہ:</span>
          <a
            href={OWNER_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-700 font-mono underline"
          >
            {OWNER_INFO.phoneDisplay}
          </a>
        </div>
      </div>

      {/* 7-Day Trend Chart Modal */}
      {trendModalRate && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setTrendModalRate(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-emerald-700 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>7 روزہ قیمت کا تاریخی تجزیہ (صبح 5 بجے تصدیق شدہ)</span>
            </div>

            <h3 className="text-xl font-extrabold text-stone-900">
              {trendModalRate.nameUrdu} ({trendModalRate.city})
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              منڈی: {trendModalRate.mandiName} | یونٹ: {trendModalRate.unit}
            </p>

            {/* Historical Bar representation */}
            <div className="space-y-3 mb-6 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              {trendModalRate.historical7Days.map((h, i) => {
                const maxVal = Math.max(...trendModalRate.historical7Days.map((x) => x.price));
                const widthPercent = Math.max(20, Math.round((h.price / maxVal) * 100));

                return (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <span className="w-14 text-stone-500 font-medium shrink-0">{h.date}</span>
                    <div className="flex-1 bg-stone-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all"
                        style={{ width: `${widthPercent}%` }}
                      ></div>
                    </div>
                    <span className="w-20 text-right font-mono font-bold text-stone-800 shrink-0">
                      Rs. {h.price.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-4">
              <strong>مارکیٹ تجزیہ و پیشگوئی:</strong> موجودہ طلب کے پیش نظر آئندہ دنوں میں معمولی تیزی متوقع ہے۔ مزید مشورے کیلئے VIP سروس جوائن کریں۔
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setTrendModalRate(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
              >
                بند کریں
              </button>

              <button
                onClick={() => {
                  setTrendModalRate(null);
                  onOpenVipModal();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
              >
                VIP پلان میں شامل ہوں
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
