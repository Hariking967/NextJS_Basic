import React from 'react'
import data from '../data/bugs.json'
import getUserById from '../lib/getUserById'
type Props = { params : {id : number} }

export default function page({params: {id}} : Props) {
    let title = "title";
    let desc = "desc";
    let userId = 0;
    let username = "uname";
    let bugDatas = data.bugs;
    bugDatas.forEach(bug=>{
        if (bug.id == id)
        {
            title = bug.title;
            desc = bug.desc;
            userId = bug.userid;
        }
    })
    const descContent = desc.split('\n');
    const descElement = descContent.map((line, index)=>(
        <div key={index}>
            <p>{line}</p>
        </div>
        ));
    
  return (
    <div className='flex flex-col'>
        <p>Posted by: {getUserById(userId)}</p>
        <div className='flex flex-row h-20 items-center'>
            <p className='text-5xl mr-10'>{id}</p>
            <p className='text-5xl'>{title}</p>
        </div>
        <hr></hr>
        {descElement}
    </div>
  )
}
