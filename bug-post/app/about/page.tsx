import React from 'react'

export default function page() {
  return (
    <div className='bg-gray-900 min-h-screen text-white px-8 py-12 font-sans'>
      <h1 className='text-5xl font-bold text-green-400 mb-8 text-center'>Stack Overflow</h1>

      <h2 className='text-3xl font-semibold text-blue-300 mb-4'>About Us</h2>
      <p className='text-gray-300 text-lg leading-8 mb-6'>
        Welcome to Stack Overflow, a community-driven Q&A platform built by and for programmers.
        <br/>
        Our goal is simple: to help coders solve problems, learn from each other, and grow in their craft. Whether you're just starting out or you're an experienced developer, this platform is designed to give you a space to ask questions, share knowledge, and connect with other tech enthusiasts.
        <br/>
        Inspired by the incredible impact Stack Overflow has had since its launch in 2008, [Your Site Name] aims to bring that same spirit of collaboration and support to a new generation of developers. We believe that when programmers share what they know, the entire tech community benefits.
        <br/>
      </p>
      <hr className='border-blue-800 mb-8'/>

      <h2 className='text-3xl font-semibold text-blue-300 mb-4'>Why We Built This</h2>
      <p className='text-gray-300 text-lg leading-8 mb-6'>
        Every coder knows the feeling: you're stuck on a bug, the docs don’t make sense, and time is running out. In those moments, having access to a helpful answer from someone who’s been there before can make all the difference.
        <br/>
        This platform exists to provide that support — a place where programmers can find answers, share tips, and earn recognition for their contributions. With features like voting, tagging, reputation points, and trusted moderation, we ensure the best content rises to the top and stays easy to find.
        <br/>
      </p>
      <hr className='border-blue-800 mb-8'/>

      <h2 className='text-3xl font-semibold text-blue-300 mb-4'>Our Mission</h2>
      <p className='text-gray-300 text-lg leading-8 mb-6'>
        To create a respectful, knowledge-rich space where coders can ask clear questions and receive accurate, concise answers — fast. We want to foster a community that values learning, curiosity, and mutual growth.
        <br/>
      </p>
      <hr className='border-blue-800'/>
    </div>
  )
}