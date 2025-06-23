'use client'

import React from 'react'
import { useState } from 'react';

export default function Upvote({id, vote}:{id:number, vote: string}) {
  let [ans, setVote] = useState(vote)
  const handleUpvote = async () =>{
    const res = 
  }
  return (
    <div>
        <button className='bg-gray-500 p-1 ml-4 cursor-pointer' onClick={()=>handleUpvote()}>⬆️</button>
        <p className='text-white ml-2'>{vote}</p>
    </div>
  )
}
