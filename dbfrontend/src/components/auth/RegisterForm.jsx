// RegisterForm.jsx
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import useForm from '../../hooks/useForm'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';


const RegisterForm = ({ onToggle }) => {
  const { formData, handleChange, handleSubmit, errorMessage, successMessage } = useForm();


  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: 'black' }}>
        Diabetes Tracker
      </h1>
      
      <Card className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        {/* Display success and error messages */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        <form onSubmit={handleSubmit}> {/* Ensure handleSubmit is properly linked */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              className="w-full"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <Input
              type="tel"
              name="contactnumber"
              placeholder="Enter your contact number"
              className="w-full"
              value={formData.contactnumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-sm text-center mt-2">
            Already have an account? 
            <a 
              href="/register"
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                navigate('/login'); // Navigate to register page
              }}
              className="text-blue-500 underline ml-1"
            >
              Login
            </a>

          </div>
          <Button type="submit" className="w-full mt-4">Register</Button>
        </form>
      </Card>
    </>
  );
};

export default RegisterForm;
