import React, { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cnp, setCnp] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signUpStyle = {
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

  //const { error, loading, data = [] } = useFetchData(() => register());

  function handleSignUp() {
    // e.preventDefault();

    const user = {
      first_name: firstName,
      last_name: lastName,
      CNP: cnp,
      address: address,
      email, password
    }
    register(user).then(() => {
      alert("success!");
      navigate("/login");

    }).catch(() => {
      alert("failed!")
    })
  };

  return (
    <div style={signUpStyle}>
      <div style={authInnerStyle}>
        {/* <form onSubmit={handleSignUp}> */}
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>CNP</label>
          <input
            type="text"
            className="form-control"
            placeholder="CNP"
            value={cnp}
            onChange={(e) => setCnp(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary"
            onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right mt-3">
          Already registered <a href="/login">sign in?</a>
        </p>
        {/* </form> */}
      </div>
    </div>
  );
}
