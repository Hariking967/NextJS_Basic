import React from 'react'
import data from '../data/userinfo.json'

const userDatas = data.users;

export default function getUserIndexById(userId: number) {
    let ind = -1;
    userDatas.forEach((user, index)=>{
        if (user.id == userId)
        {
            ind = index;
        }
    })
    return ind;
}
