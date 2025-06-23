'use client'
import React, { useEffect } from 'react'
import { useState, useTransition } from 'react'
import addQuestion from '../lib/addQuestion';

export default function page() {
  let [title, setTitle] = useState('');
  let [desc, setDesc] = useState('');
  let [isPending, startTransition] = useTransition()
  function handleSubmit()
  {
    startTransition(()=>{
      (async ()=>{
        addQuestion({title, desc})
      })();
    })
  }
  return (
    <div className='flex flex-col justify-center bg-green-500 mr-120 ml-120 mt-20 rounded-2xl p-3'>
        <p className='leading-loose text-4xl'>Question</p>
        <textarea onChange={(e)=>setTitle(e.target.value)} className='bg-white h-12 rounded-2xl text-black p-3 resize-none' placeholder='Enter Title...'></textarea>
        <p className='leading-loose text-4xl'>Code</p>
        <textarea onChange={(e)=>setDesc(e.target.value)} className='bg-white h-20 rounded-2xl text-black p-3 resize-none' placeholder='Enter Description...'></textarea>
        <button onClick={handleSubmit} className='bg-red-500 p-3 m-3 w-50 ml-42 text-2xl'>Post</button>
    </div>
  )
}