'use client'

import React from 'react'
import { useState } from 'react';

export default function Upvote({ answer }: { answer: {
  id: string;
  answer: string;
  fromUserId: string | null;
  bugId: string | null;
  upvote: number;
  downvote: number;
} }) {
  let initialVote= answer.upvote
  let [vote, setVote] = useState(initialVote)
  const handleUpvote = async () =>{
    const res = await fetch("/api/upvote",{
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            ans: answer
        })
    })
    let newVote = await res.json()
    setVote(newVote)
  }
  return (
    <div className='bg-green-400 flex flex-row items-center'>
        <button className='ml-4 cursor-pointer text-4xl' onClick={()=>handleUpvote()}>⬆️</button>
        <p className='text-white text-2xl ml-2 mr-2'>{vote}</p>
    </div>
  )
}
