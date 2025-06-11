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
    },

    getBoardDetail: async (id: number): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/board/${id}`);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '자유게시판 상세 조회 실패',
            };
        }
    },

    createBoard: async (data: { title: string; content?: string }): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/board`, data);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '자유게시판 작성 실패',
            };
        }
    },

    updateBoard: async (id: number, data: { title: string; content?: string }): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/board/${id}`, data);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '자유게시판 수정 실패',
            };
        }
    },

    deleteBoard: async (id: number): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/board/${id}`);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '자유게시판 삭제 실패',
            };
        }
    },

    getQnaDetail: async (id: number): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/qna/${id}`);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || 'Q&A 상세 조회 실패',
            };
        }
    },

    createQna: async (data: { title: string; content?: string }): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/qna`, data);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || 'Q&A 작성 실패',
            };
        }
    },

    updateQna: async (id: number, data: { title: string; content?: string }): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/qna/${id}`, data);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || 'Q&A 수정 실패',
            };
        }
    },

    deleteQna: async (id: number): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/qna/${id}`);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || 'Q&A 삭제 실패',
            };
        }
    },

    createNotice: async (data: { title: string; content?: string }): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/notices`, data);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '공지사항 작성 실패',
            };
        }
    },

    updateNotice: async (id: number, data: { title: string; content?: string }): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/notices/${id}`, data);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '공지사항 수정 실패',
            };
        }
    },

    deleteNotice: async (id: number): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/notices/${id}`);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '공지사항 삭제 실패',
            };
        }
    },

    getUserList: async (page: number = 1, size: number = 10, search: string = ''): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`, {
                params: { page, size, search }
            });
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '회원 목록 조회 실패',
            };
        }
    },

    createUser: async (data: { name: string; email: string; role: string }): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users`, data);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '회원 추가 실패',
            };
        }
    },

    deleteUser: async (id: number): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '회원 삭제 실패',
            };
        }
    },

    getUserDetail: async (id: number): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/${id}`);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '회원 상세 조회 실패',
            };
        }
    },

    updateUser: async (id: number, data: { name: string; email: string; role: string }): Promise<{ success: boolean; message: string; data?: any }> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/users/${id}`, data);
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || '회원 수정 실패',
            };
        }
    }
}; 