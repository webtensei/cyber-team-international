import {User} from "../types/User";

export{}



// рандомное время от 1 секунды до 10 минут
function generateTime() {
    const min = 1000
    const max = 1000*60*10
    return Math.floor(Math.random() * (max) + 1) -min
}

export const users= Array.from({ length: 2000 },(_,index):User=>({
    color: Math.floor(Math.random() * (3) + 1) -1,
    name:'Vadim Kravtsov',
    speed: Math.floor(Math.random() * (101) + 1) -1,
    time: generateTime()
}))


