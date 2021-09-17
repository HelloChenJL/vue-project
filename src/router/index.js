import { createRouter,createWebHashHistory } from "vue-router";
import Main from "@/components/pages/Main.vue"
import Account from "@/components/pages/tabs/Account.vue"
import Tab2 from "@/components/pages/tabs/Tab2.vue"
import Shopping from "@/components/pages/tabs/Shopping.vue"
import Home from "@/components/pages/tabs/Home.vue"
export const router = createRouter({
  history:createWebHashHistory(),
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
    }
  ]
})