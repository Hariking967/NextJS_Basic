import React from 'react'
import getUser from '@/lib/getUser'
import getUserPost from '@/lib/getUserPost'
import { Suspense } from 'react'
import UserPosts from './components/userPosts'
import type { Metadata } from 'next'
import getAllUsers from '@/lib/getAllUsers'

export async function generateMetadata({
  params: { userId },
}: {
  params: { userId: string }
}): Promise<Metadata> {
  const user = await getUser(userId)
  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  }
}

export default async function UserPage({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const userData = getUser(userId)
  const userPostData = getUserPost(userId)

  const user = await userData

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UserPosts promise={userPostData} />
      </Suspense>
    </>
  )
}

export async function generateStaticParams() {
  const users = await getAllUsers()
  return users.map(user => ({
    userId: user.id.toString(),
  }))
}
