import axios from 'axios';

// Берем базовый URL из .env (с фоллбэком на localhost, если файла нет)
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Для передачи куки
  headers: {
    'Content-Type': 'application/json',
  },
});