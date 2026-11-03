import axios from 'axios';
import type { AppError } from '../types';

export const parseApiError = (error: unknown): AppError => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const status = error.response.status;
            const backendMessage = 
                error.response.data?.detail || 
                error.response.data?.error || 
                error.response.data?.message;

            if (status >= 500) {
                return { 
                    type: 'server', 
                    message: 'Ошибка на сервере. Мы уже чиним.', 
                    statusCode: status 
                };
            }

            if (status === 401) return { type: 'client', message: 'Требуется авторизация', statusCode: status };
            if (status === 403) return { type: 'client', message: 'У вас нет прав доступа', statusCode: status };
            if (status === 404) return { type: 'client', message: 'Данные не найдены', statusCode: status };

            return { 
                type: 'client', 
                message: backendMessage || 'Ошибка в запросе', 
                statusCode: status 
            };
        }

        if (error.request) {
            return { 
                type: 'network', 
                message: 'Нет связи с сервером. Проверьте интернет.' 
            };
        }
    }

    console.error('Unhandled error:', error);
    return { 
        type: 'unknown', 
        message: 'Произошла непредвиденная ошибка' 
    };
};