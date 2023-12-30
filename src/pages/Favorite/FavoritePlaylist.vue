<template>
    <div class="favorite">
        <div class="left-content">
            <div class="single" v-for="item of favoritePlaylist" :key="item">
                <img :src="playlistData[item].img" width="100" height="100">
                <p>
                    ID：{{ item }}<br>
                    名称：<RouterLink :to="{
                        name:'favoritePlaylistDetail',
                        params:{
                            id:item,
                            img:playlistData[item].img,
                            name:playlistData[item].name,
                            favorite:1,
                        }
                    }" v-show="!playlistData[item].loading">{{ playlistData[item].name }}</RouterLink>
                    <span v-show="playlistData[item].loading">加载中</span>
                </p>
            </div>
            <div v-show="favoritePlaylist.length == 0" class="noPlaylist">没有歌单！</div>
        </div>
        <div class="right-content">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup>
import { useFavoriteStore } from '@/store/favorite';
let favoriteStore = useFavoriteStore()
import axios from 'axios'
import { storeToRefs } from 'pinia';
let { favoritePlaylist } = storeToRefs(favoriteStore)
import { ref,watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router';
axios.defaults.withCredentials = true

let playlistData = ref({})
async function initData(){
    for(let item of favoritePlaylist.value){
        playlistData.value[item] = {
            id:item,
            name:'加载中',
            img:'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg?param=100y100',
            loading:true,
        }
    }
    
    for(let id of favoritePlaylist.value){
        try{
            let result = await axios.get(`https://163api.qxiao.eu.org/playlist/detail?realIP=116.25.146.177&id=${id}`)
            
            if(result.data.code == 200){
                if(result.data.playlist != null){
                    playlistData.value[id] = {
                        id,
                        name:result.data.playlist.name,
                        img:result.data.playlist.coverImgUrl,
                        loading:false,
                    }
                }
            }
        }catch(error){
            alert(error)
        }
    }
    
}
watch(favoritePlaylist,async ()=>await initData(),{immediate:true,deep:true})


</script>

<style scoped>
.favorite {
    display: flex;
}
.favorite *{
    margin: 10px;
}
.single {
    display: flex;
    align-items: center;
    border: 1px solid green;
    margin-top: 10px;
}
.single *{
    margin: 10px;
}
.noPlaylist {
    padding: 10px;
    font-size: 30px;
    color: red;
}
.Mcontrol {
    padding-left: 50px;
    display: flex;
    flex-direction: column;
}
.right-content {
    width: 70%;
}

.left-content {
    width: 30%;
}

</style>