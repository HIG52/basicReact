import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Board from './pages/Board';
import QnA from './pages/QnA';
import Notice from './pages/Notice';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="board" element={<Board />} />
          <Route path="qna" element={<QnA />} />
          <Route path="notice" element={<Notice />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
