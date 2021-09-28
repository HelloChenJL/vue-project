
const state = ()=>{
  return{
    direction:"" //forword跳到下一个页面|backword返回上一页面这两种状态
  }
}
const mutations = {
  setDirection(state,newval){
    state.direction = newval
  }
}
export default{
  state,
  mutations,
  namespaced:true
}
