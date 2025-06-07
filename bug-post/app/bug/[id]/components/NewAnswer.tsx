'use client'
import { useState, useTransition } from 'react'
import addAnswer from '@/app/lib/addAnswer';

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
          await addAnswer({ bugId, ans });
          setAns(''); 
          window.location.href = `/bug/${bugId}`
        })();
});
        }
  return (
    <>
      <hr />
      <br />
      <p className='text-4xl bg-blue-600 w-[100vw] p-5'>Write your answer:</p>
      <div className='flex flex-row items-start bg-black'>
        <textarea onChange={e=>setAns(e.target.value)} value={ans} className='bg-gray-400 text-white h-50 ml-5 w-500 mr-10'></textarea>
        <button onClick={handleSubmit} className='bg-blue-500 p-5 rounded-2xl text-2xl mt-10 mr-5'>Post 🖋️</button>
      </div>
    </>
    
  )
}