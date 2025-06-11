import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages.css';

const AdminMain: React.FC = () => {
  const navigate = useNavigate();
  // 예시 통계 데이터
  const stats = [
    { label: '총 게시글', value: 132 },
    { label: '오늘 작성된 글', value: 3 },
    { label: '총 회원 수', value: 57 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>관리자 대시보드</h1>
          <p className="page-description">관리자 주요 현황과 바로가기를 확인하세요.</p>
        </div>
      </div>
      <div className="container" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', gap: 24, margin: '32px 0' }}>
          {stats.map(stat => (
            <div key={stat.label} className="dashboard-card">
              <div className="dashboard-value">{stat.value}</div>
              <div className="dashboard-label">{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 40 }}>
          <button className="write-btn" style={{ flex: 1 }} onClick={() => navigate('/admin/notice')}>공지사항 관리</button>
          <button className="write-btn" style={{ flex: 1 }} onClick={() => navigate('/admin/board')}>게시글 관리</button>
          <button className="write-btn" style={{ flex: 1 }} onClick={() => navigate('/admin/user')}>회원 관리</button>
        </div>
      </div>
    </div>
  );
};

export default AdminMain; 