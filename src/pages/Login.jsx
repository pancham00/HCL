import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, setSession } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr('');
      const res = await login({ email, password });
      setSession(res.token, res.user);
      setUser(res.user);
      navigate('/');
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Login failed';
      setErr(msg);
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',paddingTop:40}}>
      <div className="form">
        <h2>Login</h2>
        {err && <div style={{color:'red',marginBottom:8}}>{err}</div>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••" />
          <button className="btn" style={{width:'100%'}} type="submit">Login</button>
        </form>
        <div style={{marginTop:12}}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}
