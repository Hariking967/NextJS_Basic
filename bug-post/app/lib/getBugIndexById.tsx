import React from 'react'
import data from '../data/bugs.json'

const bugDatas = data.bugDatas;

export default function getBugIndexById(bugId: number) {
    let ind = -1;
    bugDatas.forEach((bug, index)=>{
        if (bug.id == bugId)
        {
            ind = index;
        }
    })
    return ind;
}
