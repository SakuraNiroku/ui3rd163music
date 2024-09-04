<template>
    <div class="player">
        <img :src="runningdata.cover" height="100" width="100">
        <div class="player-msg">
            <p>{{ runningdata.name }} - {{ play.id }}</p>
            <audio id="player-audio" :src="runningdata.url" controls @canplay="canPlay" loop></audio>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, toRefs, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'
axios.defaults.withCredentials = true
import { usePlayerStore } from '@/store/player'
import musicparsec from '@/musicparsec';
let playerStore = usePlayerStore()
let { play } = storeToRefs(playerStore)

let runningdata = ref(musicparsec(play.value.id))
musicparsec(play.value.id).then((a)=>{runningdata.value = a})


onMounted(()=>{
    play.value.autoplay = false
})

let channel = new BroadcastChannel('player-channel')
channel.onmessage = async function(e){
    let data = e.data
    if(data.id != play.value.id) {
        playerStore.replacePlay(data)
    }
    else {
        if(data.autoplay){
            play.value.autoplay = true
        }
        canPlay()
    }
    console.log('@player',data)
    runningdata.value = await musicparsec(play.value.id)
    // Object.assign(runningdata,musicparsec(play.value.id))
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