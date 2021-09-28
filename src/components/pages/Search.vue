<script setup>
  import {useRouter} from "vue-router"
  import {useStore} from "vuex"
  import TopBar from "@/components/topbar/TopBar.vue"
  import {ref,inject} from "vue"
  import {setArray,getArray,clearItem} from "@/kits/LocalStorageKit.ts";
  const message = inject("$message")
  const router = useRouter()
  const store = useStore()
  const back = ()=>{
    store.commit("pageDirection/setDirection","backward")
    router.go(-1)
  }  
  const go = path=>{
    store.commit("pageDirection/setDirection","forward")
    router.push({path})
  }
  let searchContent = ""
  const historySearch = ref(getArray("historySearch"))//因为history这个对象要显示在页面上所以用ref

  const goSearch=()=>{
     // set 本地缓存
        /*
            localStorage: string
            "a" "b" "c"  -> "a,b,c"

            get: "a,b,c"  -> array ["a","b","c"] 

            set: "d"
                get: ["a","b","c"]
                arr.push("d") ["a","b","c","d"]
                setItem "a,b,c,d"
        */ 
    if(searchContent != ""){
      setArray("historySearch",searchContent)
      store.commit("pageDirection/setDirection","forward")
      router.push({
      path:"/searchresult",
       //将值传给searchresult页面
      query:{
        searchContent
      }
    })
  }else{
    message.warning("请输入要查询的内容")
  }
}

  const searchContentChange=(content)=>{
    console.log("searh页面的",content)
    searchContent = content
  }
  //通过历史搜索跳到对应的页面
  const searchByHistory = (searchContent)=>{
    store.commit("pageDirection/setDirection","forward")
    router.push({
      path:"/searchResult",
      query:{
        searchContent
      }
    })
  }
  const clearHistory = ()=>{
    clearItem("historySearch") //删除本地缓存的
    historySearch.value = [] //将页面显示也删掉
  }
</script>
<template>
  <div>
    <top-bar @searchContentChangeHandle="searchContentChange" edit>
    <template v-slot:left>
      <div class="iconfont icon-fanhui1" @click="back" style="font-size:24px"></div>
    </template>
    <template v-slot:right>
      <div class="iconfont icon-sousuo" @click="goSearch" style="font-size:24px"></div>
    </template>
  </top-bar>
  <div style="padding:20px;box-sizing:boder-box;">
    <div style="display:flex;justify-content:space-between;">
      <div style="color:rgb(0 0 0 /0.5);font-size:14px">最近搜索</div>
      <div style="color:#b620e0;font-size:14px" @click="clearHistory">清空</div>
    </div>
    <div class="history-search-content">
      <div @click="searchByHistory(item)" class="history-search-item" v-for="(item,index) in historySearch" :key="index+item">{{item}}</div>
    </div>
  </div>
  </div>
</template>
<style scoped>
.history-search-content{
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  font-size: 14px;
}
.history-search-item{
  padding: 3px 9px;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgb(40 40 40 /0.2);
  margin-right: 8px;
  border-radius: 5px;
  margin-top: 12px;
}
</style>