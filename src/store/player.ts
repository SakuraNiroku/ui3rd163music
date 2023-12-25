import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player',{
    state(){
        return {
            play:{
                id:'2041508286',
                name:'DESTRUCTION 3,2,1',
                img:'https://p1.music.126.net/aUsjC57wDU_LyMK7RreoNA==/109951168562242471.jpg?param=100y100',
                type:'song',
                autoplay:false,
                url:'https://m701.music.126.net/20231225223909/960d3a2cf54495413e5f993c518342c5/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/27047943903/2ebc/dffc/5299/d525325be6850488602f9676876c727d.mp3'
            }
        }
    },
    persist:true,
})