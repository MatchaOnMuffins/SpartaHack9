import { useEffect, useState } from "react";
import Header from "./Header";
import axios from 'axios'
import BasicCard from "./CourseElement";
import { useAuth0 } from '@auth0/auth0-react';
import CryptoJS from 'crypto-js';

export default function Dashboard(){
    const { user, isAuthenticated, isLoading } = useAuth0();
    const[courseList,setCourseList] = useState([]);
    useEffect(()=>{
        const hash = CryptoJS.MD5(user.email).toString();

        axios
        .get(`http://localhost:4000/user/${hash}`)
        .then((res)=>{
            setCourseList(res.data);
        })
        .catch((err)=>{
            console.error(err);
        })   
    },[])

    return(<div>
        <Header/>
        {
           courseList.map((course)=>{
            <BasicCard courseName={course.name}/>
           }) 
        }
    </div>)

}