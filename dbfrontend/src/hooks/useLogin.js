import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const useLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // Check if already logged in and redirect if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit fired with data:", formData);

    try {
      const response = await fetch('https://diabities-tracker-fgxfguqjz-saugatifys-projects.vercel.app/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response data:", data); // Log the response data

      if (response.ok) {
        console.log('Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data._id);
        localStorage.setItem('username', data.username);

        console.log("Token:", data.token);
        console.log("userID:", data._id);
        console.log("username:", data.username);

        toast.success('Login successful!', {
          style: { backgroundColor: '#28a745', color: 'white' }
        });

        // Redirect to dashboard after login
        console.log('Navigating to dashboard');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Login failed. Please check your credentials.', {
          style: { backgroundColor: '#dc3545', color: 'white' }
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to log in. Please try again.', {
        style: { backgroundColor: '#dc3545', color: 'white' }
      });
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
