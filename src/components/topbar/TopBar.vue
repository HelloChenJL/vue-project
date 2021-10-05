<script setup>
import { SearchOutlined,EditOutlined } from '@ant-design/icons-vue';
import {ref,watch} from 'vue';
const emit = defineEmits(["focusHandle","searchContentChangeHandle"])
const props = defineProps({
  edit:Boolean,//这个变量是一个状态位（一般都是布尔类型，0，1，2之类的简单类型 来区别输入框的显示状态）只要在父组件写了这个变量就代表他是true不写默认false
  searchInput:String//输入框要显示的内容
  
})
const focusFunc = ()=>{
  emit("focusHandle")
}
const searchContent = ref(props.searchInput ? props.searchInput : "")
let timeoutId = null 
watch(searchContent,(newVal,preVal)=>{  //定义一个定时器的编号
  //emit("searchContentChangeHandle",newVal)
  clearTimeout(timeoutId) //清空重置上一次的计时器
  timeoutId = setTimeout(() => {
    emit("searchContentChangeHandle",newVal) //创建一个新的定时器在定点时间内没有在输入
  }, 500);                                    //就触发定时器像父组件广播时间监听内容

})
</script>
<template>
  <div>
    <div class="top-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="middle">
      <slot name="middle">
        <a-input v-model:value="searchContent" v-if="edit" size="large" >
          <template #prefix>
            <edit-outlined style="color:rgb(0 0 0 /0.25)" />
          </template>
        </a-input>
        <a-input v-else size="large" @focus="focusFunc" >
          <template #prefix>
            <search-outlined style="color:rgb(0 0 0 /0.25)" />
          </template>
        </a-input>
      </slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
  </div>
</template>
<style>
.top-bar{
  width: 100%;
  height: 60px;
  box-shadow:0px 1px 2px rgba(50, 50, 50, 0.2) ;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 18px;
}
/* .left{

} */
.middle{
  width: 80%;
}
/* .right{

} */
.ant-input-affix-wrapper{
  background-color: rgba(172, 172, 172, 0.1) !important;
  border: none !important;
  border-radius: 15px !important;
}
.ant-input-affix-wrapper > input.ant-input{
  background-color:unset;
}
</style>