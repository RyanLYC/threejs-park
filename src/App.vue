<template>
  <Scene></Scene>
  <div class="panel">
    <button @click="toggleAction">切换气球动画</button>
    <button @click="toggleCamera('default')">切换相机 - default</button>
    <button @click="toggleCamera('carcamera_Orientation')">
      切换为汽车相机
    </button>
    <button @click="toggleCamera('rightcamera_Orientation')">
      切换为汽车右边相机
    </button>
    <button @click="toggleControl('Orbit')">切换为轨道控制器</button>
    <button @click="toggleControl('Fly')">切换为飞行控制器</button>
    <button @click="toggleControl('FirstPerson')">切换为第一人称控制器</button>
  </div>
</template>
<script setup lang="ts">
import Scene from '@/components/Scene.vue'
import { ref } from 'vue'
import emitter from '@/utils/emitter'

const action = ref(0)
const toggleAction = () => {
  action.value = action.value ? 0 : 1
  emitter.emit('toggleAction', action.value)
}
const toggleCamera = (name: string) => {
  emitter.emit('toggleCamera', name)
}
const toggleControl = (name: string) => {
  emitter.emit('toggleControl', name)
}
</script>

<style scoped lang="scss">
.panel {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
