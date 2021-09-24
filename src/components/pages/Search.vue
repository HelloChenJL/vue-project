<script setup>
  import {useRouter} from "vue-router"
  import TopBar from "@/components/topbar/TopBar.vue"
  import {inject} from "vue"
  const message = inject("$message")
  const router = useRouter()
  const back = ()=>router.go(-1)  
  const go = path=>router.push({path})
  let searchContent = ""
  const goSearch=()=>{
    if(searchContent != ""){
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
</script>
<template>
  <top-bar @searchContentChangeHandle="searchContentChange" edit>
    <template v-slot:left>
      <div class="iconfont icon-fanhui1" @click="back" style="font-size:24px"></div>
    </template>
    <template v-slot:right>
      <div class="iconfont icon-sousuo" @click="goSearch" style="font-size:24px"></div>
    </template>
  </top-bar>
  <a-button @click="back" >back</a-button>
  searchpage
</template>