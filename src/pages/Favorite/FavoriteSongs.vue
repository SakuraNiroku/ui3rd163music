<template>
    <div class="favorite">
        <!-- <p v-for="item of favoriteStore.favoriteSongs">{{ item }}</p> -->
        <div class="single" v-for="item of favoriteStore.favoriteSongs" :key="item.id">
            <img :src="item.img" width="100" height="100">
            <p>
                ID：{{ item.id }}<br>
                名称：{{ item.name }}<br>
                歌手：{{ item.artists }}
            </p>
            <div class="Mcontrol">
                <button @click="playIT(item.id)">播放它！</button>
                <button @click="cancelFavorite(item.id)">取消收藏</button>
            </div>
        </div>
        <div v-show="favoriteStore.favoriteSongs.length == 0" class="noSongs">没有歌曲！</div>
    </div>
</template>

<script setup>
import { useFavoriteStore } from '@/store/favorite';
import { onUnmounted } from 'vue';
let favoriteStore = useFavoriteStore()
let channel = new BroadcastChannel('player-channel')

function cancelFavorite(id){
    favoriteStore.deleteFavoriteSong(id)
}
function playIT(id){
    let data = favoriteStore.getFavoriteSong(id)
    if(data == false) return
    channel.postMessage({
        id:data.id,
        name:data.name,
        img:data.img,
        autoplay:true,
        type:'song'
    })
}

onUnmounted(()=>channel.close())

</script>

<style scoped>
.single {
    display: flex;
    align-items: center;
    border: 1px solid green;
    margin-top: 10px;
}
.single *{
    margin: 10px;
}
.noSongs {
    padding: 10px;
    font-size: 30px;
    color: red;
}
.Mcontrol {
    padding-left: 50px;
    display: flex;
    flex-direction: column;
}

</style>