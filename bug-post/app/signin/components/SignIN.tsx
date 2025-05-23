'use client'
import React from 'react'
import { useState } from 'react'

export default function SingIN() {
  const [form, setForm] = useState({userName: '', email: '', pwd: ''})

  async function handleSubmit(e: React.FormEvent)
  {
    e.preventDefault();
    if (form.userName == '') {alert("Please enter username");return;}
    if (form.email == '') {alert("Please enter email");return;}
    if (form.pwd == '') {alert("Please enter password");return;}

    const userData = await fetch('http://localhost:3000/api/userapi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: form.userName,
      email: form.email,
      pwd: form.pwd
    })
  })
  setForm({userName: '', email: '', pwd: ''});
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>)
  {
    setForm({...form, [e.target.name] : [e.target.value]})
  }
  return (
    <div className='flex flex-col items-center bg-blue-400 w-150 h-110 rounded-2xl ml-120 mt-20 p-5 justify-center'>
      <form onSubmit={handleSubmit}>
          <h2 className='p-2 m-2 text-3xl'>Name</h2> 
          <input className='bg-white rounded-2xl h-10 w-100 text-black pl-2' name='userName' onChange={handleChange} type='text' placeholder='Enter Name...'></input>
          <h2 className='p-2 m-2 text-3xl'>Email</h2>
          <input className='bg-white rounded-2xl h-10 w-100 text-black pl-2' name='email' onChange={handleChange} type='text' placeholder='Enter Email...'></input>
          <h2 className='p-2 m-2 text-3xl'>Password</h2>
          <input className='bg-white rounded-2xl h-10 w-100 mb-5 text-black pl-2' name='pwd' onChange={handleChange} type='password' placeholder='Enter Password...'></input>
          <br/>
          <button className='bg-green-600 h-10 text-white text-2xl rounded-2xl ml-40 mb-10 border-2 border-black w-30' type='submit'>Submit</button>
      </form>
    </div>
  )
}
