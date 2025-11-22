import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logout as authLogout } from '../services/authService';

export default function Navbar(){
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    authLogout();
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="navbar" style={{padding:'16px 24px', borderBottom:'1px solid #eef2f8', background:'white'}}>
      <div className="brand">
        <img src="" alt="" style={{width:40,height:40,background:'#e6eefb',borderRadius:8}} />
        <h1>HealthCare Portal</h1>
      </div>
      <div className="actions">
        {user ? (
          <>
            <div style={{textAlign:'right'}}>
              <div style={{fontWeight:700}}>{user.email}</div>
              <div style={{fontSize:12,color:'#6b7280'}}>Member</div>
            </div>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn" onClick={() => navigate('/login')}>Login</button>
          </>
        )}
      </div>
    </header>
  )
}
