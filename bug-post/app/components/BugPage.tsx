import React from 'react'
import data from '../data/bugs.json'
import Link from 'next/link';

export default function BugPage() {
    let bugDatas = data.bugs;
    let bugContent = bugDatas.map(bug=>(
        <Link key={bug.id} href= {`/bug/${bug.id}`}>
            <div className='flex flex-row'>
                <p className='text-3xl m-3'>{bug.id}</p>
                <p className='text-3xl m-3'>{bug.title}</p>
                <p className='text-3xl m-3'>{bug.answered}</p>
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
