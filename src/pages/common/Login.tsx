import React, { useState } from 'react';
import '../../styles/pages.css';
import { apiService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    // 실제 로그인 로직
    const res = await apiService.login(form.email, form.password);
    if (res.success) {
      setSuccess('로그인 성공!');
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setError(res.message || '로그인 실패');
      setSuccess('');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>로그인</h1>
          <p className="page-description">이메일과 비밀번호를 입력하세요.</p>
        </div>
      </div>
      <div className="container" style={{ maxWidth: 400 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            className="search-input"
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="search-input"
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
          />
          {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
          {success && <div style={{ color: 'green', fontSize: 14 }}>{success}</div>}
          <button className="search-btn" type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default Login; 