<template>
    <div class="player">
        <img :src="play.img" height="100" width="100">
        <div class="player-msg">
            <p>{{ play.name }} - {{ play.id }}</p>
            <audio id="player-audio" :src="play.url" controls @canplay="canPlay" loop></audio>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'
axios.defaults.withCredentials = true
import { usePlayerStore } from '@/store/player'

let playerStore = usePlayerStore()
let { play } = storeToRefs(playerStore)

onMounted(()=>{
    play.value.autoplay = false
})

let channel = new BroadcastChannel('player-channel')
channel.onmessage = function(e){
    let data = e.data
    let Aurl = `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`
    if(Aurl != play.value.url) {
        data.url = Aurl
        playerStore.replacePlay(data)
    }
    else {
        if(data.autoplay){
            play.value.autoplay = true
        }
        canPlay()
    }
    console.log('@player',data)
}

function canPlay(){
    console.log('@','audio is ready! autoplay mode:',play.value.autoplay)
    if(play.value.autoplay){
        document.getElementById('player-audio').play()
    }
}

onUnmounted(()=>{
    channel.close()
})
</script>

<style scoped>
* {
    margin: 5px;
}
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