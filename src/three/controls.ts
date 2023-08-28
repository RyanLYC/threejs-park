import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import cameraModule from './camera'
import renderer from './renderer'
import emitter from '@/utils/emitter'

class ControlsModule {
  controls: OrbitControls | FlyControls | FirstPersonControls | null = null

  constructor() {
    this.setOrbitControls()

    emitter.on('toggleControl', (name) => {
      // @ts-ignore
      this[`set${name}Controls`]()
    })
  }
  setOrbitControls() {
    // 初始化控制器
    this.controls = new OrbitControls(
      cameraModule.activeCamera,
      renderer.domElement
    )
    // 设置控制器阻尼
    this.controls.enableDamping = true
    // 设置自动旋转
    // controls.autoRotate = true;

    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minPolarAngle = 0
  }

  setFlyControls() {
    this.controls = new FlyControls(
      cameraModule.activeCamera,
      renderer.domElement
    )
    this.controls.movementSpeed = 100
    this.controls.rollSpeed = Math.PI / 60
  }
  setFirstPersonControls() {
    this.controls = new FirstPersonControls(
      cameraModule.activeCamera,
      renderer.domElement
    )
  }
}

export default new ControlsModule()
