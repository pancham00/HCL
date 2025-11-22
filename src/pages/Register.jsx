import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, setSession } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

export default function Register(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr('');
      const res = await register({ email, password, name });
      setSession(res.token, res.user);
      setUser(res.user);
      navigate('/login');
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Registration failed';
      setErr(msg);
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',paddingTop:40}}>
      <div className="form">
        <h2>Register</h2>
        {err && <div style={{color:'red',marginBottom:8}}>{err}</div>}
        <form onSubmit={handleSubmit}>
          <label>Full name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="6+ characters" />
          <button className="btn" style={{width:'100%'}} type="submit">Create account</button>
        </form>
        <div style={{marginTop:12}}>
          Already registered? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}
