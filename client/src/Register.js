import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Register.css'


const Register = () => {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/signin';
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);

  const [password, setPassword] = useState('');
  const [validPass, setValidPass] = useState(false);
  const [matchPassword, setMatchPassword] = useState('');
  const [checkMatch, setCheckMatch] = useState(false);
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState('');
  const [error, setError] = useState('');

  let match;

  if (roles === 'HR') {
    match = '/register-hr';
  } else if (roles === 'SE') {
    match = '/register-se';
  } else if (roles === 'Marketers') {
    match = '/register-marketer';
  }
  const REGISTER_URL = match;

  useEffect(() => {
   
    setValidName(USER_REGEX.test(name));
  }, [name]);

  useEffect(() => {
  
    const result = PWD_REGEX.test(password);
    setValidPass(result);
    const match = password === matchPassword;
    setCheckMatch(match);
  }, [password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validName && validPass && matchPassword) {
      try {
        await fetch(`http://localhost:5000${REGISTER_URL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });
        navigate(from, { replace: true });
        setName('');
        setEmail('');
        setMatchPassword('');
        setPassword('');
      } catch (err) {
        if (!err?.response) {
          setError('No server response');
        } else if (err?.response?.status === 409) {
          setError('Employee already exists');
        } else {
          setError('Registration failed');
        }
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <p className="error-message">{error}</p>
        <h1 className="form-title">Register</h1>

        <div className={validName ? 'form-group valid' : 'form-group error'}>
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            id="name"
            className="form-input"
            type="text"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <p className="helper-text">
            4 to 24 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>


        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-input"
            type="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="roles" className="form-label">
            Roles
          </label>
          <div className="custom-select">
            <select
              id="roles"
              className="form-select"
              onChange={(e) => setRoles(e.target.value)}
            >
              <option value="">Select a role</option>
              <option value="SE">Software Engineer</option>
              <option value="Marketers">Marketer</option>
              <option value="HR">Human Resource Personnel</option>
            </select>
          </div>
        </div>


        <div className={validPass ? 'form-group valid' : 'form-group error'}>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            className="form-input"
            type="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <p className="helper-text">
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number, and a special character.
          </p>
        </div>


        <div className={checkMatch ? 'form-group valid' : 'form-group error'}>
          <label htmlFor="matchPassword" className="form-label">
            Confirm Password
          </label>
          <input
            id="matchPassword"
            className="form-input"
            type="password"
            autoComplete="off"
            onChange={(e) => setMatchPassword(e.target.value)}
            value={matchPassword}
            required
          />
          <p className="helper-text">Must match the password.</p>
        </div>


        <button
          className="form-submit"
          disabled={!email || !validName || !validPass || !checkMatch}
        >
          Submit
        </button>


        <p className="form-footer">
          Already registered? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
