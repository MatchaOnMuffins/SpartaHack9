import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom'


export default function BasicCard(props) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const handleVTA=()=>{
        navigate(`/coursepage/${props.id}`)
    }
  return (
    <Card sx={{ width: 150, height: 100, margin:1, backgroundColor:'primary.main', color:'secondary.main'}}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
          {props.courseName}
        </Typography>
      </CardContent>
      <CardActions>
        {isHovered && <Button size="small" color='secondary' onClick={handleVTA}>VTA</Button>}
      </CardActions>
    </Card>
  );
}