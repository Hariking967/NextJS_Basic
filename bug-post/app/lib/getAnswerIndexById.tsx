import React from 'react'
import data from '../../app/data/answers.json'

const answers = data.answers

export default function getAnswerIndexById(id:number) {
    let ind = -1;
    answers.forEach((answer, index)=>{
        if (answer.id == id)
        {
            ind = index
        }
    })
    return ind;
}
