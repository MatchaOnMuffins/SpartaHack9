import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function BasicCard(props) {
    const [isHovered, setIsHovered] = useState(false);
    const handleVTA=()=>{

    }
  return (
    <Card sx={{ minWidth: 275 }}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
          {props.courseName}
        </Typography>
      </CardContent>
      <CardActions>
        {isHovered && <Button size="small" onClick={handleVTA}>VTA</Button>}
      </CardActions>
    </Card>
  );
}