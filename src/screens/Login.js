import React, { useState } from 'react';
import { login } from '../services/auth';
import { axiosInstance } from '../services/rooms';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const user = { email, password };
    login(user);
    const res = (await axiosInstance.post('/api/users/login', user)).data
    localStorage.setItem('currentUser', JSON.stringify(res));
    window.location.href = '/';
  };

  const loginStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const authInnerStyle = {
    width: '450px',
    margin: 'auto',
    background: '#ffffff',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    padding: '40px 55px 45px 55px',
    borderRadius: '15px',
    transition: 'all 0.3s',
  };

  return (
    <div style={loginStyle}>
      <div style={authInnerStyle}>

        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-3">

        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary"
            onClick={handleLogin}>
            Submit
          </button>
        </div>
        <p className="forgot-password text-right mt-3">
          Or <a href="/register">sign up</a>
        </p>

      </div>
    </div>
  );
};

export default Login;
