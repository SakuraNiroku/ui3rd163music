<template>
    <div class="songSearch">
        <div class="left-content">
            <form @submit.prevent="searchFunc(1)">
            <input type="text" v-model="searchText" class="input">
            <button type="submit" class="songSearch">搜索</button>
            </form>
            <table class="table">
                <thead>
                    <th>封面</th>
                    <th>ID</th>
                    <th>名称</th>
                </thead>
                <tbody>
                    <tr v-for="item of searchResult" :key="item.id">
                        <td><img :src="item.img" width="50" height="50"></td>
                        <td>{{ item.id }}</td>
                        <td>
                            <RouterLink :to="{
                                name:'playlistSearch_detail',
                                params:{
                                    id:item.id,
                                    name:item.name,
                                    img:item.img,
                                }
                            }
                        ">{{ item.name }}</RouterLink>
                        </td>
                    </tr>
                    <tr v-show="searchResult.length == 0">
                        <td>无</td>
                        <td>无</td>
                        <td>无</td>
                    </tr>
                </tbody>
            </table>
            <p>
                <button @click="changePage(-1)" :disabled="!canChangePage">←</button>
                当前位于第{{ page }}页
                <button @click="changePage(+1)" :disabled="!canChangePage">→</button>
            </p>
        </div>
        <div class="right-content">
            <RouterView></RouterView>
        </div>
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
        let result = await axios.get('https://163api.qxiao.eu.org/search?limit=10&type=1000&realIP=116.25.146.177&keywords='+searchText.value+'&offset='+(page.value-1)*10)
        searchResult.value = []
        if(result.data.code == 200){
            if(result.data.result.playlists != undefined){
                for(let plist of result.data.result.playlists){
                    searchResult.value.push({
                        id:plist.id,
                        img:`${plist.coverImgUrl}?param=100y100`,
                        name:plist.name,
                        desc:plist.description,
                    })
                }
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

<style scoped>
* {
    margin: 5px;
}
div.songSearch{
    display: flex;
    text-align: center;
}

button.songSearch{
    border: none;
    background-color: #4CAF50;
    font-size: 25px;
    color: white;
    border-radius: 10px;
}

.input{
    font-size: 20px;
}

.table{
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    border: 1px solid black;
}

.left-content {
    width: 40%;
}

.right-content {
    width: 60%;
}

</style>