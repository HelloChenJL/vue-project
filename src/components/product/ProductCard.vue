<script setup>
import {computed} from "vue"
  const props = defineProps({
    product:Object
  })

const imgStyle = computed(()=>{
  //对图片进行判断有的话选这个路劲没有的话这个块也存在不能消失
  //想要省去return的话则将返回的东西用小括号括起来
  return props.product.imgpath && props.product.imgpath !== '' ?{
    backgroundImage:`url(${props.product.imgpath})`,
    // 图片的尺寸以及摆放位置，静态的
    backgroundSize:"cover"
  }: ""
})
</script>

<template>
  <div class="product_card">
    <div class="product_img" :style="imgStyle"></div>
    <div class="product_desc">
      <div style="color:rgb(0 0 0 /0.5)">{{product.name}}</div>
      <div style="color:#fa6400">￥{{product.price}}</div>
    </div>
  </div>
</template>
<style scoped>
.product_card{
  box-shadow: 0px 1px 8px #e3e3e3;
  width: 138px;
  height: 167px;
  border-radius: 15px;
}
.product_desc{
  padding: 12px;
  box-sizing: border-box;
  font-size: 14px;
}
.product_img{
  height: 105px;
  background-color: #e5e5e5;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
</style>