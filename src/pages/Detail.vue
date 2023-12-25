<template>
    <div class="detail">
        <h2>选中歌曲信息</h2>
        <div class="messageBox">
            <img :src="img_src" width="150" height="150">
            <div class="messageText">
                <p>ID：{{ params.id }}<br>
                名称：{{ params.name }}<br>
                歌手：{{ params.artists }}</p><br>
                <button @click="playIT">播放它！</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch, toRefs } from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true
let route = useRoute()
let {params} = toRefs(useRoute())
let img_src = ref('https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg?param=100y100')
let channel = new BroadcastChannel('player-channel')

async function updateImg(){
    try{
        img_src.value = 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg?param=100y100'
        let result = await axios.get(`https://163api.qxiao.eu.org/song/detail?ids=${route.params.id}&realIP=116.25.146.177`)
        if(result.data.code == 200){
            let song = result.data.songs[0]
            img_src.value = song.al.picUrl+'?param=100y100'
        }
    }catch(error){
        alert(error)
    }
}

function playIT(){
    channel.postMessage({
        id:route.params.id,
        name:route.params.name,
        img:img_src.value,
        type:'song',
        autoplay:true
    })
}

watch(params,()=>{
    updateImg()
},{deep:true,immediate:true})


</script>
<style>
.messageBox{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
}
.messageText{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>