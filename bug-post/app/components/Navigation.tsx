import React from 'react'
import { cookies } from 'next/headers'
import data from '../data/userinfo.json'
import Link from 'next/link'
import Logout from './Logout'

export default async function Navigation() {
    const cookieStore = await cookies()
    const datac = cookieStore.get('loggedin');
    let loggedin: number|undefined = -1
    if (datac == undefined)
    {
        loggedin = undefined
    }
    else
    {
        loggedin = Number(datac?.value);
    }
    console.log(loggedin);
    const logElement = ()=>{
        if (loggedin == undefined || loggedin == -1)
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
            let username = 'null';
            userDatas.forEach(user=>{
                if (user.id == loggedin)
                {
                    username = user.userName;
                }
            })
            return(
                <div className="flex items-center space-x-4 bg-gray-800 p-3 rounded-md">
                <p className="text-white text-lg font-semibold">{username}</p>
                <Logout></Logout>
                </div>
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