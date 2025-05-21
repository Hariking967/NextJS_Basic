import React from 'react'

export default async function getAllUsers(): Promise<User[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok)
    {
        throw new Error('failed to fetch data');
    }
    return response.json();
}
