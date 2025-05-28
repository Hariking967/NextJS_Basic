import React from 'react'
import data from '../data/bugs.json'
import Link from 'next/link';
import getUserById from '../lib/getUserById';

export default function BugPage() {
    let bugDatas = data.bugDatas;
    let bugContent = bugDatas.map(bug=>(
        <Link key={bug.id} href= {`/bug/${bug.id}`}>
            <div className='flex flex-row'>
                <p>{bug.answered} answered</p>
                <div className='flex flex-col items-start md:items-center justify-between gap-4 p-4 m-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all shadow-md cursor-pointer'>
                    <p className='text-3xl m-3 truncate'>{bug.title}</p>
                    <p className='text-3xl m-3'>{bug.desc}</p>
                    <p className='text-3xl m-3'>{getUserById(bug.userid)}</p>
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
