import React from 'react'
import Link from 'next/link'
import Search from './Search'

export default function Navbar() {
  return (
    <div className='flex h-15 w-full bg-gray-800 items-center justify-between'>
      <h2 className='text-3xl'>
        <Link href="/">WikiRocket</Link>
      </h2>
      <Search></Search>
    </div>
  )
}
