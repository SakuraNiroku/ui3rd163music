<template>
    <div class="app">
        <h2 class="title">Vue 3rd 163 Music</h2>
        <!-- 导航区 -->
        <div class="navigate">
            <RouterLink :to="{name:'home'}" active-class="active">主页</RouterLink>
            <RouterLink :to="{name:'search'}" active-class="active">搜索</RouterLink>
            <RouterLink :to="{name:'playlist'}" active-class="active">歌单</RouterLink>
        </div>
        <!-- 展示区 -->
        <div class="main-content">
            <RouterView></RouterView>
        </div>
        <!-- 播放器 -->
        <div class="player-content">
          <button @click="showPlayer">{{ playerShow ? '↓' : '↑' }}</button>
          <Player v-show="playerShow"></Player>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView,RouterLink } from 'vue-router'
import Player from '@/components/Player.vue'

let playerShow = ref(false)

function showPlayer(){
  if(playerShow.value){
    playerShow.value = false
  }else{
    playerShow.value = true
  }
}
</script>

<style>
    /* App */
  .title {
    text-align: center;
    word-spacing: 5px;
    margin: 30px 0;
    height: 70px;
    line-height: 70px;
    background-image: linear-gradient(45deg, gray, white);
    border-radius: 10px;
    box-shadow: 0 0 2px;
    font-size: 30px;
  }
  .navigate {
    display: flex;
    justify-content: space-around;
    margin: 0 100px;
  }
  .navigate a {
    display: block;
    text-align: center;
    width: 90px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    background-color: gray;
    text-decoration: none;
    color: white;
    font-size: 18px;
    letter-spacing: 5px;
  }
  .navigate a.active {
    background-color: #64967E;
    color: #ffc268;
    font-weight: 900;
    text-shadow: 0 0 1px black;
    font-family: 微软雅黑;
  }
  .main-content {
    margin: 0 auto;
    margin-top: 30px;
    /* border-radius: 10px; */
    width: 90%;
    /* height: 400px;
    border: 1px solid; */
  }
  .player-content{
    position: fixed;
    bottom: 0;
    right: 0;
  }
</style>
