import { createRouter,createWebHashHistory } from "vue-router";
import Main from "@/components/pages/Main.vue"
import Search from "@/components/pages/Search.vue"
import SearchResult from "@/components/pages/SearchResult.vue"
import Account from "@/components/pages/tabs/Account.vue"
import Tab2 from "@/components/pages/tabs/Tab2.vue"
import Shopping from "@/components/pages/tabs/Shopping.vue"
import Home from "@/components/pages/tabs/Home.vue"
import VrRoom from "@/components/pages/VrRoom.vue"
import GoodsCategory from "@/components/pages/GoodsCategory.vue"
export const router = createRouter({
  history:createWebHashHistory(),//important 强制性必须要写的 
  routes:[
    {
      path:"/",
      redirect:{
        path:"/main/home"
      }

    },
    {
      path:"/main",
      component:Main,
      children:[
        {
          path:"home",
          component:Home
        },
        {
          path:"account",
          component:Account
        },
        {
          path:"shopping",
          component:Shopping
        },
        {
          path:"tab2",
          component:Tab2
        }
      ]
    },
    {
      path:"/search",
      component:Search
    },
    {
      path:"/searchresult",
      component:SearchResult
    },
    {
      path:"/vrroom",
      component:VrRoom
    },
    {
      path:"/goodscategory",
      component:GoodsCategory
    },
  ]
})