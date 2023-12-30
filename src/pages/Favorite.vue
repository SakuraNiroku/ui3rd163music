<template>
    <div class="favorite">
        <div>
            <RouterLink :to="{name:'favoriteSongs'}" active-class="active">歌曲</RouterLink>
            <RouterLink :to="{name:'favoritePlaylist'}" active-class="active">歌单</RouterLink>
        </div>
        <RouterView class="rview"></RouterView>
    </div>
</template>

<script setup>
import { RouterView,RouterLink } from 'vue-router'
</script>

<style scoped>
.favorite a{
    text-align: center;
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    color: green;
    font-size: 18px;
    margin: 10px;
}

.favorite a.active{
    border-width: 0 0 5px 0;
    border-color: green;
    border-style: solid;
    font-weight: 900;
}
</style>