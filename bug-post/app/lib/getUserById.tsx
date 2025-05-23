import React from 'react'
import data from '../data/userinfo.json'

export default function getUserById(id:number) {
    const userDatas = data.users;
    let username = null
    userDatas.forEach(user=>{
    if (user.id == id)
    {
        username = user.userName;
    }
    })
    return(username);
}
