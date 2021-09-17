<script setup>
  import { computed } from "vue"
import {useRouter,useRoute} from "vue-router"
  const router = useRouter()
  const route = useRoute()
  const props = defineProps({
    name:{
      type:String,
      default:"标题"
    },
    icon:{
      type:String,
      default:"iconfont icon-shangpinfenlei"
    },
    path:String
  })
  const doActive = () => {
    if(route.path !== props.path){
      console.log(11)
      //优化界面不用push每执行一次应给将路由取出来再push所以用replace比较好
      router.replace({path:props.path})
    }
    
  }
  /*
  1.找到当前界面图标的路由
  2.找到现在界面的路由
  3.判断这两个路由是否相等相等则切换颜色
  route才能拿到路由的值，router不可以
  */
  const activeStyle = computed(()=>{
    
    return  route.path.includes(props.path)? {color:'#B620E0'}:null
    
  })
</script>
<template>
  <div @click="doActive" class="tab-bar-item" v-bind:style="activeStyle">
    <slot name="icon">
      <div :class="icon" style="font-size:20px;font-weight:500"></div>
    </slot>
    <div style="font-size:13px">{{name}}</div>
  </div>
</template>
<style scoped>
.tab-bar-item{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>