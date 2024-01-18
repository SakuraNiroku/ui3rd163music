<template>
    <div class="home">
        3rd 163 Music of Vue<br>
        By CatVer.<br>
        <RouterLink :to="{
            name:'playlistSearch_detail',
            params:{
                img:'q',
                detail:'d',
                name:'n',
                id:'5000665889'
            },
        }">qwq</RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
* {
    margin: 5px;
}
.home{
    padding: 20px;
    margin: 10px;
}
</style>