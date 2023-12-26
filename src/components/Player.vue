<template>
    <div class="player">
        <img :src="img" height="100" width="100">
        <div class="player-msg">
            <p>{{ name }} - {{ id }}</p>
            <audio id="player-audio" :src="url" controls @canplay="canPlay" loop></audio>
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
let { img, url, id, name, type, autoplay } = storeToRefs(playerStore)

onMounted(()=>{
    console.log('@@@@',playerStore)
    autoplay.value = false
    console.log(autoplay)
})

let channel = new BroadcastChannel('player-channel')
channel.onmessage = function(e){
    let data = e.data
    playerStore.replacePlay(data)
    let Aurl = `https://music.163.com/song/media/outer/url?id=${id.value}.mp3`
    url.value = Aurl
    console.log('@player',playerStore)
}

function canPlay(){
    console.log('@','audio is ready! autoplay mode:',autoplay.value)
    if(autoplay.value){
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