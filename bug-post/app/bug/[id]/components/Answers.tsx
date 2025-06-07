import React from 'react'
// import data from '../../../data/answers.json'
// import getUserById from '@/app/lib/getUserById'
type Props = {bugId:string}
import {prisma} from "@/app/lib/prisma"

export default async function Answers({bugId}:Props) {
    let answerDatas = await prisma.answer.findMany({
      where: {bugId: bugId}
    });
    const convert = async (userid: string) =>{
      const userData = await prisma.user.findFirst({
        where: {id: userid}
      })
      let userId = userData?.userName
      return userId
    }
    let AnswersContent = answerDatas.map((answer)=>
        (
            <div key={answer.id} className='flex flex-col'>
                <p className='text-2xl p-5'>Posted by: {convert(answer.fromUserId||"user")}</p>
                <p className='text-3xl p-5'>{answer.answer}</p>
                <hr/>
            </div>
        )
    )
  return (
    <div className='bg-blue-500600'>
      <p className='text-4xl p-5 bg-blue-800'>Answers:</p>
      <hr/>
      {AnswersContent.length > 0 ? AnswersContent : <p>No Answers yet</p>}
    </div>
  )
}