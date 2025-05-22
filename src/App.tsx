import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Board from './pages/board/Board';
import QnA from './pages/qna/QnA';
import Notice from './pages/notice/Notice';
import NoticeDetail from './pages/notice/NoticeDetail';
import Main from './pages/main/Main';
import AdminMain from './pages/admin/AdminMain';
import NoticeAdmin from './pages/admin/NoticeAdmin';
import BoardAdmin from './pages/admin/BoardAdmin';
import UserAdmin from './pages/admin/UserAdmin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="board" element={<Board />} />
          <Route path="qna" element={<QnA />} />
          <Route path="notices" element={<Notice />} />
          <Route path="notices/:id" element={<NoticeDetail />} />
        </Route>
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/admin/notice" element={<NoticeAdmin />} />
        <Route path="/admin/board" element={<BoardAdmin />} />
        <Route path="/admin/user" element={<UserAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;
