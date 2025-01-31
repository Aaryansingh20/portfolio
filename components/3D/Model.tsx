"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useLoader, useThree } from "@react-three/fiber"
import { OrbitControls, Center, Environment } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three"

function OldComputer() {
  const groupRef = useRef<THREE.Group>(null)
  const gltf = useLoader(GLTFLoader, "/model/old_computer.glb")
  const [hovered, setHovered] = useState(false)
  const { camera } = useThree()

  useEffect(() => {
    if (groupRef.current && camera instanceof THREE.PerspectiveCamera) {
      const box = new THREE.Box3().setFromObject(groupRef.current)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = camera.fov * (Math.PI / 180)
      let cameraZ = Math.abs(maxDim / Math.tan(fov / 2))

      cameraZ *= 1.2 // Zoom in a little more

      camera.position.set(center.x, center.y, center.z + cameraZ)
      camera.lookAt(center)
      camera.near = 0.01
      camera.far = 1000
      camera.updateProjectionMatrix()
    }
  }, [camera])

  return (
    <Center>
      <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <primitive object={gltf.scene} />
      </group>
    </Center>
  )
}

export default function ModelViewer() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas>
        <color attach="background" args={["#c4c3c4"]} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.6} castShadow />
        <OldComputer />
        <OrbitControls makeDefault />
        <Environment preset="apartment" background blur={0.8} />
      </Canvas>
    </div>
  )
}

