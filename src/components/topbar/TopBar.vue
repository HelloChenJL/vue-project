<script setup>
import { SearchOutlined,EditOutlined } from '@ant-design/icons-vue';
import {ref,watch} from 'vue';
const emit = defineEmits(["focusHandle,searchContentChangeHandle"])
const props = defineProps({
  edit:Boolean
})
const focusFunc = ()=>{
  emit("focusHandle")
}
let timeoutId = null 
const searchContent = ref("")
watch(searchContent,(newVal,preVal)=>{  //定义一个定时器的编号
  //emit("searchContentChangeHandle",newVal)
  clearTimeout(timeoutId) //清空重置上一次的计时器
  timeoutId = setTimeout(() => {
    emit("searchContentChangeHandle",newVal) //创建一个新的定时器在定点时间内没有在输入
  }, 500);                                    //就触发定时器像父组件广播时间监听内容

})
</script>
<template>
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
  border-radius: 7px !important;
}
.ant-input-affix-wrapper > input.ant-input{
  background-color:unset;
}
</style>