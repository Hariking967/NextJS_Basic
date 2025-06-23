import React from 'react'
// import data from '../../data/bugs.json'
// import getUserById from '../../lib/getUserById'
import Answers from './components/Answers'
import NewAnswer from './components/NewAnswer'
// import { getServerSession } from 'next-auth'
import {prisma} from "@/app/lib/prisma"

type Props = { params : {id : string} }

export default async function page({params: {id}} : Props) {
    let bugData = await prisma.bug.findFirst(
      {where: {
        id: id
      }}
    )
    let title = bugData?.title || "title";
    let desc = bugData?.desc || "desc";
    let userId = bugData?.userId || "userId";
    
    let userData = await prisma.user.findFirst({
      where: {id: userId}
    })
    let userName = userData?.userName;
  return (
    <div className='flex flex-col bg-gray-800'>
        <p>Posted by: {userName}</p>
        <p className='text-5xl ml-5 mb-5 mt-5'>{title}</p>
        <hr></hr>
        <hr></hr>
        <pre className='text-3xl p-5'>{desc}</pre>
        <NewAnswer bugId = {id}></NewAnswer>
        <Answers bugId = {id}></Answers>
    </div>
  )
}
