export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum VpnProtocol {
  WIREGUARD = 'WireGuard',
  VLESS = 'VLESS (Xray)',
  SHADOWSOCKS = 'Shadowsocks'
}

export interface ServerNode {
  id: string;
  name: string;
  country: string;
  flag: string;
  load: number;
  status: 'online' | 'maintenance' | 'offline';
  ip: string;
  protocols: VpnProtocol[];
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  subscriptionActive: boolean;
  subscriptionExpires?: string;
  dataUsage: number; // in GB
  balance: number; // Currency (RUB)
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type Language = 'en' | 'ru';

export type PaymentMethod = 'card' | 'sbp';