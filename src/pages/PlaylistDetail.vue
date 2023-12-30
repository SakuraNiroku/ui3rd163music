<template>
    <div class="detail">
        <div class="detailMsg">
            <img :src="playlistData.img || 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg?param=100y100'" width="100" height="100">
            <p>
                <span style="color: rgb(30, 109, 212);">ID：</span>{{ params.id }}<br>
                <span style="color: rgb(30, 109, 212);">名称：</span>{{ playlistData.name || '加载中' }}<br>
                <button @click="favorite(params.id)">收藏：{{ isFavorite ? '已收藏，★' : '未收藏，✰' }}</button><br>
                <span style="color: rgb(30, 109, 212);">简介：</span><br>{{ playlistData.desc || '加载中' }}
            </p>
        </div>
        <div class="songs">
            <RouterView id="view"></RouterView>
            <table>
                <thead>
                    <th>ID</th>
                    <th>名称</th>
                    <th>歌手</th>
                </thead>
                <tbody v-show="(playlistData.tracks == undefined || playlistData.tracks.length == 0) && loading == false">
                    <tr>
                        <td>无</td>
                        <td>无</td>
                        <td>无</td>
                    </tr>
                </tbody>
                <tbody v-show="loading">
                    <tr>
                        <td>加载中</td>
                        <td>加载中</td>
                        <td>加载中</td>
                    </tr>
                </tbody>
                <tbody v-show="playlistData.tracks != undefined">
                    <tr v-for="item of playlistData.tracks" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td><RouterLink :to="{
                            name:params.favorite == undefined ? 'playlistSearch_detail_songDetail' : 'favoritePlaylistDetailSongDetail',
                            query:{
                                id:item.id,
                                name:item.name,
                                artists:item.artists,
                                status:item.status
                            },
                            params:{
                                favorite:1
                            }
                        }">{{ item.name }}</RouterLink></td>
                        <td>{{ item.artists }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { toRefs, ref, watch } from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true
import { useFavoriteStore } from '@/store/favorite';
let favoriteStore = useFavoriteStore()

let route = useRoute()
let playlistData = ref({})
let { params } = toRefs(route)
let loading = ref(true)
let isFavorite = ref(false)
isFavorite.value = favoriteStore.isFavoritePlaylist(params.value.id)
favoriteStore.$subscribe((mutate,state)=>{
    isFavorite.value = favoriteStore.isFavoritePlaylist(params.value.id)
})
watch(params,(newi)=>{
    isFavorite.value = favoriteStore.isFavoritePlaylist(params.value.id)
})

function favorite(id) {
    if(isFavorite.value){
        favoriteStore.deleteFavoritePlaylist(id)
    }else{
        favoriteStore.favoritePlaylist.unshift(id)
    }
}


watch(params,async (newv)=>{
    try{
        loading.value = true
        playlistData.value = {}
        let result = await axios.get(`https://163api.qxiao.eu.org/playlist/detail?realIP=116.25.146.177&id=${newv.id}`)
        if(result.data.code == 200){
            if(result.data.playlist != undefined){
                let data = {
                    id:result.data.playlist.id,
                    name:result.data.playlist.name,
                    img:result.data.playlist.coverImgUrl+'?param=100y100',
                    desc:result.data.playlist.description,
                    tracks:[]
                }

                for(let track of result.data.playlist.tracks){
                    let artists = ''
                    for(let artist of track.ar){
                        artists += artist.name + ' '
                    }
                    let status = (track.fee == 0 | track.fee == 8) ? 'ok' : 'vip'
                    data.tracks.push({
                        name:track.name,
                        id:track.id,
                        artists,
                        img:track.al.picUrl,
                        status,
                    })
                }
                playlistData.value = data
            }
        }
    }catch(error){
        alert(error)
    }
    loading.value = false
},{deep:true,immediate:true})

</script>

<style scoped>
.detail{
    border: 1px solid black;
    text-align: center;
}
.detailMsg{
    display: flex;
    flex-direction: row;
    align-items: center;
}

.detailMsg *{
    margin: 10px;
}

.songs{

}
</style>