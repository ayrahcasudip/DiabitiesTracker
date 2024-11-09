import { useState } from 'react';

const useDiabetes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitData = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://diabities-tracker-api.vercel.app/diabetes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Data submitted successfully:', result);
      return result; // Optionally return the result
    } catch (err) {
      setError(err.message);
      console.error("Error submitting data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submitData, loading, error };
};

export default useDiabetes;
