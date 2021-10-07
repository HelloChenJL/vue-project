<script setup>
import {ref,onMounted, proxyRefs} from "vue"
//vue3里面可以将变量传在style里面
 const props = defineProps({
  //  设置一个状态位，有tabbar的话就是一级页面，没有的话就是非一级页面
   hasTabBar:Boolean,
   //加载的自调用父的传值，不用emit会更好一点用props穿个函数
   refreshFunc:{
     type:Function,
     default:function(){}
   }
 })
 const loading = ref(false)//proxy(value:false)
 const msg = ref("下拉刷新")//proxy(value:"正在加载")
 const contentRef = ref(null)//拿到代理的div通过.value
 const topbar_height=60
 const tabbar_height = 50
 const sub_height = props.hasTabBar ? topbar_height + tabbar_height + "px": topbar_height +"px"
//  const content _height = 100-sub_height +"px"
// vue2的话得用到计算属性，给模板绑定方法，在计算属性里面导出
// export default {
//   computed:{
//     fangfaming(){
//       return {
//         a:1
//       }
//     }
//   }
// )
//使用scrolltop来实现正在加载，用onmounted保证钩子函数中的代码能拿到页面中渲染好的节点
let touchstart = 0,  // 记录手指第一次碰屏幕时的y轴距离
    distance = 0;    // 手指y轴滑动距离
onMounted(()=>{
  //这里就是钩子函数中的代码
  const content = contentRef.value;//拿到末班中的标签节点
  // console.log(content)
  //使用content的scrolltop来做一个标志位，作用是通过是否大于0来监听是否是一个下拉事件
  // content.scrollTop = 0
  
  //scrooltop当页面溢出区则大于0，不可以小于0，0和小于0都是代表0
  //下拉状态是scrolltop为0 的时候
  // 通过以往的基础知识的掌握我们可以用 touchstart，touchmove，touchend，这一组事件来控制content的纵向移动
  
  content.addEventListener("touchstart",function(e){
    // 监听手指刚触碰时候的content的一些属性
    // console.log(e)
    touchstart = e.targetTouches[0].clientY
    console.log(touchstart)
  },{passive:false})
  content.addEventListener("touchmove",function(e){
    // 监听手指刚触碰屏幕移动的纵向距离
    // console.log(e)
    if(touchstart <= 0){ return }
    const touch = e.targetTouches[0]
    //不等于0说明没往下滑动所以什么也不用做
    // if(scrollTop !== 0){ return }
    const scrollTop = content.scrollTop
    if(scrollTop===0){
        distance = touch.clientY - touchstart ; // 手指在y轴的滑动距离
        // console.log(distance)
        if(distance>0 && distance <=50){
          loading.value = true
          //给content的css设置样式让content向下移动
          content.style.transform = `translate3d(0,${distance}px,0)`
        }
      
    }
  },{passive:false})
  content.addEventListener("touchend",function(e){
    if(distance === 0) { return }
    if(distance > 0) {
      msg.value = "正在加载"
      // 父组件中的网络请求 ，网络请求是异步，Promise一般是封装异步方法的
      props.refreshFunc().then((res) => {
        console.log(res)
        res ? msg.value = "加载成功" : msg.value = "加载失败"
        setTimeout(() => {
            // 下面的代码全部都是重置归零的代码
            content.style.transform = `translate3d(0,0,0)`;
            distance = 0 ;
            touchstart =0 ;
            loading.value = false;
            msg.value = "下拉刷新"
        } ,800)
      })
    }
    },{passive:false})
})
</script>
<template>
  <div ref="contentRef" class="mycontent">
    <div v-if="loading" class="loading">{{msg}}</div>
    <slot></slot>
  </div>
</template>
<style scoped>
.mycontent{
  padding: 20px;
  box-sizing: border-box;
  /* 使用第三方库要加的 */
  overflow-x:hidden; 
  overflow-y:auto ;
  height: calc(100vh - v-bind(sub_height));
  /* background-color: aquamarine; */
  /* 下拉回弹效果 */
  transition: 500ms;
  --webkit-overflow-scrolling: touch;
}
.loading{
  display: flex;
  justify-content:center ;
  font-size: 16px;
  color: rgba(0, 0, 0, .5);
  margin-bottom: 15px;
}
</style>