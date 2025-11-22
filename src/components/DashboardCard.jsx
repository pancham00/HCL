import React from 'react';
import './DashboardCard.css';

export default function DashboardCard({ title, value, children }) {
  return (
    <div className="card dashboard-card">
      <h3>{title}</h3>
      {value !== undefined && <p style={{fontSize:24,fontWeight:700}}>{value}</p>}
      <div style={{marginTop:8}}>{children}</div>
    </div>
  )
}
