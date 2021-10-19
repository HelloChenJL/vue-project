//webpack(打包工具)-->vue-cli（脚手架）都支持
//rollup(打包工具)-->vite（脚手架）仅支持vue3，可以按需引用
import Button from "ant-design-vue/lib/button";
import Input from "ant-design-vue/lib/input";
import message from "ant-design-vue/lib/message";
import List from "ant-design-vue/lib/list";
import Carousel from "ant-design-vue/lib/carousel";
import Avatar from "ant-design-vue/lib/avatar";
import Spin from "ant-design-vue/lib/spin";
import "ant-design-vue/dist/antd.css";
export const useAntd = (app)=>{
  message.config({
    top:"100px"
  })
  app.provide("$message",message)//第一种对应inject
  app.use(Button)
  app.use(Input)
  app.use(List)
  app.use(Carousel)
  app.use(Avatar)
  app.use(Spin)
}