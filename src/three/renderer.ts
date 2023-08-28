import * as THREE from 'three'

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 抗锯齿
  // 渲染器depthbuffer 解决 地面 闪动
  logarithmicDepthBuffer: true,
})

renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
renderer.shadowMap.enabled = true // 开启阴影
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.5

export default renderer
