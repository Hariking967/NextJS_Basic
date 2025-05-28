'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function page() {
  let [userId, setUserId] = useState(-1);
  let [title, setTitle] = useState('');
  let [desc, setDesc] = useState('');


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
    },[]);


  async function handleSubmit()
  {
    const GETbugs = await fetch('/api/bugsapi',{
      method: 'GET',
      credentials: 'include'
    });
   
      if (userId == -1)
      {
        window.location.href = '/signup';
      }

    const bugs = await GETbugs.json();
    console.log('userID:',userId);
    let bugId = bugs.length+1;
    const now = new Date();
    const time = now.toISOString();

    const POSTbugs = await fetch('/api/bugsapi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
            "id" : bugId,
            "title" : title,
            "desc" : desc,
            "answered" : "false",
            "userid" : userId,
            "time" : time
        }),
        credentials: 'include'
    });
  }

  return (
    <div className='flex flex-col justify-center bg-green-500 mr-120 ml-120 mt-20 rounded-2xl p-3'>
        <p className='leading-loose text-4xl'>Title</p>
        <textarea onChange={(e)=>setTitle(e.target.value)} className='bg-white h-12 rounded-2xl text-black p-3 resize-none' placeholder='Enter Title...'></textarea>
        <p className='leading-loose text-4xl'>Description</p>
        <textarea onChange={(e)=>setDesc(e.target.value)} className='bg-white h-20 rounded-2xl text-black p-3 resize-none' placeholder='Enter Description...'></textarea>
        <button onClick={handleSubmit} className='bg-red-500 p-3 m-3 w-50 ml-42 text-2xl'>Post</button>
    </div>
  )
}
