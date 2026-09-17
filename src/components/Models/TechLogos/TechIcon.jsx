import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { useVisibility } from "../../useInView";

const TechIcon = ({ model }) => {
  const scene = useGLTF(model.modelPath);
  const [wrapRef, visible] = useVisibility();
  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh && child.name === "Object_5") {
          child.material = new THREE.MeshStandardMaterial({
            color: "white",
          });
        }
      });
    }
  }, [scene, model.name]);
  return (
    <div ref={wrapRef} className="w-full h-full">
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight intensity={1} position={[5, 5, 5]} />
      <Environment preset="city" />
      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene.scene} />
        </group>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
    </div>
  );
};

export default TechIcon;
