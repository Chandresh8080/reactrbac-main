import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import useAuth from "./hooks/useAuth";
import axios from "axios";
import './Signin.css'



const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/linkpage";
  const { setAuth } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/Login-marketer', {
        name,
        password,
      });
      if (res?.data.name) {
        const role = res?.data.role;
        console.log({ role, name });
        setAuth({ role, name });
        setName('');
        setPassword('');
        navigate(from, { replace: true });
      } else {
        console.log('Incorrect submission');
        setError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      if (!err?.response) {
        setError('No server response');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <h1 className="signin-title">Sign In</h1>
        <div className="input-group">
          <label htmlFor="username" className="input-label">Username</label>
          <input
            type="text"
            id="username"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">Password</label>
          <input
            type="password"
            id="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="submit-button"
          disabled={!name || !password}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signin;
