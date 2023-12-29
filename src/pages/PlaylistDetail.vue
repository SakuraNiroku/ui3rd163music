<template>
    <div class="detail">
        <div class="detailMsg">
            <img :src="params.img" width="100" height="100">
            <p>
                <span style="color: rgb(30, 109, 212);">ID：</span>{{ params.id }}<br>
                <span style="color: rgb(30, 109, 212);">名称：</span>{{ params.name }}<br>
                <span style="color: rgb(30, 109, 212);">简介：</span><br>{{ playlistData.desc }}
            </p>
        </div>
        <div class="songs">
            <RouterView id="view"></RouterView>
            <tbody v-if="playlistData.tracks == undefined || playlistData.tracks.length == 0">
                <td>无</td>
                <td>无</td>
                <td>无</td>
            </tbody>
            <tbody v-else>
                <tr v-for="item of playlistData.tracks" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td><RouterLink :to="{
                        name:'playlistSearch_detail_songDetail',
                        query:{
                            id:item.id,
                            name:item.name,
                            artists:item.artists,
                            status:item.status
                        }
                    }">{{ item.name }}</RouterLink></td>
                    <td>{{ item.artists }}</td>
                </tr>
            </tbody>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { toRefs, ref, watch } from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true

let route = useRoute()
let playlistData = ref({})
let { params } = toRefs(route)

watch(params,async (newv)=>{
    try{
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
},{deep:true,immediate:true})

</script>

<style scoped>
.detail{
    border: 1px solid black;
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