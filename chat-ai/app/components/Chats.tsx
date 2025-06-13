'use client'
import React, { useState } from 'react'

export default function Chats() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const handleAsk = async () => {
    try {
      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }) // ✅ make sure it's input not propmt
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Server error:", res.status, err);
        return;
      }

      const data = await res.json(); // 💥 error happens here if response is empty
      setOutput(data.output);
      setInput("");
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} className='w-64 h-10 border' />
      <button onClick={handleAsk}>Ask</button>
      <p>{output}</p>
    </div>
  )
}

