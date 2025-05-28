import React from 'react'
import data from '../../data/bugs.json'
import getUserById from '../../lib/getUserById'
import Answers from './components/Answers'
import NewAnswer from './components/NewAnswer'
type Props = { params : {id : number} }

export default function page({params: {id}} : Props) {
    let title = "title";
    let desc = "desc";
    let userId = 0;
    let username = "uname";
    let bugDatas = data.bugDatas;
    bugDatas.forEach(bug=>{
        if (bug.id == id)
        {
            title = bug.title;
            desc = bug.desc;
            userId = bug.userid;
        }
    })
  return (
    <div className='flex flex-col'>
        <p>Posted by: {getUserById(userId)}</p>
        <p className='text-5xl ml-5 mb-5 mt-5'>{title}</p>
        <hr></hr>
        <pre className='text-3xl p-5'>{desc}</pre>
        <NewAnswer bugId = {id}></NewAnswer>
        <Answers bugId = {id}></Answers>
    </div>
  )
}
