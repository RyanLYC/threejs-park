// import createplane from './mesh/plane'
import scene from './scene'
import Park from './mesh/park'

let park: Park
// 创建物体组件
export default function createMesh() {
  // createplane()
  // 创建园区
  park = new Park(scene)
}

export function updateMesh(time: number) {
  park.update(time)
}
