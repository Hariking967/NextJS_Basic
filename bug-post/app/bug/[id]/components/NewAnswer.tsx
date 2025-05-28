'use client'
import React from 'react'
import { useState, useEffect } from 'react'

type Props = {
    bugId:number
}

export default function NewAnswer({bugId}:Props) {
    let [ans, setAns] = useState("")
    let [userId, setUserId] = useState(-1)
    useEffect(()=>{
          async function fetchCookie(){
            const res = await fetch('/api/set-cookie',{
            method: 'GET',
            credentials: 'include'
          });
          const data = await res.json();
          if (data.loggedin)
          {
            setUserId(Number(data.loggedin));
          }
          }
          fetchCookie();
        //   if (userId == -1)
        //   {
        //     window.location.href = '/signup'
        //   }
        },[]);
    async function handleSubmit()
    {
        const GETuserData = await fetch('http://localhost:3000/api/answersapi', {
            method : 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const answerDatas = await GETuserData.json()
        let newAnswerId = answerDatas.length()
        const answerData = await fetch('http://localhost:3000/api/answersapi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: newAnswerId,
                fromUserId: userId,
                bugId: bugId,
                answer: ans
            })
        })
    }
  return (
    <>
      <hr />
      <br />
      <p className='text-4xl bg-blue-600 w-[100vw] p-5'>Write your answer:</p>
      <div className='flex flex-row items-start bg-black'>
        <textarea onChange={e=>setAns(e.target.value)} value={ans} className='bg-gray-400 text-white h-50 ml-5 w-500 mr-10'></textarea>
        <button onClick={handleSubmit} className='bg-blue-500 p-5 rounded-2xl text-2xl mt-10 mr-5'>Post 🖋️</button>
      </div>
    </>
    
  )
}