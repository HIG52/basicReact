import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Board from './pages/board/Board';
import QnA from './pages/qna/QnA';
import Notice from './pages/notice/Notice';
import Main from './pages/main/Main';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="board" element={<Board />} />
          <Route path="qna" element={<QnA />} />
          <Route path="notice" element={<Notice />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
