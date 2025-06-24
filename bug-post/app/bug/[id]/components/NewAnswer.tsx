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
      <p className="text-4xl bg-gray-900 text-white font-sans w-full p-5 pl-8">Write your answer:</p>

      <div className="flex flex-col bg-gray-900 p-6 w-full">
        <label className="text-white text-xl mb-2 ml-1">Your Answer:</label>
        <textarea
          onChange={e => setAns(e.target.value)}
          value={ans}
          placeholder="Type your answer here..."
          className="bg-black text-white text-lg p-4 rounded-lg resize-none min-h-[200px] mb-4 w-full"
        />
        <div className="flex justify-end w-full">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Post 🖋️
          </button>
        </div>
      </div>
    </>

    
  )
}