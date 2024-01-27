import { useEffect, useState } from "react";
import Header from "./Header";
import axios from 'axios'
import BasicCard from "./CourseElement";

export default function Dashboard(){
    
    const[courseList,setCourseList] = useState([]);

    useEffect(()=>{
        axios
        .get('')
        .then((res)=>{
            setCourseList(res.data);
        })
        .catch((err)=>{
            console.error(err);
        })   
    })

    return(<div>
        <Header/>
        {
           courseList.map((course)=>{
            <BasicCard courseName={course.name}/>
           }) 
        }
    </div>)

}