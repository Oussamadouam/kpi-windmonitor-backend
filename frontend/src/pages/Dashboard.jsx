import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../../config';

function Dashboard() {
  const [kpiData, setKpiData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/your-endpoint`)
      .then(response => response.json())
      .then(data => setKpiData(data))
      .catch(error => console.error('Error fetching KPI:', error));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {kpiData ? (
        <pre>{JSON.stringify(kpiData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
