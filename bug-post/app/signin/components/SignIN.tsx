'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SingIN() {
  const [form, setForm] = useState({userName: '', email: '', pwd: ''})
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

    //check signin related errors
    const getData = await GETuserData.json();
    let contains = -1;
    for (let i=0; i < getData.length; i++){
      console.log(i);
      console.log(form.userName);
      console.log(getData[i].userName);
      if (form.userName == getData[i].userName)
      {
        contains = i;
      }
    }
    console.log(contains);
    if (contains == -1)
    {
      let errorp = document.getElementById('error_msg')
      if (errorp)
      {
        errorp.innerText = "No such user"
        return;
      }
    }
    if (form.email != getData[contains].email)
    {
      let errorp = document.getElementById('error_msg')
      if (errorp)
      {
        errorp.innerText = "Email incorrect";
        return;
      }
    }
    if (form.pwd != getData[contains].pwd)
    {
      let errorp = document.getElementById('error_msg')
      if (errorp)
      {
        errorp.innerText = "Password incorrect";
        return;
      }
    }

    //change cookies
    const userId = getData[contains].id;

    await fetch('/api/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
      credentials: 'include',
    });
    window.location.href='/';
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>)
  {
    setForm({...form, [e.target.name] : e.target.value})
  }
  return (
    <div className='flex flex-col items-center bg-blue-400 w-150 rounded-2xl ml-120 mt-20 p-5 justify-center'>
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
      <span>Create New Account👉</span>
      <Link href='/signup'>Sign UP</Link>
    </div>
  )
}