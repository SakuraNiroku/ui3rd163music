import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import SongSearch from '@/pages/SongSearch.vue'
import Favorite from '@/pages/Favorite.vue'
import SongDetail from '@/pages/SongDetail.vue'
import PlayListSearch from '@/pages/PlayListSearch.vue'
import Search from '@/pages/Search.vue'
import FavoriteSongs from '@/pages/Favorite/FavoriteSongs.vue'
import PlaylistDetail from '@/pages/PlaylistDetail.vue'
import FavoritePlaylistVue from '@/pages/Favorite/FavoritePlaylist.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            name:'home',
            path:'/home',
            component:Home
        },
        {
            path:'/search',
            name:'search',
            component:Search,
            redirect:'/search/song',
            children:[
                {
                    path:'song',
                    name:'songSearch',
                    component:SongSearch,
                    children:[
                        {
                            name:'songSearch_detail',
                            path:'detail',
                            component:SongDetail
                        },
                    ]
                },
                {
                    path:'playlist',
                    name:'playlistSearch',
                    component:PlayListSearch,
                    children:[
                        {
                            name:'playlistSearch_detail',
                            path:'detail/:id/:name/:img/:favorite?',
                            component:PlaylistDetail,
                            children:[
                                {
                                    name:'playlistSearch_detail_songDetail',
                                    path:'song',
                                    component:SongDetail,
                                },
                            ],
                        },
                    ]
                },
            ]
        },
        {
            name:'favorite',
            path:'/favorite',
            component:Favorite,
            redirect:'/favorite/songs',
            children:[
                {
                    path:'songs',
                    name:'favoriteSongs',
                    component:FavoriteSongs,
                },
                {
                    path:'playlist',
                    name:'favoritePlaylist',
                    component:FavoritePlaylistVue,
                    children:[
                        {
                            path:'detail/:id/:name/:img/:favorite?',
                            name:'favoritePlaylistDetail',
                            component:PlaylistDetail,
                            children:[
                                {
                                    name:'favoritePlaylistDetailSongDetail',
                                    path:'song',
                                    component:SongDetail,
                                },
                            ]
                        },
                    ]
                },
            ]
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})

export default router