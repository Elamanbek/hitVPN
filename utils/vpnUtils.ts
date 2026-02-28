// Simulates generating a WireGuard Private Key (32 bytes, Base64)
export const generateWireGuardKeys = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let privateKey = '';
  for (let i = 0; i < 43; i++) {
    privateKey += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  privateKey += '='; // Padding

  // In reality, Public Key is derived from Private. Here we mock it.
  let publicKey = '';
  for (let i = 0; i < 43; i++) {
    publicKey += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  publicKey += '=';

  return { privateKey, publicKey };
};

// Generates a UUID v4 for VLESS/V2Ray
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const generateShortId = () => {
    return Math.random().toString(36).substring(2, 10);
};