import { ServerNode, User, UserRole, VpnProtocol } from '../types';

export const MOCK_SERVERS: ServerNode[] = [
  { id: '1', name: 'Amsterdam Core', country: 'Netherlands', flag: '🇳🇱', load: 45, status: 'online', ip: '185.12.34.1', protocols: [VpnProtocol.WIREGUARD, VpnProtocol.VLESS] },
  { id: '2', name: 'Berlin Edge', country: 'Germany', flag: '🇩🇪', load: 78, status: 'online', ip: '190.11.22.3', protocols: [VpnProtocol.WIREGUARD] },
  { id: '3', name: 'Singapore Fast', country: 'Singapore', flag: '🇸🇬', load: 12, status: 'online', ip: '201.55.66.7', protocols: [VpnProtocol.VLESS, VpnProtocol.SHADOWSOCKS] },
  { id: '4', name: 'New York 1', country: 'USA', flag: '🇺🇸', load: 92, status: 'maintenance', ip: '104.1.2.3', protocols: [VpnProtocol.WIREGUARD] },
  { id: '5', name: 'London West', country: 'UK', flag: '🇬🇧', load: 30, status: 'online', ip: '51.22.33.44', protocols: [VpnProtocol.WIREGUARD, VpnProtocol.VLESS] },
];

export const MOCK_USER: User = {
  id: 'u123',
  username: 'traveler_john',
  role: UserRole.USER,
  subscriptionActive: true,
  subscriptionExpires: '2025-12-31',
  dataUsage: 145.5, // GB
  balance: 45.00 // RUB
};

export const MOCK_ADMIN: User = {
  id: 'a999',
  username: 'admin_root',
  role: UserRole.ADMIN,
  subscriptionActive: true,
  dataUsage: 0,
  balance: 999999
};

export const MOCK_USERS_LIST: User[] = [
  MOCK_USER,
  { id: 'u124', username: 'alex_cyber', role: UserRole.USER, subscriptionActive: false, subscriptionExpires: '2023-10-01', dataUsage: 45.2, balance: 12.50 },
  { id: 'u125', username: 'maria_vpn', role: UserRole.USER, subscriptionActive: true, subscriptionExpires: '2024-05-15', dataUsage: 89.1, balance: 1200.00 },
  { id: 'u126', username: 'guest_99', role: UserRole.GUEST, subscriptionActive: false, dataUsage: 0.5, balance: 0 },
  { id: 'u127', username: 'dev_ops_qa', role: UserRole.USER, subscriptionActive: true, subscriptionExpires: '2024-01-20', dataUsage: 512.4, balance: 4500.00 },
];