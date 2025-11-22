import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function Profile(){
  const { user, refreshProfile, setUser } = useAuth();
  const [profile, setProfile] = useState(user?.profile || {});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(()=> {
    setProfile(user?.profile || {});
  }, [user]);

  const handleChange = (k, v) => {
    setProfile(prev => ({...prev, [k]: v}));
  };

  const handleGoal = (goal) => {
    setProfile(prev => ({...prev, goals: {...prev.goals, [goal]: !prev.goals?.[goal]}}));
  };

  const save = async () => {
    try {
      setSaving(true); setMessage('');
      const res = await api.put('/profile', profile);
      setMessage('Saved');
      // update local storage user/profile
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({...stored, profile: res.data.profile}));
      await refreshProfile();
    } catch (err) {
      console.error(err);
      setMessage('Failed to save');
    } finally { setSaving(false); }
  };

  return (
    <div>
      <h2>Profile</h2>
      <div className="form" style={{maxWidth:800}}>
        <div className="row">
          <div>
            <label>Name</label>
            <input value={profile.name || ''} onChange={e=>handleChange('name', e.target.value)} />
          </div>
          <div>
            <label>Age</label>
            <input type="number" value={profile.age || ''} onChange={e=>handleChange('age', e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Gender</label>
            <select value={profile.gender || ''} onChange={e=>handleChange('gender', e.target.value)}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Lifestyle</label>
            <select value={profile.lifestyle || ''} onChange={e=>handleChange('lifestyle', e.target.value)}>
              <option value="">Select</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div>
            <label>Height (cm)</label>
            <input type="number" value={profile.heightCm || ''} onChange={e=>handleChange('heightCm', e.target.value)} />
          </div>
          <div>
            <label>Weight (kg)</label>
            <input type="number" value={profile.weightKg || ''} onChange={e=>handleChange('weightKg', e.target.value)} />
          </div>
        </div>

        <div>
          <label>Goals</label>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <label><input type="checkbox" checked={profile.goals?.weightLoss || false} onChange={()=>handleGoal('weightLoss')} /> Weight-loss</label>
            <label><input type="checkbox" checked={profile.goals?.fitness || false} onChange={()=>handleGoal('fitness')} /> Fitness</label>
            <label><input type="checkbox" checked={profile.goals?.sleep || false} onChange={()=>handleGoal('sleep')} /> Sleep</label>
            <label><input type="checkbox" checked={profile.goals?.hydration || false} onChange={()=>handleGoal('hydration')} /> Hydration</label>
          </div>
        </div>

        <div style={{marginTop:12, display:'flex', gap:12}}>
          <button className="btn" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save profile'}</button>
          {message && <div style={{alignSelf:'center'}}>{message}</div>}
        </div>
      </div>
    </div>
  )
}
