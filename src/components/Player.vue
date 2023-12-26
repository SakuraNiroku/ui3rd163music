<template>
    <div class="player">
        <img :src="playerStore.play.img" height="100" width="100">
        <div class="player-msg">
            <p>{{ playerStore.play.name }} - {{ playerStore.play.id }}</p>
            <audio id="player-audio" :src="playerStore.play.url" controls @canplay="canPlay" loop></audio>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true
import { usePlayerStore } from '@/store/player'

let playerStore = usePlayerStore()
console.log('@@@@',playerStore)
playerStore.play.autoplay = false

let channel = new BroadcastChannel('player-channel')
channel.onmessage = async function(e){
    let data = e.data
    playerStore.play = {
        id:data.id,
        name:data.name,
        img:data.img,
        type:data.type,
        autoplay:data.autoplay
    }
    try{
        let result = await axios.get(`https://163api.qxiao.eu.org/song/url?id=${playerStore.play.id}&realIP=116.25.146.177`)
        if(result.data.data[0].url == undefined) throw "undefined url"
        result.data.data[0].url = result.data.data[0].url.replace('http','https')
        if(playerStore.play.url != result.data.data[0].url) playerStore.play.url = result.data.data[0].url
        else canPlay()
        
    }catch(error){
        alert(error)
    }
    console.log('@player',playerStore.play)
}

function canPlay(){
    console.log('@','audio is ready! autoplay mode:',playerStore.play.autoplay)
    if(playerStore.play.autoplay){
        document.getElementById('player-audio').play()
    }
}
</script>

<style>
.player{
    display: flex;
    width: 100%;
    align-items: center;
    background-color: cadetblue;
}
.player-msg{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}
.bar{
    width: 100%;
    display: flex;
    align-items: center;
}
.player-control{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: inherit;
}
</style>