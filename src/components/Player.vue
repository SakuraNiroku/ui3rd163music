<template>
    <div class="player">
        <img :src="song.img" height="100" width="100">
        <div class="player-msg">
            <audio id="player-audio" @canplay="canPlay" :src="musicURL" @timeupdate="updateSpan" @ended="playEnd"></audio>
            <p>{{ song.name }} - {{ song.id }}</p>
            <div class="bar">
                <meter min="0" max="100" :value="playTimeJINDU" style="width: 100%;"></meter>
                <p>{{ span }}</p>
            </div>
            <div class="player-control">
                <button @click="playORstop" :disabled="!iscanplay">{{ !isPlay ? '播放' : '停止' }}</button>
                <button @click="reloadPlay" :disabled="!iscanplay">重头开始</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
let song = ref({
    id:'2041508286',
    name:'DESTRUCTION 3,2,1',
    img:'https://p1.music.126.net/aUsjC57wDU_LyMK7RreoNA==/109951168562242471.jpg?param=100y100',
    type:'song',
})
let playTimeJINDU = ref(-1)
let musicURL = ref('')
let isPlay = ref(false)
let iscanplay = ref(false)
let span = ref('??:??/??:??')

function playORstop(){
    if(document.getElementById('player-audio').paused){
        document.getElementById('player-audio').play()
        isPlay.value = true
    }else{
        document.getElementById('player-audio').pause()
        isPlay.value = false
    }
}

function canPlay(){
    iscanplay.value = true
    console.log(document.getElementById('player-audio').duration)
    span.value = '00:00/'+formateTime(document.getElementById('player-audio').duration)
    if(song.value.autoplay){
        playORstop()
        if(!isPlay.value) playORstop()
    }
}

function updateSpan(){
    let duration = document.getElementById('player-audio').duration
    let currentTime = document.getElementById('player-audio').currentTime
    if(Object.is(duration,NaN)) return
    console.log('@@',currentTime / duration)
    playTimeJINDU.value = (currentTime / duration) * 100
    span.value = formateTime(currentTime) + '/' + formateTime(duration)
}

function playEnd(){
    playTimeJINDU.value = -1
    document.getElementById('player-audio').currentTime = 0
    document.getElementById('player-audio').play()
}

function reloadPlay(){
    playTimeJINDU.value = -1
    document.getElementById('player-audio').currentTime = 0
    document.getElementById('player-audio').play()
}

function formateTime(time) {
      const h = parseInt(time / 3600)
      const minute = parseInt(time / 60 % 60)
      const second = Math.ceil(time % 60)    
 
      const hours = h < 10 ? '0' + h : h
      const formatSecond = second > 59 ? 59 : second
      return `${hours > 0 ? `${hours}:` : ''}${minute < 10 ? '0' + minute : minute}:${formatSecond < 10 ? '0' + formatSecond : formatSecond}`
}

let channel = new BroadcastChannel('player-channel')
channel.onmessage = function(e){
    let data = e.data
    song.value = {
        id:data.id,
        name:data.name,
        img:data.img,
        type:data.type,
        autoplay:data.autoplay
    }
    localStorage.setItem('lastPlay',JSON.stringify(song.value))
}

onMounted(()=>{
    if(localStorage.getItem('lastPlay') != undefined){
        let d = JSON.parse(localStorage.getItem('lastPlay'))
        d.autoplay = false
        song.value = d
        console.log('@@@','auto save load!')
    }
})

watch(song,async function(e){
    console.log('@','watch!')
    try{
        iscanplay.value = false
        let result = await axios.get(`https://163api.qxiao.eu.org/song/url?id=${e.id}`)
        if(result.data.data[0].url == undefined) throw "undefined url"
        musicURL.value = result.data.data[0].url
    }catch(error){
        alert(error)
    }
},{deep:true,immediate:true})
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