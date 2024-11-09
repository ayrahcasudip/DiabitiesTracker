import React, { useEffect, useState } from 'react';

// Helper function to check if blood sugar level is high
const isHighBloodSugar = (level, type) => {
  switch (type) {
    case "fasting":
      return level > 100;
    case "post_meal":
      return level > 140;
    case "random":
      return level > 200;
    default:
      return false;
  }
};

// Diabetes table component to display entries
const DiabetesTable = ({ entries }) => {
  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyles = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  };

  const tdStyles = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  };

  return (
    <table style={tableStyles}>
      <thead>
        <tr>
          <th style={thStyles}>Blood Sugar Level (mg/dL)</th>
          <th style={thStyles}>Measurement Type</th>
          <th style={thStyles}>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry._id}>
            <td 
              style={{
                ...tdStyles,
                color: isHighBloodSugar(entry.bloodSugarLevel, entry.measurementType) ? 'red' : 'inherit',
                fontWeight: isHighBloodSugar(entry.bloodSugarLevel, entry.measurementType) ? 'bold' : 'normal',
              }}
            >
              {entry.bloodSugarLevel}
            </td>
            <td style={tdStyles}>
              {entry.measurementType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </td>
            <td style={tdStyles}>
              {new Date(entry.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Main dashboard component
const DiabetesDashboar = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve userId from local storage
  const userId = localStorage.getItem('userId'); // Replace 'userId' with the actual key used to store the ID

  useEffect(() => {
    const fetchEntries = async () => {
      if (!userId) {
        setError("User ID not found in local storage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://diabities-tracker-api.vercel.app//user/getdata/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEntries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [userId]); // userId is added as a dependency

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='text-xl font-semibold'>Blood Glucose History</h1>
      <DiabetesTable entries={entries} />
    </div>
  );
};

export default DiabetesDashboar;
