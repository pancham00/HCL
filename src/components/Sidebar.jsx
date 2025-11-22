import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <h2>Menu</h2>
      <ul className="nav-list">
        <li><NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
        <li><NavLink to="/profile" className={({isActive}) => isActive ? 'active' : ''}>Profile</NavLink></li>
        <li><a href="https://example.com" target="_blank" rel="noreferrer">Help</a></li>
      </ul>
    </aside>
  )
}
