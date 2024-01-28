// FormComponent.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from './Header';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const CourseAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(0);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleCancel = ()=>{
    navigate('/');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your backend submission logic here
    axios.post('https://gev.grasstouching.com/add_course',{
        
    })
    .then(()=>{
        navigate('/');
    })
    .catch((err)=>{
        console.log(err);
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
      <Button type="button" variant="contained" color="primary" sx={{ marginLeft: 1 }} onClick={handleCancel}>
        Cancel
      </Button>
    </form>
    </>
  );
};

export default CourseAdd;
