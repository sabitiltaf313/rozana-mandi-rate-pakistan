import React from 'react';
import { useMandi } from '../context/MandiContext';
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';

export const LiveTicker: React.FC = () => {
  const { rates } = useMandi();
  const tickerItems = [...rates, ...rates];

  return (
    <div className="bg-stone-900 border-y border-stone-800 text-stone-200 overflow-hidden py-2 text-xs relative select-none">
      <div className="flex items-center">
        {/* Static Prefix Tag */}
        <div className="z-10 bg-emerald-700 text-white font-bold px-3 py-1 text-[11px] uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-md">
          <Clock className="w-3 h-3 text-amber-300" />
          <span>صبح 5:00 بجے تازہ ریٹس</span>
        </div>

        {/* Marquee Track */}
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <div className="animate-marquee flex gap-6 items-center">
            {tickerItems.map((rate, i) => (
              <div
                key={`${rate.id}-${i}`}
                className="inline-flex items-center gap-2 px-3 py-0.5 rounded-lg bg-stone-800/80 border border-stone-700/60"
              >
                <span className="font-bold text-white">{rate.nameUrdu}</span>
                <span className="text-stone-400 text-[11px]">({rate.city})</span>
                <span className="font-mono font-bold text-amber-300">
                  Rs. {rate.modalPrice.toLocaleString()}
                </span>
                <span className="text-[10px] text-stone-400">/{rate.unit.split(' ')[0]}</span>

                {rate.trend === 'up' ? (
                  <span className="inline-flex items-center text-emerald-400 font-mono font-bold text-[11px]">
                    <TrendingUp className="w-3 h-3 mr-0.5" />+{rate.change}
                  </span>
                ) : rate.trend === 'down' ? (
                  <span className="inline-flex items-center text-red-400 font-mono font-bold text-[11px]">
                    <TrendingDown className="w-3 h-3 mr-0.5" />-{Math.abs(rate.change)}
                  </span>
                ) : (
                  <span className="inline-flex items-center text-stone-400 text-[11px]">
                    <Minus className="w-3 h-3 mr-0.5" />0
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
