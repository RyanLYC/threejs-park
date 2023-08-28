import mitt from 'mitt'

type Events = {
  toggleAction: number
  toggleCamera: string
  toggleControl: string
}

const emitter = mitt<Events>()

export default emitter
