import React from 'react'
import { cookies } from 'next/headers';

export default async function getCookie() {
    const cookieStore = await cookies();
    const datac = cookieStore.get('loggedin');
    let loggedin = Number(datac?.value);
    return (loggedin);
}
