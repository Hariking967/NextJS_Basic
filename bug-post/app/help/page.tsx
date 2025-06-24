'use client'

import React from 'react'

export default function HelpPage() {
  return (
    <div className="bg-[#1a1a1a] min-h-screen px-6 py-10 text-white font-sans">
      <h1 className="text-4xl font-bold text-green-400 mb-8 text-center">📘 Help Center</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-2">🧑‍💻 What is This Platform?</h2>
        <p className="text-gray-300 text-lg leading-7">
          This is a <span className="text-green-400 font-medium">technical Q&A platform</span> where developers and students can ask questions, share answers, vote on helpful content, and grow together as a community.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-2">📝 How to Ask a Good Question</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-300 text-base">
          <li>🔍 Search existing questions before posting.</li>
          <li>🧠 Be specific and provide context.</li>
          <li>💻 Include code, errors, and what you've tried.</li>
        </ul>
        <div className="bg-gray-800 p-4 rounded mt-4 text-sm text-green-300">
          <strong>Example:</strong><br />
          "I'm getting a <code className="text-yellow-400">TypeError</code> in my React app when using <code className="text-yellow-400">useEffect</code>. Here's my code..."
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-2">💬 Answering Questions</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-300 text-base">
          <li>✅ Only answer if you're confident in your solution.</li>
          <li>🧾 Use code blocks and explain your logic.</li>
          <li>🤝 Be respectful and constructive.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-2">⬆️ Voting System</h2>
        <p className="text-gray-300 text-base">
          Help the community by voting on valuable content:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-300 text-base mt-2">
          <li>👍 Upvote helpful answers or questions.</li>
          <li>👎 Downvote incorrect or unclear posts.</li>
          <li>🌟 Votes improve discoverability and reward contributors.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-2">🏅 Reputation System</h2>
        <table className="w-full border border-gray-600 text-sm text-gray-200">
          <thead className="bg-gray-700 text-green-300">
            <tr>
              <th className="p-2 text-left">Action</th>
              <th className="p-2 text-left">Reputation</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-600">
              <td className="p-2">Upvote received</td>
              <td className="p-2 text-green-400">+10</td>
            </tr>
            <tr className="border-t border-gray-600">
              <td className="p-2">Downvote received</td>
              <td className="p-2 text-red-400">-2</td>
            </tr>
            <tr className="border-t border-gray-600">
              <td className="p-2">Answer accepted</td>
              <td className="p-2 text-yellow-300">+15</td>
            </tr>
            <tr className="border-t border-gray-600">
              <td className="p-2">Downvote given</td>
              <td className="p-2 text-red-300">-1</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
