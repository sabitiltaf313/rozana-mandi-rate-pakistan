import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, CheckCircle, Share, PlusSquare, X } from 'lucide-react';

export const DirectInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // If already installed or user dismissed banner
  if (isInstalled || dismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      setShowManualGuide(true);
    }
  };

  return (
    <>
      {/* Prominent floating / sticky top install banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-white px-4 py-2.5 border-b border-emerald-700/50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm animate-pulse">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-amber-300 block sm:inline">
                براہ راست ایپ انسٹال کریں (Direct App Install):
              </span>{' '}
              <span className="text-stone-300 text-xs">
                روزانہ صبح 5 بجے کے ریٹ ایک کلک میں دیکھنے کیلئے موبائل اسکرین پر شامل کریں
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition shadow-sm hover:scale-105 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>ایپ انسٹال کریں (Install App)</span>
            </button>

            <button
              onClick={() => setDismissed(true)}
              className="text-stone-400 hover:text-white p-1 rounded transition"
              title="بند کریں"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Safari Installation Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-stone-900 shadow-2xl relative">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-stone-900">
              iPhone / iPad پر انسٹال کرنے کا طریقہ
            </h3>
            <div className="mt-3 text-xs text-stone-600 space-y-2.5">
              <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <Share className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>1. سفاری کے نیچے موجود <strong>Share</strong> بٹن پر کلک کریں۔</span>
              </div>
              <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <PlusSquare className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>2. نیچے سکرول کر کے <strong>Add to Home Screen</strong> پر ٹیپ کریں۔</span>
              </div>
              <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>3. <strong>Add</strong> دبائیں۔ ایپ آپ کی ہوم اسکرین پر آ جائے گی!</span>
              </div>
            </div>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full mt-5 py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl"
            >
              سمجھ گیا (Got it)
            </button>
          </div>
        </div>
      )}

      {/* Android / Desktop Direct Guide Modal */}
      {showManualGuide && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-stone-900 shadow-2xl relative">
            <button
              onClick={() => setShowManualGuide(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-stone-900">
              براہ راست انسٹالیشن (Direct Install)
            </h3>
            <p className="mt-2 text-xs text-stone-600">
              اگر براؤزر کا خودکار پاپ اپ نہیں آیا تو کروم یا براؤزر کے اوپر موجود <strong>تین نقطوں (Three Dots ⋮)</strong> پر کلک کر کے <strong>&ldquo;Install App&rdquo;</strong> یا <strong>&ldquo;Add to Home screen&rdquo;</strong> پر ٹیپ کریں۔
            </p>
            <button
              onClick={() => setShowManualGuide(false)}
              className="w-full mt-5 py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl"
            >
              ٹھیک ہے (OK)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
