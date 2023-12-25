<template>
    <div class="player">
        <img :src="song.img" height="100" width="100">
        <div class="player-msg">
            <p>{{ song.name }} - {{ song.id }}</p>
            <audio id="player-audio" :src="musicURL" controls @canplay="canPlay"></audio>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true
let song = ref({
    id:'2041508286',
    name:'DESTRUCTION 3,2,1',
    img:'https://p1.music.126.net/aUsjC57wDU_LyMK7RreoNA==/109951168562242471.jpg?param=100y100',
    type:'song',
})
let musicURL = ref('')
let autoplay = ref(false)

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
    console.log('@player',song.value)
    autoplay.value = song.value.autoplay
    localStorage.setItem('lastPlay',JSON.stringify(song.value))
}

function canPlay(){
    console.log('@','audio is ready! autoplay mode:',autoplay.value)
    if(autoplay.value){
        document.getElementById('player-audio').play()
    }
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
        let result = await axios.get(`https://163api.qxiao.eu.org/song/url?id=${e.id}&realIP=116.25.146.177`)
        if(result.data.data[0].url == undefined) throw "undefined url"
        result.data.data[0].url = result.data.data[0].url.replace('http','https')
        if(musicURL.value != result.data.data[0].url) musicURL.value = result.data.data[0].url
        else canPlay()
        
    }catch(error){
        alert(error)
    }
},{deep:true})
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