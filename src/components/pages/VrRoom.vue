<script setup>
import {useRouter} from "vue-router"
const router = useRouter();
const back = ()=>router.go(-1)
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"//起到鼠标控制页面的效果
import "@/assets/imgs_room/left.jpg"
import "@/assets/imgs_room/right.jpg"
import "@/assets/imgs_room/top.jpg"
import "@/assets/imgs_room/bottom.jpg"
import "@/assets/imgs_room/front.jpg"
import "@/assets/imgs_room/behind.jpg"
 import {ref,onMounted} from "vue"
 //ref 也可以和template中指定标题关联

const vr = ref(null);
onMounted(()=>{
  //如何获取dom
  const dom = vr.value
  //const str = "hello"
  //dom.appendChild(document.createTextNode(str))

const renderer = new THREE.WebGLRenderer(); ;//第一步创建一个renderer渲染器
const canvas = renderer.domElement 
renderer.setSize(window.innerWidth,window.innerHeight)
//将熏染页面转化成一个标签放在现在body里
dom.appendChild(canvas)

//创建一个场景
const scene = new THREE.Scene();
//创建一个摄像头
const camera  = new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,0.1,100)
camera.position.set(0,0,2)
//控制距离
new OrbitControls(camera,canvas) //通过鼠标控制场景中的角度和位置

//创建一个立方体
const boxGeo = new THREE.BoxGeometry(1,1,1);
//给定盒子每个页面的颜色材质
const materials = []
const texture_left =  new THREE.TextureLoader().load("src/assets/imgs_room/left.jpg")
const texture_right =  new THREE.TextureLoader().load("src/assets/imgs_room/right.jpg")
const texture_top =  new THREE.TextureLoader().load("src/assets/imgs_room/top.jpg")
const texture_behind =  new THREE.TextureLoader().load("src/assets/imgs_room/bottom.jpg")
const texture_bottom =  new THREE.TextureLoader().load("src/assets/imgs_room/front.jpg")
const texture_front =  new THREE.TextureLoader().load("src/assets/imgs_room/behind.jpg")
materials.push(new THREE.MeshBasicMaterial({map:texture_left,side:THREE.BackSide}))
materials.push(new THREE.MeshBasicMaterial({map:texture_right,side:THREE.BackSide}))
materials.push(new THREE.MeshBasicMaterial({map:texture_top,side:THREE.BackSide}))
materials.push(new THREE.MeshBasicMaterial({map:texture_behind,side:THREE.BackSide}))
materials.push(new THREE.MeshBasicMaterial({map:texture_bottom,side:THREE.BackSide}))
materials.push(new THREE.MeshBasicMaterial({map:texture_front,side:THREE.BackSide}))
// materials.push(new THREE.MeshBasicMaterial({color:0xff0000}))
// materials.push(new THREE.MeshBasicMaterial({color:0x00ff00}))
// materials.push(new THREE.MeshBasicMaterial({color:0x0000ff}))
// materials.push(new THREE.MeshBasicMaterial({color:0xffff00}))
// materials.push(new THREE.MeshBasicMaterial({color:0xff00ff}))
// materials.push(new THREE.MeshBasicMaterial({color:0x00ffff}))
const box = new THREE.Mesh(boxGeo,materials);
box.position.set(0,0,0);
scene.add(box)//把立方体加入到场景去
camera.position.set(0,0,0.1)//让一进去页面就进入内部不用拉鼠标进入
//让页面显示
const render = ()=>{
  renderer.render(scene,camera)//渲染器渲染场景
  requestAnimationFrame(render)//递归
}
render()
})
</script>
<template>
<a-button @click="back">Back</a-button>
<div ref="vr"></div>
</template>