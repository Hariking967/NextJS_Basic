'use client'

import React from 'react'

export default function Downvote() {
  return (
    <div>
        <button className='bg-gray-500 {answer.}p-1 ml-4  cursor-pointer' onClick={()=>handleDownvote(answer.id)}>⬇️</button>
        <p className='text-white ml-2'>{answer.downvote}</p>
    </div>
  )
}
