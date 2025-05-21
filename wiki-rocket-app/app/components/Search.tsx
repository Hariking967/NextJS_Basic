'use client'

import React from 'react'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function Search() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    function handleSubmit()
    {
        router.push(`/${search}/`);
        setSearch("");
    }
  return (
        <div className='flex flex-row items-center'>
            <input type='text' placeholder='Search...' className='bg-white text-black p-2 w-full h-8 flex justify-between' value={search} onChange={(e)=> setSearch(e.target.value)}></input>
            <button className='bg-green-400 m-4 p-2' onClick={handleSubmit}>🚀</button>
        </div>
  )
}
