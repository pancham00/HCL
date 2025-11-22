import React, { useEffect, useState } from 'react';
import api from '../services/api';
import DashboardCard from '../components/DashboardCard';

export default function Dashboard(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDash = async () => {
    try {
      setLoading(true);
      const res = await api.get('/dashboard');
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchDash() }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="cards" style={{marginTop:12}}>
        <DashboardCard title="BMI" value={data?.bmi ?? 'N/A'} />
        <DashboardCard title="Recommendation">{data?.recommendation}</DashboardCard>
        <DashboardCard title="Next Checkup">{data?.nextCheckup ? new Date(data.nextCheckup).toLocaleDateString() : 'Not set'}</DashboardCard>
        <DashboardCard title="Daily Tasks">
          <ul style={{margin:0,paddingLeft:18}}>
            {data?.dailyTasks?.map((t,i)=><li key={i}>{t}</li>)}
          </ul>
        </DashboardCard>
      </div>

      <div style={{marginTop:22}}>
        <h3>Preventive reminders</h3>
        <div className="cards" style={{marginTop:12}}>
          {data?.preventiveReminders?.map(rem => (
            <div className="card" key={rem.id}>
              <h4 style={{margin:0}}>{rem.title}</h4>
              <p style={{marginTop:6,color:'#6b7280'}}>{rem.dueIn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
