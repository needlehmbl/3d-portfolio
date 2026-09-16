import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Particles = ({ count = 200 }) => {
  const mesh = useRef();
  const dataRef = useRef();

  useEffect(() => {
    if (!mesh.current) return;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 10 + 2; // higher starting point
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds[i] = 0.008 + Math.random() * 0.001;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    mesh.current.geometry = geometry;
    dataRef.current = { positions, speeds };
    return () => geometry.dispose();
  }, [count]);

  useFrame(() => {
    if (!mesh.current || !dataRef.current) return;
    const { positions, speeds } = dataRef.current;
    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1];
      y -= speeds[i];
      if (y < -2) y = Math.random() * 10 + 5;
      positions[i * 3 + 1] = y;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;