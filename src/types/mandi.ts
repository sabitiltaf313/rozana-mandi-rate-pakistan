export type UserStatus = 'FREE' | 'VIP' | 'BLOCKED';

export interface User {
  id: string;
  name: string;
  phone: string;
  city: string;
  password?: string;
  status: UserStatus;
  deviceId: string | null;
  ip: string | null;
  planExpiry: string | null;
  registeredAt: string;
  blockReason?: string;
}

export type CommodityCategory = 'all' | 'grains' | 'oilseeds' | 'vegetables' | 'fruits' | 'pulses' | 'poultry';

export interface MandiRate {
  id: string;
  nameUrdu: string;
  nameEn: string;
  category: CommodityCategory;
  city: string;
  mandiName: string;
  minPrice: number; // PKR per 40kg (1 Maund) or specified unit
  maxPrice: number;
  modalPrice: number;
  unit: string; // e.g. "40 kg (من)", "فی کلو", "100 انڈے"
  change: number; // change in PKR
  trend: 'up' | 'down' | 'stable';
  arrivalVolume: string; // e.g. "3,400 بوری"
  quality: string; // "A-Class / اول", "درجہ دوم"
  updatedAt: string;
  historical7Days: { date: string; price: number }[];
}

export interface CityInfo {
  id: string;
  nameUrdu: string;
  nameEn: string;
  province: string;
  majorMandi: string;
}
