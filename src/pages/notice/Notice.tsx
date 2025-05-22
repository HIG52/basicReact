import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages.css';
import Pagination from '../../components/Pagination';
import { apiService } from '../../services/api';

interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  viewCount: number;
}

const Notice: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchNotices();
  }, [currentPage]);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getNotices(currentPage, itemsPerPage);
      setNotices(response);
      setTotalItems(response.length);
    } catch (error) {
      setError('공지사항을 불러오는데 실패했습니다.');
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNoticeClick = (noticeId: number) => {
    navigate(`/notices/${noticeId}`);
  };

  if (loading) return <div className="loading">로딩중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>공지사항</h1>
          <p className="page-description">중요한 소식과 업데이트 정보를 확인하세요.</p>
        </div>
      </div>
      
      <div className="container">
        <div className="notice-container">
          <div className="notice-header">
            <div className="notice-search">
              <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
              <button className="search-btn">검색</button>
            </div>
          </div>
          
          <div className="notice-list">
            {notices.map((notice) => (
              <div 
                key={notice.id} 
                className={`notice-item`}
                onClick={() => handleNoticeClick(notice.id)}
              >
                <div className="notice-title">
                </div>
                <div className="notice-info">
                  <span>작성일: {notice.createdAt}</span>
                  <span>조회수: {notice.viewCount}</span>
                </div>
              </div>
            ))}
          </div>
          
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageCount={Math.ceil(totalItems / itemsPerPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default Notice; 