import { toast } from 'sonner';
import { useState } from 'react';

const useForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullname: '',
    contactnumber: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit fired with data:", formData);
  
    try {
      const response = await fetch('https://diabities-tracker-api.vercel.app/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Show success toast with custom color
        toast.success('User registered successfully', {
          style: { backgroundColor: '#28a745', color: 'white' } // Green background for success
        });
        setFormData({
          username: '',
          email: '',
          fullname: '',
          contactnumber: '',
          password: '',
        });
      } else {
        // Show error toast with custom color
        toast.error(data.message || 'An error occurred during registration', {
          style: { backgroundColor: '#dc3545', color: 'white' } // Red background for error
        });
      }
    } catch (error) {
      // Show error toast with custom color
      toast.error('Failed to register. Please try again.', {
        style: { backgroundColor: '#dc3545', color: 'white' } // Red background for error
      });
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
