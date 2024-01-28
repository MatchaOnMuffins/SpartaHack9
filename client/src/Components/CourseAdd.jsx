// FormComponent.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from './Header';
import axios from 'axios';
const CourseAdd = () => {
  const [formData, setFormData] = useState(0);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your backend submission logic here
    axios.post('http://localhost:4000/course',{

    })
  };

  return (
    <>
    <Header/>
    <form onSubmit={handleSubmit}>
      <TextField
        label="Enter the course code"
        variant="outlined"
        fullWidth
        name="userInput"
        value={formData.userInput}
        onChange={handleChange}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Enter
      </Button>
    </form>
    </>
  );
};

export default CourseAdd;
