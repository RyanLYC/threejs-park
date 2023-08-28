import * as THREE from 'three'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import emitter from '@/utils/emitter'
import gsap from 'gsap'
import cameraModule from '../camera'

export default class Park {
  scene: THREE.Scene
  loader: GLTFLoader
  gltf: GLTF | null = null
  mixer: THREE.AnimationMixer | null = null
  clip: THREE.AnimationClip | null = null
  action: THREE.AnimationAction | null = null

  curve: THREE.CatmullRomCurve3 | null = null
  curveProgress: number = 0
  redcar: THREE.Mesh | null = null

  constructor(scene: THREE.Scene) {
    // 载入模型
    this.scene = scene
    this.loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    this.loader.setDRACOLoader(dracoLoader)
    this.loader.load('./model/city.glb', (gltf) => {
      console.log(gltf)
      scene.add(gltf.scene)

      // 场景子元素遍历
      this.gltf = gltf
      gltf.scene.traverse((child) => {
        if (child.name === '热气球') {
          console.log(child)
          this.mixer = new THREE.AnimationMixer(child)
          this.clip = gltf.animations[1]
          this.action = this.mixer.clipAction(this.clip)
          this.action.play()
        }
        if (child.name === '汽车园区轨迹') {
          // console.log(child);
          const line = child as THREE.Line
          line.visible = false
          // 根据点创建曲线
          const points = []
          for (
            let i = line.geometry.attributes.position.count - 1;
            i >= 0;
            i--
          ) {
            points.push(
              new THREE.Vector3(
                line.geometry.attributes.position.getX(i),
                line.geometry.attributes.position.getY(i),
                line.geometry.attributes.position.getZ(i)
              )
            )
          }

          this.curve = new THREE.CatmullRomCurve3(points)
          this.curveProgress = 0
          this.carAnimation()
        }
        if (child.name === 'redcar') {
          console.log(child)
          this.redcar = child as THREE.Mesh
        }
      })

      gltf.cameras.forEach((camera) => {
        // scene.add(camera)
        cameraModule.add(camera.name, camera)
      })
    })
    emitter.on('toggleAction', (value: number) => {
      if (this.mixer && this.gltf) {
        this.action?.reset()
        this.clip = this.gltf.animations[value]
        this.action = this.mixer.clipAction(this.clip)
        this.action.play()
        console.log('value:', value)
      }
    })
  }

  update(time: number) {
    if (this.mixer) {
      this.mixer.update(time * 2)
    }
  }

  carAnimation() {
    gsap.to(this, {
      curveProgress: 0.999,
      duration: 10,
      repeat: -1,
      onUpdate: () => {
        if (this.curve && this.redcar) {
          const point = this.curve.getPoint(this.curveProgress)
          this.redcar.position.set(point.x, point.y, point.z)
          if (this.curveProgress + 0.001 < 1) {
            const point = this.curve.getPoint(this.curveProgress + 0.001)
            this.redcar.lookAt(point)
          }
        }
      },
    })
  }
}
