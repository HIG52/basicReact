import axios from 'axios';
import { MainResponse } from '../types/api';

const API_BASE_URL = ''; // 프록시를 사용하므로 빈 문자열로 설정

interface Notice {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  viewCount: number;
}

interface NoticeListResponse {
  notices: Notice[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

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
    },

    getNotices: async (page: number, size: number = 10): Promise<Notice[]> => {
        try {
            const response = await axios.get<Notice[]>(`${API_BASE_URL}/notices`, {
                params: {
                    page,
                    size
                }
            });
            return response.data;
        } catch (error) {
            console.error('공지사항 목록 조회 실패:', error);
            throw error;
        }
    },

    getNoticeDetail: async (id: number): Promise<Notice> => {
        try {
            const response = await axios.get<Notice>(`${API_BASE_URL}/notices/${id}`);
            return response.data;
        } catch (error) {
            console.error('공지사항 상세 조회 실패:', error);
            throw error;
        }
    }
}; 