<script setup>
import {useRouter} from "vue-router";
import {useStore} from "vuex"
import {computed, nextTick, onMounted, ref} from "vue"
import BScroll from "@better-scroll/core"
import TopBar from "@/components/topbar/TopBar.vue";
import MyContent from "@/components/content/MyContent.vue"
import ProductCard from "@/components/product/ProductCard.vue"
import {Gql,ImgUrl} from "@/kits/HttpKit.ts"
const store = useStore()
const router = useRouter()
const homeImgs = ref([])
//商品卡片部分
const products = ref([])

// 初始时伪造数据，用来支撑better-scroll的动态算宽度
const mockProductCardList = () => {
    for(let item of [1,2,3]){
        products.value.push({
            id:item,
            name:"产品名称",
            price:0
        })
    }
}
mockProductCardList();

const moreContent = [
    {
        name:"爆款",
        backgroundColor:"#F9bead",
        fontColor:"#d84933",
    },
    {
        name:"特价",
        backgroundColor:"#fbd96d",
        fontColor:"#b68800",
    },
    {
        name:"二手",
        backgroundColor:"#dff8ea",
        fontColor:"#08a963",
    },
    {
        name:"拼一拼",
        backgroundColor:"#b1eafd",
        fontColor:"#185162",
    },
]
const moreContentStyle = computed(()=>{
    return (item)=>{
        return {
            backgroundColor:item.backgroundColor,
            color:item.fontColor
        }
    }
})
//模拟一个网络请求，返回结果
// const refresh = function (){
//     return new Promise((resolve,reject)=>{
//        setTimeout(()=>{
//         resolve(true)
//        },800)
//     })
// }
const count = ref(0)      // proxy { {value:0} }
const wrapper = ref(null)
const List = ref(null)
const wrapper_bs = ref(null)
const list_bs = ref(null)
let bs
let picScroll

//这里使用onmounted是因为，为了保证dom已经渲染完毕，好让我们调整ref=list标签的宽度，在初始化页面渲染完执行
onMounted(()=>{
    const wrapper_div = wrapper.value //<div ref="wrapper"></div>
    const List_div = List.value//<div re="list"></div>
    let itemWidth = 138;
    let margin = 15;
    // 计算需要的宽度
    let width = (itemWidth+margin) * products.value.length-margin;
    console.log(width);
    // 给内容定义宽度
    List_div.style.width = width +"px" ;
    //只要js改变了原有的css使用nexttick是为了保ref = list 的宽度渲染完毕，在改变了样式后保证渲染完执行
    nextTick(()=>{
        // 检测是否为空，或者已经声明
        if(!picScroll){
            // 没有的话会给新创建一个，得从第三方库倒进来
            picScroll = new BScroll(wrapper_div,{
            scrollX:true,
            eventPassthrough:'vertical'//忽略竖直方向的滚动
            })
        }else{
            picScroll.refresh()
        }
    })
    //下面爆款的js可以复用不用再写mounted
    const wrapper_bs_div = wrapper_bs.value;
    const list_bs_div = list_bs.value;
    let itemWidth_bs = 120;
    let margin_bs = 12
    const width_bs = (itemWidth_bs + margin_bs) * moreContent.length - margin_bs;
    list_bs_div.style.width = width_bs +"px";
    nextTick(()=>{
        if(!bs){
            bs = new BScroll(wrapper_bs_div,{
                scrollX:true,
                eventPassthrough:'vertical'
            })
        }else{
            bs.refresh()
        }
    })

})
const back = () => router.go(-1)
const go = path => {
    store.commit("pageDirection/setDirection","forward")
    router.push({path})
}
//出现滑动页面跑错问题是因为，捕获事件和冒泡事件的问题
// const refId = ref(null)
// onMounted(()=>{
//     cosnt carousel_div = refId.value
//     console.log(carousel_div.$el)
//     const t = carousel_div.$el
//     const tt = t.childNodes[0]
//     const ttt = tt.childNodes[1]
//     t.addEventListener("touchmove",(e)=>{
//         e.preventDefault()//阻止捕获时间
//         e.stopPropagation()//阻止冒泡事件
//         console.log(1000)
//     },{
//         passive:false
//     })
// })
const refresh = () => initData()

