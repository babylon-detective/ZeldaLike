import { Object3D, Vector3 } from 'three'
import physic from '../engine/physic'
import { createRigidBodyEntity } from '../tool/function'
import Gamepad from '../control/gamepad'

const SPEED = 3

export default class Player extends Object3D {
    collider = null
    rigidBody = null
    ctrl = new Gamepad()

    constructor(mesh) {
        super()
        const origin = new Vector3(0,4,0)
        this.initPhysic(physic, origin)
        this.initVisual(mesh)
    }

    initPhysic(physic, origin) {
        const {rigidBody, collider} = createRigidBodyEntity(origin, physic)
        this.rigidBody = rigidBody
        this.collider = collider
    }

    initVisual(mesh) {
        this.add(mesh)
    }

    update() {
        this.updatePhysic()
        this.updateVisual()
    }

    updatePhysic() {
    const x = this.ctrl.x * SPEED
    const z = this.ctrl.z * SPEED
    const y = this.rigidBody.linvel().y
    this.rigidBody.setLinvel({x,y,z}, true)    
}

    updateVisual() {
        this.position.copy(this.rigidBody.translation())
    } 
}