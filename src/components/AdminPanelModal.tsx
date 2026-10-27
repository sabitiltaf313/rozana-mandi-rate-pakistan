import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMandi } from '../context/MandiContext';
import { OWNER_INFO, PAKISTAN_CITIES } from '../data/mandiData';
import { MandiRate, CommodityCategory, UserStatus } from '../types/mandi';
import {
  Settings,
  Users,
  Clock,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  ShieldAlert,
  CheckCircle,
  Smartphone,
  RefreshCw,
  X,
  Lock,
  Unlock,
  CreditCard,
  Send,
  Download,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const { users, unblockUser, upgradeToVip, simulateMultiDeviceLogin } = useAuth();
  const {
    rates,
    last5AmUpdate,
    next5AmCountdown,
    updateRate,
    addRate,
    deleteRate,
    trigger5AmRefresh,
    resetDefaultRates
  } = useMandi();

  const [isAuthenticated, setIsAuthenticated] = useState(true); // default unlocked for direct control as user requested
  const [activeTab, setActiveTab] = useState<'5am' | 'rates' | 'users' | 'payments'>('5am');
  const [userFilter, setUserFilter] = useState<'all' | 'FREE' | 'VIP' | 'BLOCKED'>('all');

  // Rate Editing State
  const [editingRate, setEditingRate] = useState<MandiRate | null>(null);
  const [showAddRateModal, setShowAddRateModal] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // New Rate Form State
  const [newCropNameUrdu, setNewCropNameUrdu] = useState('');
  const [newCropNameEn, setNewCropNameEn] = useState('');
  const [newCropCity, setNewCropCity] = useState('Lahore');
  const [newCropMandi, setNewCropMandi] = useState('Badami Bagh');
  const [newCropCategory, setNewCropCategory] = useState<CommodityCategory>('grains');
  const [newCropModalPrice, setNewCropModalPrice] = useState<number>(4000);
  const [newCropMinPrice, setNewCropMinPrice] = useState<number>(3900);
  const [newCropMaxPrice, setNewCropMaxPrice] = useState<number>(4100);
  const [newCropUnit, setNewCropUnit] = useState('40 kg (من)');
  const [newCropArrival, setNewCropArrival] = useState('2,500 بوری');

  if (!isOpen) return null;

  const handle5AmRefreshClick = () => {
    trigger5AmRefresh();
    setNotificationMsg('صبح 5 بجے کی نئی ریٹ لسٹ کامیابی سے جاری کر دی گئی!');
    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch {}
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  const handleSaveEditRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRate) return;
    updateRate(editingRate.id, {
      modalPrice: Number(editingRate.modalPrice),
      minPrice: Number(editingRate.minPrice),
      maxPrice: Number(editingRate.maxPrice),
      change: Number(editingRate.change),
      trend: editingRate.trend,
      arrivalVolume: editingRate.arrivalVolume,
    });
    setEditingRate(null);
    setNotificationMsg('ریٹ کامیابی سے اپڈیٹ ہو گیا!');
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  const handleCreateNewRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropNameUrdu.trim()) return;

    addRate({
      nameUrdu: newCropNameUrdu.trim(),
      nameEn: newCropNameEn.trim() || newCropNameUrdu.trim(),
      category: newCropCategory,
      city: newCropCity,
      mandiName: newCropMandi,
      minPrice: Number(newCropMinPrice),
      maxPrice: Number(newCropMaxPrice),
      modalPrice: Number(newCropModalPrice),
      unit: newCropUnit,
      change: 0,
      trend: 'stable',
      arrivalVolume: newCropArrival,
      quality: 'درجہ اول صاف',
      updatedAt: 'آج صبح 05:00 بجے',
      historical7Days: [
        { date: '25 Oct', price: newCropModalPrice - 50 },
        { date: '26 Oct', price: newCropModalPrice - 20 },
        { date: '27 Oct', price: newCropModalPrice },
      ],
    });

    setShowAddRateModal(false);
    setNewCropNameUrdu('');
    setNewCropNameEn('');
    setNotificationMsg('نیا منڈی ریٹ لسٹ میں شامل کر دیا گیا!');
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  const filteredUsers = users.filter((u) => (userFilter === 'all' ? true : u.status === userFilter));

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-stone-900 to-emerald-950 text-amber-400 flex items-center justify-center shadow-md">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                  ایڈمن کنٹرول روم (Admin Control Panel)
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                  Active
                </span>
              </div>
              <p className="text-xs text-stone-500">
                مکمل کنٹرول: صبح 5 بجے کی ریٹ لسٹ اپڈیٹ، تمام یوزرز، بلاک/ان بلاک اور جاز کیش سیٹنگز
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-full cursor-pointer hover:bg-stone-100 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Notification Toast */}
        {notificationMsg && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-between animate-fade-in shrink-0 shadow-md">
            <span>{notificationMsg}</span>
            <button onClick={() => setNotificationMsg(null)}>✕</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 pb-2 overflow-x-auto shrink-0 border-b border-stone-100 text-xs font-bold">
          <button
            onClick={() => setActiveTab('5am')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === '5am'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>صبح 5 بجے لسٹ اپڈیٹ (5 AM Scheduler)</span>
          </button>

          <button
            onClick={() => setActiveTab('rates')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'rates'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>منڈی ریٹ لسٹ منیجر ({rates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>تمام ممبرز و سیکیورٹی ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'payments'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>جاز کیش (UmarIltaf) و پیمنٹس</span>
          </button>
        </div>

        {/* Tab 1: 5 AM Update Controller */}
        {activeTab === '5am' && (
          <div className="py-6 space-y-6 overflow-y-auto flex-1">
            <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <Clock className="w-3.5 h-3.5" />
                  <span>روزانہ لسٹ اپڈیٹ کا وقت: صبح 5:00 بجے (Daily 5:00 AM)</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black">
                  صبح 5 بجے کی نئی ریٹ لسٹ جاری کریں
                </h2>
                <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
                  پنجاب اور سندھ کی غلہ و سبزی منڈیوں میں صبح کی نئی بولیاں اور آمد درج کر کے پوری ویب سائٹ پر ایک سیکنڈ میں تمام بھاؤ اپڈیٹ کریں۔
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-stone-800/80 p-3.5 rounded-2xl border border-stone-700">
                    <div className="text-[11px] text-stone-400">آخری لسٹ اپڈیٹ:</div>
                    <div className="font-bold text-amber-300 font-mono text-sm mt-0.5">
                      {last5AmUpdate}
                    </div>
                  </div>

                  <div className="bg-stone-800/80 p-3.5 rounded-2xl border border-stone-700">
                    <div className="text-[11px] text-stone-400">اگلی 5 AM لسٹ میں وقت باقی:</div>
                    <div className="font-bold text-emerald-400 font-mono text-sm mt-0.5">
                      {next5AmCountdown}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={handle5AmRefreshClick}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-stone-950 font-black text-sm flex items-center gap-2 shadow-lg transition transform hover:scale-[1.02] cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 text-stone-950" />
                    <span>صبح 5 بجے کے ریٹ ابھی اپڈیٹ کریں (Trigger 5:00 AM Refresh)</span>
                  </button>

                  <button
                    onClick={resetDefaultRates}
                    className="px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-700 transition cursor-pointer"
                  >
                    ریسٹ ڈیفالٹ ریٹس
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated WhatsApp Broadcast Message preview */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-emerald-700" />
                  <span>5 AM واٹس ایپ براڈکاسٹ میسج فارمیٹ (WhatsApp VIP Broadcast):</span>
                </span>
                <span className="text-[11px] text-emerald-700 font-bold">بذریعہ نعیم: 03105423365</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-stone-300 text-xs font-mono text-stone-800 whitespace-pre-line leading-relaxed">
{`*روزانہ منڈی ریٹ پاکستان - صبح 5:00 بجے کی تازہ ترین لسٹ*
تاریخ: ${new Date().toLocaleDateString('en-GB')} | وقت: صبح 05:00 بجے

🌾 گندم لاہور: Rs. 3,950 / 40kg (+50 تیزی)
🌽 مکئی ساہیوال: Rs. 2,350 / 40kg (+80 تیزی)
⚪ کپاس ملتان: Rs. 7,850 / 40kg
🍚 چاول کائنات کامونکی: Rs. 11,800 / 40kg
🧅 پیاز سندھ: Rs. 130 / kg

رابطہ نعیم: 03105423365
جاز کیش / ایزی پیسہ: 03105423365 (UmarIltaf)`}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Mandi Rates CRUD */}
        {activeTab === 'rates' && (
          <div className="py-4 space-y-4 overflow-y-auto flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-stone-900 text-base">
                  تمام فعال منڈی ریٹ ({rates.length})
                </h4>
                <p className="text-xs text-stone-500">
                  کسی بھی جنس کا بھاؤ، تیزی/مندی اور آمد فوری ایڈٹ یا ڈیلیٹ کریں
                </p>
              </div>

              <button
                onClick={() => setShowAddRateModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>نیا ریٹ شامل کریں</span>
              </button>
            </div>

            {/* Rates Table in Admin */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                  <tr>
                    <th className="py-2.5 px-3">جنس</th>
                    <th className="py-2.5 px-3">شہر و منڈی</th>
                    <th className="py-2.5 px-3">اوسط ریٹ</th>
                    <th className="py-2.5 px-3">رینج (Min - Max)</th>
                    <th className="py-2.5 px-3">آمد و تبدیلی</th>
                    <th className="py-2.5 px-3 text-right">ایکشن</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {rates.map((rate) => (
                    <tr key={rate.id} className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-bold text-stone-900">
                        <div>{rate.nameUrdu}</div>
                        <div className="text-[10px] text-stone-400">{rate.nameEn}</div>
                      </td>
                      <td className="py-2.5 px-3 text-stone-600">
                        <div>{rate.city}</div>
                        <div className="text-[10px] text-stone-400">{rate.mandiName}</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">
                        Rs. {rate.modalPrice.toLocaleString()}
                        <span className="text-[10px] text-stone-400 block">{rate.unit}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-stone-600">
                        Rs. {rate.minPrice} - {rate.maxPrice}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            rate.trend === 'up'
                              ? 'bg-emerald-100 text-emerald-800'
                              : rate.trend === 'down'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          {rate.trend === 'up' ? `▲ +${rate.change}` : rate.trend === 'down' ? `▼ ${rate.change}` : 'مستحکم'}
                        </span>
                        <div className="text-[10px] text-stone-400">{rate.arrivalVolume}</div>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingRate(rate)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                            title="ترمیم کریں"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteRate(rate.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition cursor-pointer"
                            title="ڈیلیٹ کریں"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Users Management */}
        {activeTab === 'users' && (
          <div className="py-4 space-y-4 overflow-y-auto flex-1">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                {(['all', 'FREE', 'VIP', 'BLOCKED'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setUserFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      userFilter === st
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {st === 'all' ? 'تمام' : st} ({users.filter((u) => st === 'all' || u.status === st).length})
                  </button>
                ))}
              </div>

              <span className="text-xs text-stone-500">
                سنگل ڈیوائس پروٹیکشن فعال ہے
              </span>
            </div>

            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{user.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          user.status === 'VIP'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : user.status === 'BLOCKED'
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                    <div className="text-stone-500 mt-1 flex flex-wrap gap-x-3 text-[11px]">
                      <span>موبائل: <strong className="font-mono text-stone-800">{user.phone}</strong></span>
                      <span>شہر: <strong>{user.city}</strong></span>
                      <span>ڈیوائس ID: <code className="font-mono text-emerald-800">{user.deviceId || 'نامعلوم'}</code></span>
                      <span>پاس ورڈ: <code className="bg-stone-100 px-1 py-0.5 rounded">{user.password || '123456'}</code></span>
                    </div>
                    {user.status === 'BLOCKED' && (
                      <div className="text-red-600 font-bold mt-1 text-[11px]">
                        اکاؤنٹ 2 جگہ بیک وقت لاگ ان کی وجہ سے بلاک ہے
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {user.status === 'BLOCKED' ? (
                      <button
                        onClick={() => {
                          unblockUser(user.phone);
                          setNotificationMsg(`${user.phone} کامیابی سے ان بلاک ہو گیا!`);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer"
                      >
                        ان بلاک کریں
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          simulateMultiDeviceLogin(user.phone);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 font-bold text-xs transition cursor-pointer"
                      >
                        ٹیسٹ بلاک (Block)
                      </button>
                    )}

                    {user.status !== 'VIP' ? (
                      <button
                        onClick={() => {
                          upgradeToVip(user.id, 6);
                          setNotificationMsg(`${user.name} کو 6 ماہ کا VIP مل گیا!`);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs transition cursor-pointer"
                      >
                        VIP بنائیں
                      </button>
                    ) : (
                      <span className="px-2 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded text-[11px] font-bold">
                        VIP فعال
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Payments & JazzCash UmarIltaf */}
        {activeTab === 'payments' && (
          <div className="py-6 space-y-6 overflow-y-auto flex-1">
            <div className="bg-gradient-to-br from-red-950 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-red-800/40">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <CreditCard className="w-4 h-4" />
                <span>تصدیق شدہ آفیشل JazzCash و EasyPaisa اکاؤنٹ</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black">
                JazzCash اکاؤنٹ ٹائٹل: <span className="text-amber-400 underline">{OWNER_INFO.jazzCashTitle}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-stone-900/90 p-4 rounded-2xl border border-red-600/40">
                  <div className="text-xs text-red-300 font-bold">JazzCash اکاؤنٹ نمبر:</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">
                    {OWNER_INFO.jazzCashNumber}
                  </div>
                  <div className="text-xs text-amber-300 font-semibold mt-1">
                    اکاؤنٹ ہولڈر / عنوان: <strong>{OWNER_INFO.jazzCashTitle}</strong>
                  </div>
                </div>

                <div className="bg-stone-900/90 p-4 rounded-2xl border border-emerald-600/40">
                  <div className="text-xs text-emerald-300 font-bold">EasyPaisa اکاؤنٹ نمبر:</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">
                    {OWNER_INFO.easyPaisaNumber}
                  </div>
                  <div className="text-xs text-emerald-300 font-semibold mt-1">
                    اکاؤنٹ ہولڈر / عنوان: <strong>{OWNER_INFO.accountTitle}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800 text-xs text-stone-300 space-y-1">
                <p>• تمام کسٹمرز جب VIP ممبرشپ خریدیں گے تو انہیں جاز کیش اکاؤنٹ ٹائٹل <strong>{OWNER_INFO.jazzCashTitle}</strong> دکھایا جاتا ہے۔</p>
                <p>• واحد آفیشل اونر رابطہ برائے تصدیق: <strong>{OWNER_INFO.name}</strong> - <span className="font-mono font-bold text-amber-300">{OWNER_INFO.phoneDisplay}</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-stone-200 mt-2 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>
            روزانہ منڈی ریٹ ایڈمن • آنر: {OWNER_INFO.name} ({OWNER_INFO.phoneDisplay})
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs cursor-pointer"
          >
            بند کریں (Close)
          </button>
        </div>
      </div>

      {/* Inline Edit Rate Modal */}
      {editingRate && (
        <div className="fixed inset-0 z-60 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-xs">
            <button
              onClick={() => setEditingRate(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              ✕
            </button>
            <h4 className="text-base font-bold text-stone-900 mb-4">
              ریٹ میں ترمیم: {editingRate.nameUrdu} ({editingRate.city})
            </h4>

            <form onSubmit={handleSaveEditRate} className="space-y-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">اوسط بھاؤ (Modal Price PKR)</label>
                <input
                  type="number"
                  value={editingRate.modalPrice}
                  onChange={(e) => setEditingRate({ ...editingRate, modalPrice: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">کم سے کم (Min Price)</label>
                  <input
                    type="number"
                    value={editingRate.minPrice}
                    onChange={(e) => setEditingRate({ ...editingRate, minPrice: Number(e.target.value) })}
                    className="w-full p-2 rounded-lg border border-stone-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">زیادہ سے زیادہ (Max Price)</label>
                  <input
                    type="number"
                    value={editingRate.maxPrice}
                    onChange={(e) => setEditingRate({ ...editingRate, maxPrice: Number(e.target.value) })}
                    className="w-full p-2 rounded-lg border border-stone-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">آمد بوری / مقدار</label>
                <input
                  type="text"
                  value={editingRate.arrivalVolume}
                  onChange={(e) => setEditingRate({ ...editingRate, arrivalVolume: e.target.value })}
                  className="w-full p-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">رجحان (Trend)</label>
                <select
                  value={editingRate.trend}
                  onChange={(e) => setEditingRate({ ...editingRate, trend: e.target.value as any })}
                  className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                >
                  <option value="up">▲ تیزی (Up)</option>
                  <option value="down">▼ مندی (Down)</option>
                  <option value="stable">مستحکم (Stable)</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingRate(null)}
                  className="px-3 py-2 bg-stone-100 rounded-lg text-stone-700 font-bold"
                >
                  منسوخ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg"
                >
                  محفوظ کریں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Rate Modal */}
      {showAddRateModal && (
        <div className="fixed inset-0 z-60 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-xs">
            <button
              onClick={() => setShowAddRateModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              ✕
            </button>
            <h4 className="text-base font-bold text-stone-900 mb-4">
              نئی جنس کا منڈی ریٹ شامل کریں
            </h4>

            <form onSubmit={handleCreateNewRate} className="space-y-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">جنس کا نام اردو میں*</label>
                <input
                  type="text"
                  required
                  placeholder="مثلاً: گندم نیا سیزن، مکئی، کپاس"
                  value={newCropNameUrdu}
                  onChange={(e) => setNewCropNameUrdu(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">انگریزی نام</label>
                <input
                  type="text"
                  placeholder="Wheat / Corn / Cotton"
                  value={newCropNameEn}
                  onChange={(e) => setNewCropNameEn(e.target.value)}
                  className="w-full p-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">شہر*</label>
                  <select
                    value={newCropCity}
                    onChange={(e) => setNewCropCity(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c.id} value={c.nameEn}>
                        {c.nameEn} ({c.nameUrdu})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">کیٹیگری</label>
                  <select
                    value={newCropCategory}
                    onChange={(e) => setNewCropCategory(e.target.value as any)}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  >
                    <option value="grains">غلہ و اناج (Grains)</option>
                    <option value="oilseeds">کپاس و تیل دار (Oilseeds)</option>
                    <option value="vegetables">سبزیاں (Vegetables)</option>
                    <option value="fruits">پھل (Fruits)</option>
                    <option value="pulses">دالیں (Pulses)</option>
                    <option value="poultry">پولٹری (Poultry)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">کم سے کم</label>
                  <input
                    type="number"
                    value={newCropMinPrice}
                    onChange={(e) => setNewCropMinPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-stone-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">اوسط بھاؤ*</label>
                  <input
                    type="number"
                    required
                    value={newCropModalPrice}
                    onChange={(e) => setNewCropModalPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-stone-300 font-mono font-bold text-emerald-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">زیادہ سے زیادہ</label>
                  <input
                    type="number"
                    value={newCropMaxPrice}
                    onChange={(e) => setNewCropMaxPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-stone-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">یونٹ</label>
                  <input
                    type="text"
                    value={newCropUnit}
                    onChange={(e) => setNewCropUnit(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">آمد بوری</label>
                  <input
                    type="text"
                    value={newCropArrival}
                    onChange={(e) => setNewCropArrival(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddRateModal(false)}
                  className="px-3 py-2 bg-stone-100 rounded-lg text-stone-700 font-bold"
                >
                  منسوخ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg"
                >
                  ریٹ شامل کریں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
