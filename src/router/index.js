import { createRouter,createWebHashHistory } from "vue-router";
import Main from "@/components/Main.vue"
import StorePage from "@/components/StorePage.vue"
export const router = createRouter({
  history:createWebHashHistory(),
  routes:[
    {
      path:"/",
      redirect:{
        path:"/01"
      }

    },
    {
      path:"/01",
      component:Main
    },
    {
      path:"/store",
      component:StorePage
    }
  ]
})