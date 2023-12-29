import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite',{
    state(){
        return {
            favoriteSongs:[],
            favoritePlaylist:[],
            favoriteVoice:[],
            favoriteVoices:[],
        }
    },
    persist:true,
    actions:{
        isFavoriteSong(id){
            let arr = this.favoriteSongs.filter(function(item){
                return item.id == id
            })
            return arr.length == 1
        },
        deleteFavoriteSong(id){
            this.favoriteSongs = this.favoriteSongs.filter(function(item){
                return item.id != id
            })
        },
        getFavoriteSong(id){
            return this.favoriteSongs.filter(function(item){
                return item.id == id
            })[0] || false
        }
    }
})