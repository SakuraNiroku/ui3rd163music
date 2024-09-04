import axios from "axios";
export default async function musicparsec(id:number){
    let axios_ins = axios.create({
        withCredentials: false
    })
    let result = await axios_ins.get(`https://api.xingzhige.com/API/NetEase_CloudMusic_new/?songid=${id}`)
    return {
        'url':result.data.data.src,
        'cover':result.data.data.cover,
        'name':result.data.data.songname
    }
}