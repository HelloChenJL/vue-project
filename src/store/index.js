import { createStore } from "vuex"
import {mutations} from "@/store/mutations"
export const store = createStore({
  state:function(){
    return {
      count:0
    }
  },
  mutations
})