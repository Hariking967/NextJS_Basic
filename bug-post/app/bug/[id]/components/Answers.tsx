import React from 'react'
// import data from '../../../data/answers.json'
// import getUserById from '@/app/lib/getUserById'
type Props = {bugId:string}
import {prisma} from "@/app/lib/prisma"
import Upvote from './Upvote';
import Downvote from './Downvote';

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

    async function handleUpvote(answerId: string) {
      const currentAnswer = await prisma.answer.findFirst({
        where: { id: answerId },
      });
      if (currentAnswer)
      {
        const newUpvote = currentAnswer?.upvote + 1;

        await prisma.answer.update({
          where: { id: answerId },
          data: { upvote: newUpvote },
        });
      }
    }

    async function handleDownvote(answerId: string) {
      const currentAnswer = await prisma.answer.findFirst({
        where: { id: answerId },
      });
      if (currentAnswer)
      {
        const newDownvote = currentAnswer?.downvote - 1;

        await prisma.answer.update({
          where: { id: answerId },
          data: { downvote: newDownvote },
        });
      }
      
    }
    let AnswersContent = answerDatas.map((answer)=>
        (
            <div key={answer.id} className="flex flex-col bg-gray-700 p-6 rounded-2xl shadow-md my-4">
              <p className="text-xl text-gray-500 font-medium mb-3">
                Posted by: {convert(answer.fromUserId || "user")}
              </p>
              <p className="text-2xl text-white font-semibold mb-2">
                {answer.answer}
              </p>
              <div className='flex flex-row'>
                <Upvote answer={answer}></Upvote>
                <Downvote answer={answer}></Downvote>
              </div>
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