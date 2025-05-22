import React from 'react';
import '../../styles/pages.css';
import { Link } from 'react-router-dom';

const AdminMain: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>관리자 메인페이지</h1>
          <p className="page-description">관리자 기능을 선택하세요.</p>
        </div>
      </div>
      <div className="container" style={{ maxWidth: 600 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 40 }}>
          <Link to="/admin/notice" className="write-btn" style={{ textAlign: 'center' }}>공지사항 관리</Link>
          <Link to="/admin/board" className="write-btn" style={{ textAlign: 'center' }}>게시글 관리</Link>
          <Link to="/admin/user" className="write-btn" style={{ textAlign: 'center' }}>회원 관리</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminMain; 