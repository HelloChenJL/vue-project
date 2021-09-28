export const getArray = function(key:string):string[]{
  let val = localStorage.getItem(key); //val type is string "a,b,c"
  return val === null ? []:val.split(",")  //["a","b","c"]
}

export const setArray = (key:string,val:any)=>{
  const arr = getArray(key); //["a","b","c"]
  const index = arr.indexOf(val) //校验原数组是否含有本次查询的val
  if(index >= 0){
    arr.splice(index,1) //有的话去重删掉
  }
  arr.unshift(val) //每次新增一个记录就加到搜索的数组的前面
  localStorage.setItem(key,arr.toString());
}
//删除缓存数组内容
export const clearItem = (key:string)=>{
  localStorage.removeItem(key)
}