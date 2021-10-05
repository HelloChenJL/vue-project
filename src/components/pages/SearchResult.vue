<script setup>
import {ref} from "vue"
import {useRoute} from "vue-router"
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import TopBar from "@/components/topbar/TopBar.vue"
import MyContent from "@/components/content/MyContent.vue"  

  
 const route = useRoute();
 const router = useRouter();
 const store = useStore()
 const back = ()=>{
   store.commit("pageDirection/setDirection","backward")
   router.go(-1) 
 }
 console.log(route.query)
 let searchContent = ""
const data = ref([])

 const searchContentChange = (content)=>{
   console.log("searchresult的内容",content)
   searchContent = content
 }
const search = ()=>{
   console.log("本次搜索的新内容",searchContent)
   initData(searchContent)
 }

const route_param_searchContent = route.query.searchContent;
const initData = (content)=>{
   console.log("调用后台搜索方法的参数",content)

   const resData = [1,2,3,4,5] //假设从网络返回的数据
   data.value = resData
 }
 initData(route_param_searchContent);


</script>
<template>  
  <div>
    <top-bar @searchContentChangeHandle = "searchContentChange" :searchInput="route_param_searchContent" edit>
    <template v-slot:left>
      <div class="iconfont icon-fanhui1" @click="back" style="font-size:24px"></div>
    </template>
    <template v-slot:right>
      <div class="iconfont icon-sousuo" @click="search" style="font-size:24px"></div>
    </template>
  </top-bar>
  <my-content hasTabBar>
    <div style="color:rgb(0 0 0 / 0.5); font-size:15px;font-weight:500">有{{data.length}}个是商品符合要求</div>
    <a-list :data-source="data">
      <template #renderItem="{item,index}">
        <a-list-item>
          {{index}}-{{item}}
        </a-list-item>
      </template>
    </a-list>
  </my-content>
  searchresult page
  </div>
</template>
<style scoped>

</style>