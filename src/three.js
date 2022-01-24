import * as THREE from "three"
import OrbitControls from "orbit-controls-es6"

import vertex from "./shaders/shader.vert"
import fragment from "./shaders/shader.frag"

import { initHMR } from "./hmr"

initHMR({
  onDispose: () => {
    document.querySelector("canvas").remove()

    renderer.forceContextLoss()
    renderer.context = null
    renderer.domElement = null
    renderer = null

    cancelAnimationFrame(animationId)
    removeEventListener("resize", resize)
  },
})

// Three Scene

let geometry = new THREE.BoxGeometry(200, 200, 200)
let material = new THREE.RawShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
})
let mesh = new THREE.Mesh(geometry, material)

let scene = new THREE.Scene()
scene.add(mesh)
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  10000
)
camera.position.z = 1000
let renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

let animationId

function animate() {
  animationId = requestAnimationFrame(animate)

  mesh.rotation.x += 0.04
  mesh.rotation.y += 0.02

  renderer.render(scene, camera)
}

animate()

_ = new OrbitControls(camera)

// Event listeners
function resize() {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(innerWidth, innerHeight)
}

addEventListener("resize", resize)
