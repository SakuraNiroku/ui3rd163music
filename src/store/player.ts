import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player',{
    state(){
        return {
            play:{
                id:'2041508286',
                type:'song',
                autoplay:false,
            }
        }
    },
    persist:true,
    actions:{
        async replacePlay(data){
            this.play = {
                id:data.id,
                type:data.type,
                autoplay:data.autoplay,
            }
        }
    },
})