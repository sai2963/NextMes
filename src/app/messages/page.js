'use client'
import { useEffect, useState } from "react"
import { collection,doc,getDocs } from "firebase/firestore";

import { db } from "../../../firebase/clientApp";
import Getmessages from "@/components/messages";
export default function Messages(){
    const [messages,setMessages]=useState([]);
    useEffect(()=>{
        const fetchmessages = async ()=>{
            const postRef= collection(db,"messages");
            const querySnapShot=await getDocs(postRef);
            const mesData=querySnapShot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setMessages(mesData)
        }
      fetchmessages();  
    },[])
    return(
        <>
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 flex items-center justify-center p-4">
        <Getmessages messages={messages}/>
        </div>
        
        </>
    )
}