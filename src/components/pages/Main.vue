<script setup>
import TabBar from "@/components/tabbar/TabBar.vue"
import TabBarItem from "@/components/tabbar/TabBarItem.vue"
</script>
<template>
<div>
<router-view></router-view>
  <tab-bar>
    <tab-bar-item name="首页" path="/main/home">
      <template v-slot:icon>
        <div class="iconfont icon-shouye" style="font-size:20px"></div>
      </template>
    </tab-bar-item>
    <tab-bar-item name="商品分类" path="/main/tab2">
      <template v-slot:icon>
      </template>
    </tab-bar-item>
    <tab-bar-item name="购物车" path="/main/shopping">
      <template v-slot:icon>
        <div class="iconfont icon-gouwuche1" style="font-size:20px"></div>
      </template>
    </tab-bar-item>
    <tab-bar-item name="我的" path="/main/account">
      <template v-slot:icon>
        <div class="iconfont icon-hanhan-01-01" style="font-size:20px;font-weight:500"></div>
      </template>
    </tab-bar-item>
  </tab-bar>
  </div>
</template>