import React from 'react'

export default async function getUserPost(userId:string) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {next:{revalidate:60}});
    if (!response.ok)
    {
        throw new Error('failed to fetch data');
    }
    return response.json();
}
