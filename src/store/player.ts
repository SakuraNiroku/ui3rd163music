import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player',{
    state(){
        return {
            id:'2041508286',
            name:'DESTRUCTION 3,2,1',
            img:'https://p1.music.126.net/aUsjC57wDU_LyMK7RreoNA==/109951168562242471.jpg?param=100y100',
            type:'song',
            autoplay:false,
            url:'https://music.163.com/song/media/outer/url?id=2041508286.mp3'
        }
    },
    persist:true,
    actions:{
        async replacePlay(data){
            this.$patch({
                id:data.id,
                name:data.name,
                img:data.img,
                type:data.type,
                autoplay:data.autoplay,
                url:data.url
            })
        }
    },
})