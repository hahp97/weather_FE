import env from '@/config/env';
import CryptoJS from 'crypto-js';

const generateEncryptionKey = (): string => {
  const browserInfo = [
    navigator.userAgent,
    navigator.language,
    window.screen.colorDepth,
    window.screen.width,
  ].join('|');

  const browserHash = CryptoJS.SHA256(browserInfo).toString().substring(0, 16);

  return `${env.ENCRYPTION_SECRET}-${browserHash}`;
};

const SECRET_KEY = generateEncryptionKey();

const getRandomSalt = (length = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const encryptData = (data: any): string => {
  try {
    const jsonData = JSON.stringify(data);

    const salt = getRandomSalt();
    const saltedData = JSON.stringify({ salt, data: jsonData });

    return CryptoJS.AES.encrypt(saltedData, SECRET_KEY).toString();
  } catch (error) {
    console.error('Lỗi mã hóa:', error);
    return '';
  }
};

export const decryptData = <T>(encryptedData: string): T | null => {
  try {
    if (!encryptedData) return null;

    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) return null;

    const saltedData = JSON.parse(decryptedString);

    return JSON.parse(saltedData.data) as T;
  } catch (error) {
    console.error('Error', error);

    return null;
  }
};

export const secureLocalStorage = {
  setItem: (key: string, data: any): void => {
    const encryptedData = encryptData(data);
    localStorage.setItem(key, encryptedData);
  },

  getItem: <T>(key: string): T | null => {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    return decryptData<T>(encryptedData);
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
};
