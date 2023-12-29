<template>
    <div class="detail">
        <h2>选中歌曲信息</h2>
        <div class="messageBox">
            <img :src="img_src" width="150" height="150">
            <div class="messageText">
                <p>ID：{{ query.id }}<br>
                名称：{{ query.name }}<br>
                歌手：{{ query.artists }}<br>
                音乐情况：{{ query.status }}
            </p><br>
                <button @click="playIT" :disabled="query.status != 'ok'">播放它！</button>
                <button @click="favoriteSong">收藏：{{ isFavoriteSong ? '已收藏，★' : '未收藏，✰' }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch, toRefs, onUnmounted } from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true
import { useFavoriteStore } from '@/store/favorite';
let favoriteStore = useFavoriteStore()

let route = useRoute()
let {query} = toRefs(route)
let img_src = ref('https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg?param=100y100')
let channel = new BroadcastChannel('player-channel')

let isFavoriteSong = ref(false)
isFavoriteSong.value = favoriteStore.isFavoriteSong(query.value.id)
favoriteStore.$subscribe((mutate,state)=>{
    isFavoriteSong.value = favoriteStore.isFavoriteSong(query.value.id)
})
watch(query,(newi)=>{
    isFavoriteSong.value = favoriteStore.isFavoriteSong(newi.id)
})

function favoriteSong(){
    if(isFavoriteSong.value){
        favoriteStore.deleteFavoriteSong(query.value.id)
    }else{
        favoriteStore.favoriteSongs.unshift({
            name:query.value.name,
            artists:query.value.artists,
            id:query.value.id,
            img:img_src.value,
        })
    }
}

async function updateImg(){
    try{
        img_src.value = 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg?param=100y100'
        let result = await axios.get(`https://163api.qxiao.eu.org/song/detail?ids=${route.query.id}&realIP=116.25.146.177`)
        if(result.data.code == 200){
            let song = result.data.songs[0]
            img_src.value = song.al.picUrl+'?param=100y100'
        }
    }catch(error){
        alert(error)
    }
}

function playIT(){
    console.log('#','playIT')
    channel.postMessage({
        id:route.query.id,
        name:route.query.name,
        img:img_src.value,
        type:'song',
        autoplay:true
    })
}

watch(query,()=>{
    updateImg()
},{deep:true,immediate:true})

onUnmounted(()=>{
    channel.close()
})


</script>
<style scoped>
* {
    margin: 5px;
}
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