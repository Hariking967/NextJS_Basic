type userType = {
    id : number,
    userName : string,
    email : string,
    pwd : string
}

type BugType = {
    id : number,
    title: string,
    desc: string,
    userid: number,
    answered: number,
    time: string
}

type answerType = {
    id: number,
    fromUserId: number,
    bugId: number,
    answer: string  
}