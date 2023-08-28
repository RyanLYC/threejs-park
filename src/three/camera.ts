import * as THREE from 'three'
import emitter from '@/utils/emitter'

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerHeight / window.innerHeight,
  1,
  100000
)
// 设置相机位置
camera.position.set(1000, 1000, 1000)

class CameraModule {
  activeCamera: THREE.PerspectiveCamera
  collection: any

  constructor() {
    this.activeCamera = camera
    this.collection = {
      default: camera,
    }

    emitter.on('toggleCamera', (name) => {
      this.setActive(name)
    })
  }
  add(name: string, camera: any) {
    this.collection[name] = camera
  }
  setActive(name: string) {
    this.activeCamera = this.collection[name]
  }
}

export default new CameraModule()
