import React from 'react'
// import data from '../data/bugs.json'
import Link from 'next/link';
// import getUserById from '../lib/getUserById';
import {prisma} from "@/app/lib/prisma"

export default async function BugPage() {
    let bugDatas = await prisma.bug.findMany();
    const convert = async (userid: string) =>{
          const userData = await prisma.user.findFirst({
            where: {id: userid}
          })
          let userId = userData?.userName
          return userId
        }
    let bugContent = bugDatas.map(bug=>(
        <Link key={bug.id} href= {`/bug/${bug.id}`}>
            <div className='flex flex-row gap-4 p-4 m-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all shadow-md cursor-pointer'>
                <div className='flex flex-col w-[90vw]'>
                    <p className='text-3xl m-3 truncate'>{bug.title}</p>
                    <p className='text-3xl m-3 truncate'>{bug.desc}</p>
                    <p className='text-3xl m-3'>Posted by: {convert(bug.userId||"bug")}</p>
                    <p>{bug.answered} answered</p>
                </div>
            </div>
            
        </Link>
    ))
  return (
    <>
    <div className='flex flex-col'>
      {bugContent}
    </div>
    </>
  )
}
