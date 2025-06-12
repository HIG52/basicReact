import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../../services/api';

const BoardWrite: React.FC = () => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await apiService.createBoard({ title });
    setLoading(false);
    if (res.success) {
      navigate('/admin/board');
    } else {
      setError(res.message || '작성 실패');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>게시글 작성</h1>
        </div>
      </div>
      <div className="container">
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="search-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', marginBottom: 16 }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="write-btn" disabled={loading}>작성</button>
            <button type="button" className="search-btn" onClick={() => navigate('/admin/board')}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardWrite; 