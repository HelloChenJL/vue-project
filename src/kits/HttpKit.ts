import axios from "axios"
const ip = "127.0.0.1";
const port = 3100;
export const baseURL = `http://${ip}:${port}`;
export const ImgUrl = baseURL + "/assets/upload/"
//创建一个实例，可以用来拦截s
const instance = axios.create({
    baseURL,
    //超时时间
    timeout:10000,
    //报文头
    headers:{
        //报文的格式
        "Content-Type":"application/json",
        // "content-Type":"application/x-www-form-urlencoded"
    }
})
//这行没啥意义前端页面出口时候的
// instance.interceptors.request.use((config)=>config,(e)=>Promise.reject(e))
//成功失败的返回，后端返回来的时候的拦截校验,有两个参数，成功的和失败的
// instance.interceptors.response.use((resp)=>{
//     if(resp.status === 200){
//         return Promise.resolve(resp)
//     }else{
//         return Promise.reject(resp)
//     }
// },e=>{
//     if(e.response.status){
//         return Promise.resolve(e.response)
//     }
// });
//查询的方法
export const Gql = (param) => {
    return new Promise((resolve,reject) => {
        // http://127.0.0.1:3100/gql//像后端发送请求main.ts里面的gql
        instance.post("/gql",param)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => reject(e))
    })
}