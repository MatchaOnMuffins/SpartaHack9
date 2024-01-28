import Grid from '@mui/material/Grid'; // Grid version 1
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import Chatbox from './Chatbox';
export default function CoursePage(props){
    
    const[profName, setProfName] = useState("");
    const[courseName, setCourseName] = useState("");
    const[courseDes, setCourseDes] = useState("");
    useEffect(()=>{
        axios.get(`http://localhost4000/course/${props.courseID}`)
        .then((res)=>{
            setProfName(res.data.profName);
            setCourseName(res.data.courseName);
            setCourseDes(res.data.courseDes);
        })
    },[])

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
              <ListItemText primary="Course Description: " />
              <ListItemText primary={courseDes}/>
            </ListItemButton>
          </ListItem>

        </List>
      </nav>
    </Box>
        </Grid>
        <Grid item xs={8}>
        <Chatbox/>
        </Grid>
    </Grid>

    )
}