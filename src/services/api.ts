import axios from 'axios';
import { MainResponse } from '../types/api';

const API_BASE_URL = ''; // 프록시를 사용하므로 빈 문자열로 설정

export const apiService = {
    getMainMessage: async (): Promise<MainResponse> => {
        try {
            console.log('Calling API...');
            const response = await axios.get<MainResponse>(`${API_BASE_URL}/main`);
            console.log('API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}; 