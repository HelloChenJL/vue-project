<script setup>
import {ref,watch} from "vue"
 import {useRoute} from "vue-router"
 import {useStore} from "vuex"
 const transitionName = ref("")
 const store = useStore()
 const route = useRoute();
// 想要切换的时候有动态效果不是非得在入口文件才行而是找有router-view的这个标签因为我们要
// 做的是整个页面进行切换额不是一部分(一级路由占位符)
// 思路：通过监听路由进行对应的样式转换watch
// 监听的时候判断这个路由是属于对象还是数值
//       分别确定前进和后退是什么特效
watch(()=>route.path,(to,from)=>{
   console.log(to,from)
   if(to.indexOf("/main/")>=0 && from.indexOf("/main/")>=0){
      transitionName.value = "";
   }else{
       /*
      fold-left ： 往下一个页面跳转 （新页面的到来 enter ； 当前页面的离开 leave）
      fold-right : 回到上一个页面   (老页面的回归 enter ；当前页面的离开 leave）
    */ 
   if(store.state.pageDirection.direction === "forward"){
      transitionName.value = "fold-left"
   }else{
      transitionName.value = "fold-right"
   }
    
   }
})
</script>

<template>
  <router-view v-slot="{ Component,route }">
    <transition :name="transitionName">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<style >
/* 把iconfont导入进来 */
@import "@/assets/iconfont/iconfont.css";


.fold-left-enter-active {
  position:fixed;
  height: 100vh;
  width: 100%;
  animation-name: fold-left-in;
  animation-duration: 0.5s;
}

.fold-left-leave-active {
  position: fixed;
  height: 100vh;
  width: 100vw;
  animation-name: fold-left-out;
  animation-duration: 0.5s;
}

@keyframes fold-left-in {
  0% {
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0);
  }
  100% {
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
  }
}
@keyframes fold-left-out {
  0%{
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
  }
  100%{
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0);
  }
}
.fold-right-enter-active{
  position: fixed;
  height: 100vh;
  width: 100vw;
  animation-name: fold-right-in;
  animation-duration: .5s;
}
.fold-right-leave-active{
  position: fixed;
  height: 100vh;
  width: 100vw;
  animation-name: fold-right-out;

}
@keyframes fold-right-in{
  0%{
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0);
  }
  100%{
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
  }
}
@keyframes fold-right-out {
  0%{
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
  }
  100%{
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0);
  }
}
</style>