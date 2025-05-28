import React from 'react'
import data from '../../../data/answers.json'
import getUserById from '@/app/lib/getUserById'
type Props = {bugId:number}

export default function Answers({bugId}:Props) {
    let answerDatas = data.answers
    let AnswersContent = answerDatas.map((answer)=>
        (answer.bugId == bugId)?(
            <div key={answer.id} className='flex flex-col'>
                <p className='text-2xl p-5'>Posted by: {getUserById(answer.fromUserId)}</p>
                <p className='text-3xl p-5'>{answer.answer}</p>
                <hr/>
            </div>
        ) : null
    )
  return (
    <div className='bg-blue-500600'>
      <p className='text-4xl p-5 bg-blue-800'>Answers:</p>
      <hr/>
      {AnswersContent.length > 0 ? AnswersContent : <p>No Answers yet</p>}
    </div>
  )
}