const initData = async () => {
    let t = '["03","04"]'
    const start = 0;
    const count = 5;
    const gql = {
        query:`
           {
                homeImgs
                goods(start:${start},count:${count}) {
                id
                name
                price
                imgpath
                type {
                id
                }
            }
            }
        `
    }
    try {
        const res = await Gql(gql)
        res.data.goods.map(item => {
            item.imgpath = ImgUrl + item.imgpath
            return item
        })
        homeImgs.value = res.data.homeImgs;
        products.value = res.data.goods;
        console.log("scuccess")
        return true
    } catch (error) {
        return false
    }
}

initData();
</script>

<template>
    
<div>
    <top-bar @focusHandle="go('/search')">
        <template v-slot:right>
            <div class="iconfont icon-gouwuche1" style="font-size:24px" ></div>
        </template>
    </top-bar>
    <my-content pull ref="refId" hasTabBar :refreshFunc="refresh">
        <a-carousel >
            <div v-for="(item,index) in homeImgs" :key="index+item">
                <h3 class="carousel-title">{{index+1}}</h3>
                <img class="carousel-img" :src="item" >
            </div>
        </a-carousel>
        <div class="title">
            <!-- 自己方式实现 -->
            <div class="title-left">类别1</div>
            <div class="title-right">查看全部</div>
            <!-- 第三方库解决 -->
        </div>
        <div class="product_list">
            <!-- 解决比例不失调flex-shrink -->
            <product-card v-for="(item,index) in products" :product="item" :key="index" style=" flex-shrink:0;margin-right:15px;"></product-card>
        </div>
        <div class="title">
            <!-- 自己方式实现 -->
            <div class="title-left">类别2</div>
            <div class="title-right">查看全部</div>
        </div>
        <!-- 第三方库better-scroll/core解决 -->
        <div ref="wrapper" class="product_list_bs">
            <!-- 这里需要将循环的内容包裹，因为betterscroll默认处理容器的（wrapper）的第一个子元素（content）
            的滚动，其他元素都会被忽略 -->
            <div ref="List" class="List"> 
                <product-card v-for="(item,index) in products" :product="item" :key="index" style=" flex-shrink:0;margin-right:15px;"></product-card>
            </div>
        </div>
        <!-- 。总结对比
        better-scroll实现的效果细节比自 己用css实现的要好，比如回弹的效果
        自己实现代码简单，不需要修改之前的代码。使用第三方库的需要遵守其开发的约定，不符合其规定的需要对原有代码稍微调整 -->
        <div ref="wrapper_bs" class="wrapper_bs_class">
            <div ref="list_bs" class="list_bs_class">
                <div class="card_bs" :style="moreContentStyle(item)" v-for="(item,index) in moreContent" :key="index+item.name">{{item.name}}</div>
            </div>
        </div>
    </my-content>
</div>
</template>
<style scoped>
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  overflow: hidden;
  position: relative;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
.carousel-title{
    z-index:1;
    position: absolute;
    top: 0px;
    left: 50%;
}
.carousel-img{
    position: absolute;
    top:0px;
    left:0px;
    object-fit: cover;
    width: 100%;
    height: 160px;
    border-radius: 10px;
}
.title{
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
}
.title-left{
    font-size: 15px;
    font-weight: bold;
    color: rgb(0 0 0 0.5);
}
.title-right{
   color:#b620e0;
   font-size: 13px;
   /* 两边的文字按照以中心轴对齐 */
   align-self: baseline;
}
.product_list{
    padding:2px ;
    box-sizing: border-box;
    display: flex;
    /* 虽然是弹性布局，但是当例子多的话也不会压缩本身的高宽溢出区都可以 */
    overflow-x: auto;
}

.product_list_bs{
    margin-top: 18px;
    /* 让横向或者滚动消失、 */
    overflow: hidden;
    /* 避免出现像轮播图一样的滑动错误 */
    touch-action: none;
}
.wrapper_bs_class{
    margin-top: 18px;
    overflow: hidden;
}
.List{
    /* 组件横着摆 */
    display: flex;
}
.list_bs_class{
    display: flex;
}
.card_bs{
    width: 120px;
    height: 90px;
    margin-right: 15px;
    border-radius: 15px;
    background-color: #e5e5e5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    
}
/* 去掉滚动条 */
::-webkit-scrollbar{
    display: none;
}
</style>