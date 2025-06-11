import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import '../../styles/pages.css';

const adminMenus = [
  { path: '/admin/board', label: '자유게시판 관리' },
  { path: '/admin/qna', label: 'Q&A 관리' },
  { path: '/admin/notice', label: '공지사항 관리' },
  { path: '/admin/user', label: '회원 관리' },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();
  return (
    <div>
      <header className="admin-header">
        <div className="container admin-header-container">
          <Link to="/admin" className="admin-logo">Admin</Link>
          <ul className="admin-nav-menu">
            {adminMenus.map(menu => (
              <li key={menu.path}>
                <Link
                  to={menu.path}
                  className={location.pathname === menu.path ? 'active' : ''}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 