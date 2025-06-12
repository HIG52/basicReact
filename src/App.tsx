import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import Board from './pages/board/Board';
import QnA from './pages/qna/QnA';
import Notice from './pages/notice/Notice';
import NoticeDetail from './pages/notice/NoticeDetail';
import Main from './pages/main/Main';
import AdminMain from './pages/admin/AdminMain';
import { NoticeAdmin, NoticeWrite, NoticeEdit } from './pages/admin/notice';
import { BoardAdmin, BoardWrite, BoardEdit, BoardDetail } from './pages/admin/board';
import { UserAdmin, UserDetail, UserEdit } from './pages/admin/user';
import { QnAAdmin, QnAWrite, QnAEdit, QnADetail } from './pages/admin/qna';
import SignUp from './pages/common/SignUp';
import Login from './pages/common/Login';

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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminMain />} />
          <Route path="board" element={<BoardAdmin />} />
          <Route path="board/write" element={<BoardWrite />} />
          <Route path="board/edit/:id" element={<BoardEdit />} />
          <Route path="board/:id" element={<BoardDetail />} />
          <Route path="qna" element={<QnAAdmin />} />
          <Route path="qna/write" element={<QnAWrite />} />
          <Route path="qna/edit/:id" element={<QnAEdit />} />
          <Route path="qna/:id" element={<QnADetail />} />
          <Route path="notice" element={<NoticeAdmin />} />
          <Route path="notice/write" element={<NoticeWrite />} />
          <Route path="notice/edit/:id" element={<NoticeEdit />} />
          <Route path="notice/:id" element={<NoticeDetail />} />
          <Route path="user" element={<UserAdmin />} />
          <Route path="user/:id" element={<UserDetail />} />
          <Route path="user/edit/:id" element={<UserEdit />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
