import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/pages.css';
import { apiService } from '../../services/api';

interface NoticeDetail {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  viewCount: number;
}

const NoticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchNoticeDetail(parseInt(id));
    }
  }, [id]);

  const fetchNoticeDetail = async (noticeId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getNoticeDetail(noticeId);
      if (response.success) {
        setNotice(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('공지사항을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="loading">로딩중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!notice) return <div className="error">공지사항을 찾을 수 없습니다.</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>공지사항</h1>
        </div>
      </div>

      <div className="container">
        <div className="notice-detail-container">
          <div className="notice-detail-header">
            <div className="notice-detail-title">
              <h2>{notice.title}</h2>
            </div>
            <div className="notice-detail-info">
              <span>작성일: {notice.createdAt}</span>
              <span>조회수: {notice.viewCount}</span>
            </div>
          </div>

          <div className="notice-detail-content">
            {notice.content}
          </div>

          <div className="notice-detail-actions">
            <button onClick={handleGoBack} className="btn-back">
              목록으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail; 