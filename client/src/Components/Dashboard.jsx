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
    const[courseList,setCourseList] = useState([]);

    const navigate = useNavigate();

    const handleAdd = ()=>{
        navigate('/courseadd');
    }
    useEffect(()=>{
        const hash = CryptoJS.MD5(user.email).toString();

        axios
        .post(`http://localhost:4000/user`,{
            user_id: hash,
            email:user.email
        })
        .then((res)=>{
            setCourseList(res.data.courses);
        })
        .catch((err)=>{
            console.error(err);
        })   
    },[])

    return(<div>
        <Header/>
        {
           courseList.map((course)=>{
            <BasicCard courseName={course.name} courseID={course.id}/>
           }) 
        }
        <Button variant="outlined" sx={{ marginTop: 2 }} onClick={handleAdd}>Add New Course</Button>
    </div>)

}