import axios from 'axios';
import { MainResponse } from '../types/api';

const API_BASE_URL = '';

interface Notice {
  id: number;
  title: string;
  content: string;
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
    getMainMessage: async (): Promise<{ success: boolean; message: string; data: any }> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/main`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: '메인 메시지 조회 실패',
                data: null
            };
        }
    },

    getNotices: async (page: number, size: number = 10): Promise<{ success: boolean; message: string; data: any }> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/notices`, {
                params: {
                    page,
                    size
                }
            });
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: '공지사항 목록 조회 실패',
                data: null
            };
        }
    },

    getNoticeDetail: async (id: number): Promise<{ success: boolean; message: string; data: any }> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/notices/${id}`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: '공지사항 상세 조회 실패',
                data: null
            };
        }
    },

    login: async (email: string, password: string): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '로그인 실패',
            };
        }
    },

    signUp: async (name: string, email: string, password: string): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/signup`, { name, email, password });
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '회원가입 실패',
            };
        }
    },

    getQnaList: async (page: number = 1, size: number = 10, search: string = ''): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/qna`, {
                params: { page, size, search }
            });
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || 'Q&A 목록 조회 실패',
            };
        }
    },

    getBoardList: async (page: number = 1, size: number = 10, search: string = ''): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/board`, {
                params: { page, size, search }
            });
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '자유게시판 목록 조회 실패',
            };
        }
    }
}; 