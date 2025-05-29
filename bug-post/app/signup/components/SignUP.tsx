'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [form, setForm] = useState({userName: '', email: '', pwd: ''});
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent)
  {
    e.preventDefault();
    if (form.userName == '') {alert("Please enter username");return;}
    if (form.email == '') {alert("Please enter email");return;}
    if (form.pwd == '') {alert("Please enter password");return;}
    const GETuserData = await fetch('http://localhost:3000/api/userapi', {
      method : 'GET',
      headers: {
      'Content-Type': 'application/json',
    }
    });
    const getData = await GETuserData.json();
    let contains = false;
    for (let i=0; i < getData.length; i++){
      if (form.userName == getData[i].userName)
      {
        contains = true;
      }
    }
    if (contains)
    {
      let errorp = document.getElementById('error_msg')
      if (errorp)
      {
        errorp.innerText = "User already exists. Please signin";
      }
    }
    let newId = getData.length+1;
    const userData = await fetch('http://localhost:3000/api/userapi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: newId,
      userName: form.userName,
      email: form.email,
      pwd: form.pwd
    })
  });
  //change cookies

    await fetch('/api/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newId }),
      credentials: 'include',
    });
    window.location.href='/';
  setForm({userName: '', email: '', pwd: ''});
  
  router.push('/');
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>)
  {
    setForm({...form, [e.target.name] : e.target.value})
  }
  return (
    <div className='flex flex-col items-center bg-blue-400 w-150 h-110 rounded-2xl ml-120 mt-20 p-5 justify-center'>
      <form onSubmit={handleSubmit}>
          <h2 className='p-2 m-2 text-3xl'>Name</h2> 
          <input value={form.userName} className='bg-white rounded-2xl h-10 w-100 text-black pl-2' name='userName' onChange={handleChange} type='text' placeholder='Enter Name...'></input>
          <h2 className='p-2 m-2 text-3xl'>Email</h2>
          <input value={form.email} className='bg-white rounded-2xl h-10 w-100 text-black pl-2' name='email' onChange={handleChange} type='text' placeholder='Enter Email...'></input>
          <h2 className='p-2 m-2 text-3xl'>Password</h2>
          <input value={form.pwd} className='bg-white rounded-2xl h-10 w-100 mb-5 text-black pl-2' name='pwd' onChange={handleChange} type='password' placeholder='Enter Password...'></input>
          <br/>
          <button className='bg-green-600 h-10 text-white text-2xl rounded-2xl ml-40 mb-10 border-2 border-black w-30' type='submit'>Submit</button>
      </form>
      <p id='error_msg' className='bg-red-600'></p>
    </div>
  )
}