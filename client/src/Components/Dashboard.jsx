import { useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import Header from "./Header";
import axios from 'axios'
import BasicCard from "./CourseElement";
import { useAuth0 } from '@auth0/auth0-react';
import CryptoJS from 'crypto-js';
import Button from '@mui/material/Button';

export default function Dashboard(){
    const { user, isAuthenticated, isLoading } = useAuth0();
    const[courseList,setCourseList] = useState([{
        id:1,
        name: "eecs280"
    },{id:2, name:"eecs203"}, {id:3, name:"math217"}]);


    const navigate = useNavigate();

    const handleAdd = ()=>{
        navigate('/courseadd');
    }
 /*  useEffect(()=>{
        const hash = CryptoJS.MD5(user.email).toString();

        axios
        .get(`https://dev.grasstouching.com/user/${hash}`)
        .then((res)=>{
            setCourseList(res.data.courses);
        })
        .catch((err)=>{
            axios.post(`https://dev.grasstouching.com/add_user`,{
                user_id:hash,   
                email: user.email,
                name: user.name,
                courses: [],
                is_instructor: false
            }).catch((err)=>{
                console.log(err);
            })
            navigate('/dash');
        })   
    },[])*/

    return(<div>
        <Header/>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
  {
    courseList.map((course) => {
      return <BasicCard key={course.id} courseName={course.name} courseID={course.id}/>
    }) 
  }
</div>
        <Button variant="outlined" sx={{ marginTop: 2 }} onClick={handleAdd}>Add New Course</Button>
    </div>)

}