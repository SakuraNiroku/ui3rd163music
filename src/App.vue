<template>
    <div class="app">
        <div class="header">
          <img src="/favicon.ico">
          <p class="title">Vue 3rd 163 Music</p>
          <!-- 导航区 -->
          <div class="navigate">
              <RouterLink :to="{name:'home'}" active-class="active">主页</RouterLink>
              <RouterLink :to="{name:'songSearch'}" active-class="active">搜索-歌曲</RouterLink>
              <RouterLink :to="{name:'playlist'}" active-class="active">歌单</RouterLink>
          </div>
        </div>
        <!-- 展示区 -->
        <div class="main-content">
            <RouterView></RouterView>
        </div>
        <!-- 播放器 -->
        <div class="player-content">
          <button @click="showPlayer" style="position: fixed; bottom: 0; right: 0;">{{ playerShow ? '↓' : '↑' }}</button>
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

<style scoped>
  * {
    margin: 5px;
  }
  .title {
    font-size: 25px;
  }
  .navigate {
    display: flex;
    justify-content: space-around;
  }
  .navigate a {
    display: block;
    text-align: center;
    width: 150px;
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
  .header {
    display: flex;
    align-items: center;
  }
  .main-content {
    margin: 0 auto;
    margin-top: 30px;
    width: 90%;
  }
  .player-content{
    position: fixed;
    bottom: 0;
    right: 0;
    opacity: 0.85;
  }
</style>
