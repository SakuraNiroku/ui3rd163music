<template>
    <div class="search">
        <RouterView></RouterView>
        <form @submit.prevent="searchFunc(1)">
            <input type="text" v-model="searchText">
            <button type="submit" class="search">搜索</button>
        </form>
        <table>
            <thead>
                <th>ID</th>
                <th>名称</th>
                <th>歌手</th>
            </thead>
            <tbody v-if="searchResult.length == 0">
                <td>无</td>
                <td>无</td>
                <td>无</td>
            </tbody>
            <tbody v-else>
                <tr v-for="(item,index) of searchResult" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td><RouterLink :to="{
                        name:'song_detail',
                        params:{
                            id:item.id,
                            name:item.name,
                            artists:item.artists,
                        }
                    }">{{ item.name }}</RouterLink></td>
                    <td>{{ item.artists }}</td>
                </tr>
            </tbody>
        </table>
        <p>
            <button @click="changePage(-1)" :disabled="!canChangePage">&lt;-</button>
            当前位于第{{ page }}页
            <button @click="changePage(+1)" :disabled="!canChangePage">-></button>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import axios from 'axios'
axios.defaults.withCredentials = true

let searchText = ref('')
let searchResult = ref([])
let page = ref(1)
let canChangePage = ref(true)

async function searchFunc(p){
    page.value = p
    try{
        canChangePage.value = false
        let result = await axios.get('https://163api.qxiao.eu.org/search?limit=10&realIP=116.25.146.177&keywords='+searchText.value+'&offset='+(page.value-1)*10)
        searchResult.value = []
        if(result.data.code == 200){
            if(result.data.result.songs != undefined){
                result.data.result.songs.forEach((item,index)=>{
                    let artists = ''
                    item.artists.forEach((artist,index)=>{
                        artists += artist.name + ' '
                    })

                    searchResult.value.push({
                        id:item.id,
                        name:item.name,
                        artists:artists
                    })
                })
            }
        }
        canChangePage.value = true
    }catch(error){
        canChangePage.value = true
        alert(error)
    }
}

function changePage(n){
    if(n == 1){
        if(searchResult.value.length == 10) page.value++
        else return
    }else{
        if(page.value != 1) page.value--
        else return
    }
    searchFunc(page.value)
}
</script>

<style>
div.search{
    text-align: center;  
}

*{
    margin: 10px;
}

button.search{
    border: none;
    background-color: #4CAF50;
    font-size: 25px;
    color: white;
    border-radius: 10px;
}

input{
    font-size: 20px;
}

table{
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    border: 1px solid black;
}

</style>