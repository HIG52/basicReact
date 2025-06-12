import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../../services/api';

const NoticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      const res = await apiService.getNoticeDetail(Number(id));
      setLoading(false);
      if (res.success && res.data) {
        setPost(res.data);
      } else {
        setError(res.message || '데이터 불러오기 실패');
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const res = await apiService.deleteNotice(Number(id));
    if (res.success) {
      navigate('/admin/notice');
    } else {
      alert(res.message || '삭제 실패');
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!post) return <div>데이터가 없습니다.</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>공지사항 상세</h1>
        </div>
      </div>
      <div className="container">
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2>{post.title}</h2>
          <div style={{ color: '#888', marginBottom: 8 }}>
            작성자: {post.author} | 작성일: {post.date} | 조회: {post.views}
          </div>
          <div style={{ marginBottom: 24 }}>{post.content}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="write-btn" onClick={() => navigate(`/admin/notice/edit/${id}`)}>수정</button>
            <button className="search-btn" onClick={handleDelete}>삭제</button>
            <button className="search-btn" onClick={() => navigate('/admin/notice')}>목록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail; 