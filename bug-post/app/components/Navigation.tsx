import React from 'react'
import { cookies } from 'next/headers'
import { promises as fs } from 'fs'
import path from 'path'
import data from '../data/userinfo.json'
import Link from 'next/link'

export default async function Navigation() {
    const cookieStore = await cookies()
    const loggedin = cookieStore.get('loggedin') as undefined|number
    const logElement = ()=>{
        if (loggedin == undefined)
        {
            return(
                <div>
                    <Link href='/signup' className='bg-blue-400 font-mono m-2 p-2'>Sign UP</Link>
                    <Link href='/signin' className='bg-green-600 font-mono m-2 p-2'>Sign IN</Link>
                </div>
            );
        }
        else{
            const userDatas = data.users;
            let username = null
            userDatas.forEach(user=>{
                if (user.id == loggedin)
                {
                    username = user.userName;
                }
            })
            return(
                <p>{username}</p>
            );
        }
    }
  return (
    <div className='bg-blue-500 flex flex-row justify-between items-center h-20'>
        <div className='flex flex-row items-center'>
            <h2 className='text-4xl font-mono mr-7 ml-3'>Stack Overflow</h2>
            <Link href="/" className="text-2xl m-1.5 text-white">Home |</Link>
            <Link href="/about" className="text-2xl m-1.5 text-white">About |</Link>
            <Link href="/help" className="text-2xl m-1.5 text-white">Help |</Link>
        </div>
      {logElement()}
    </div>
  )
}