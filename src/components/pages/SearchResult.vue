<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import TopBar from "@/components/topbar/TopBar.vue";
import MyContent from "@/components/content/MyContent.vue";
import ProductCard from "@/components/product/ProductCard.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

let searchContent = "";
const data = ref([]);
const loading = ref(false);
const loadingMore = ref(false);

const back = () => {
  store.commit("pageDirection/setDirection", "backward");
  router.go(-1);
};
const go = (path) => router.push({ path });
const searchContentChange = (content) => {
  // console.log("现在时searchResult页面了",content)
  searchContent = content;
};
const router_param_searchContent = route.query.searchContent;
const products = [
  {
    id: 1,
    name: "乔1",
    price: "1001",
    type: {
      id: "03",
    },
    imgPath: "src/assets/imgs/shoe06.png",
  },
  {
    id: 2,
    name: "乔2",
    price: "1002",
    type: {
      id: "03",
    },
    imgPath: "src/assets/imgs/shoe07.png",
  },
  {
    id: 3,
    name: "乔3",
    price: "1003",
    type: {
      id: "03",
    },
    imgPath: "src/assets/imgs/shoe08.png",
  },
  {
    id: 4,
    name: "乔4",
    price: "1004",
    type: {
      id: "03",
    },
    imgPath: "src/assets/imgs/shoe09.png",
  },
  {
    id: 5,
    name: "乔5",
    price: "1005",
    type: {
      id: "03",
    },
    imgPath: "src/assets/imgs/shoe10.png",
  },
];

const initData = (content) => {
  console.log("调用后台搜索方法的参数:", content);
  // 待实现
  // http.post("http://api",{
  //     searchContent : router_param_searchContent
  // }).then((resData) => {

  // })
  //  resData => [{},{},{}]
  const resData = products; //假设是从网络返回的数据
  data.value = resData;
};

// 将从上一个页面拿到的搜索内容router_param_searchContent ，调用后台api进行搜索
initData(router_param_searchContent);

const search = () => {
  console.log("本次搜索的新内容:", searchContent);
  initData(searchContent);
};

const refresh = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 800);
  });
};

const loadMore = () => {
  // loading.value = true;
  loadingMore.value = true;
  setTimeout(() => {
    // 获取到产内容加载时候在显示一遍
    data.value = data.value.concat(products);
    // loading.value = false;
    loadingMore.value = false;
  }, 900);
};
</script>

<template>
  <div>
    <top-bar
      @searchContentChangeHandle="searchContentChange"
      :searchInput="router_param_searchContent"
      edit
    >
      <template v-slot:left>
        <div
          class="iconfont icon-fanhui1"
          @click="back"
          style="font-size: 23px"
        ></div>
      </template>
      <template v-slot:right>
        <div
          class="iconfont icon-sousuo"
          @click="search"
          style="font-size: 23px"
        ></div>
      </template>
    </top-bar>
    <my-content pull :refreshFunc="refresh">
      <div
        style="
          color: rgb(0 0 0 / 0.5);
          font-size: 15px;
          margin-bottom: 16px;
          font-weight: 500;
        "
      >
        有{{ data.length }}个商品符合要求
      </div>
      <a-list
        :grid="{ gutter: 16, column: 2 }"
        :loading="loading"
        :data-source="data"
      >
        <template #loadMore>
          <div
            :style="{
              textAlign: 'center',
              marginTop: '12px',
              height: '32px',
              lineHeight: '32px',
            }"
          >
            <a-spin v-if="loadingMore" /><!-- 加载更多的样式 -->
            <a-button
              style="border: none; color: rgb(0 0 0/0.5)"
              block
              v-else
              @click="loadMore"
              >获取更多</a-button
            >
          </div>
        </template>
        <template #renderItem="{ item, index }">
          <a-list-item>
            <product-card :product="item" />
          </a-list-item>
        </template>
      </a-list>
    </my-content>
  </div>
</template>
