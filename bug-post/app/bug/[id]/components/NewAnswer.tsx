'use client'
import { useState, useTransition } from 'react'

type Props = {
    bugId:string
}

export default function NewAnswer({bugId}:Props) {
    let [ans, setAns] = useState("")
    let [userId, setUserId] = useState(-1)
    let [isPending, startTransition] = useTransition()
    function handleSubmit(e: React.FormEvent)
    {
        e.preventDefault()
        startTransition(() => {
        (async () => {
          await fetch("/api/addans",{
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
              answer: ans,
              bugId: bugId
            })
          });
          setAns(''); 
          window.location.href = `/bug/${bugId}`
        })();
});
        }
  return (
    <>
      <hr />
      <br />
      <p className='text-4xl bg-gray-900 text-white font-sans w-[100vw] p-5 ml-5'>Write your answer:</p>
      <div className='flex flex-col items-start bg-black'>
        <textarea onChange={e=>setAns(e.target.value)} value={ans} className='bg-black text-3xl text-white h-50 ml-5 w-500 mr-10 mb-0'></textarea>
        <button onClick={handleSubmit} className='bg-blue-500 p-5 ml-5 text-2xl mt-2 mr-5'>Post 🖋️</button>
      </div>
    </>
    
  )
}