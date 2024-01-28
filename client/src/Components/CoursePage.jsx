import Grid from '@mui/material/Grid'; // Grid version 1
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import Chatbox from './Chatbox';
export default function CoursePage(){
    const {courseID} = useParams();
    const[profName, setProfName] = useState("Professor Kamil");
    const[courseName, setCourseName] = useState("EECS280");
    const[courseDes, setCourseDes] = useState("Computer science fundamentals, with programming in C++. Build an image processing program, a game of Euchre, a web backend, and a machine learning algorithm.");
    /*useEffect(()=>{
        axios.get(`https://dev.grasstouching.com/course/${courseID}`)
        .then((res)=>{
            setProfName(res.data.professor);
            setCourseName(res.data.class_name);
            setCourseDes(res.data.course_description);
        })          
    },[])*/
    const navigate = useNavigate();
    const handleGoback = ()=>{
        navigate('/dash');
    }
    return(
    <Grid container spacing={2} >
        <Grid item xs={4} >
        <Box sx={{ width: '100%', maxWidth: 360, height:'100vh', bgcolor: 'primary.main', color:'secondary.main'}}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AppRegistrationIcon color='secondary'/>
              </ListItemIcon>
              <ListItemText primary = {courseName} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon color='secondary'/>
              </ListItemIcon>
              <ListItemText primary={profName} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
        <ListItem disablePadding>
            <ListItemButton>
            <Typography variant="body1" component="p">
            Course Description:
            </Typography>
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton>
            <Typography variant="body1" component="p" style={{ marginTop: '10px' }}>
                {courseDes}
                </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <Button variant="contained" color="primary" onClick={handleGoback}>
             Previos Page
            </Button>
            </ListItem>
        </List>
      </nav>
    </Box>
        </Grid>
        <Grid item xs={8}>
        <Chatbox courseID={courseID}/>
        </Grid>
    </Grid>

    )
}