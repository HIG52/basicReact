import React, { useState } from 'react';
import '../../styles/pages.css';
import { apiService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
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
    if (!form.name || !form.email || !form.password || !form.passwordConfirm) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 실제 회원가입 로직
    const res = await apiService.signUp(form.name, form.email, form.password);
    if (res.success) {
      setSuccess('회원가입이 완료되었습니다!');
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setError(res.message || '회원가입 실패');
      setSuccess('');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>회원가입</h1>
          <p className="page-description">회원 정보를 입력하고 가입하세요.</p>
        </div>
      </div>
      <div className="container" style={{ maxWidth: 400 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            className="search-input"
            type="text"
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
          />
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
          <input
            className="search-input"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={handleChange}
          />
          {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
          {success && <div style={{ color: 'green', fontSize: 14 }}>{success}</div>}
          <button className="search-btn" type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp; 