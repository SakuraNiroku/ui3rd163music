<template>
    <div class="app">
        <div class="header">
          <img src="/favicon.ico">
          <p class="title">Vue 3rd 163 Music</p>
          <!-- 导航区 -->
          <div class="navigate">
              <RouterLink :to="{name:'home'}" active-class="active">主页</RouterLink>
              <RouterLink :to="{name:'search'}" active-class="active">搜索</RouterLink>
              <RouterLink :to="{name:'favorite'}" active-class="active">收藏</RouterLink>
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
    text-align: center;
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    color: green;
    font-size: 18px;
  }
  .navigate a.active {
    border-width: 0 0 5px 0;
    border-color: green;
    border-style: solid;
    font-weight: 900;
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
