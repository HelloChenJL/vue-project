<script setup>
  import {useRouter} from "vue-router"
  import TopBar from "@/components/topbar/TopBar.vue"
  const router = useRouter()
  const back = ()=>{
    router.go(-1)
  }
  const go = (path)=>{
    router.push({path})//二级页面就用push就行
  }
</script>
<template>
<top-bar @focusHandle="go('/search')">
  <template v-slot:right>
    <div class="iconfont icon-gouwuche1" style="font-size:24px"></div>
  </template>
</top-bar>
<a-button style="margin-top:10px" @click="back">返回</a-button>
<a-button @click="go('/vrroom')">全景</a-button>
<h1>home</h1>
</template>