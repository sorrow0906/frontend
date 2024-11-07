import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        navigate('/'); // 로그인 성공 시 메인 페이지로 이동
      } else {
        const data = await response.json();
        setError(data.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      setError('서버에 문제가 발생했습니다.');
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>로그인</h2>

        {error && <p className="error-message">{error}</p>}

        <form id="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mid">ID</label>
            <input
              type="text"
              id="mid"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <label htmlFor="mpass">비밀번호</label>
            <input
              type="password"
              id="mpass"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input className="button" type="submit" value="로그인" />
          </div>
          <div className="find-links">
            <a href="/findID">회원ID 찾기</a>
            <span>|</span>
            <a href="/findPass_IdAuth">비밀번호 찾기</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
