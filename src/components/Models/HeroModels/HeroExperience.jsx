import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";

import { Room } from "./Optimized-room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { useVisibility } from "../../useInView";

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Pause the render loop when the hero is scrolled out of view.
  const [wrapRef, visible] = useVisibility();

  return (
    <div ref={wrapRef} className="w-full h-full">
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: isTablet ? "none" : "auto", touchAction: "pan-y" }}
      camera={{ position: [0, 0, 15], fov: 45 }}
    >
      {/* deep blue ambient */}
      <ambientLight intensity={0.2} color="#1a1a40" />
      {/* Configure OrbitControls to disable panning and control zoom based on device type */}
      <OrbitControls
        enablePan={false} // Prevents panning of the scene
        enableZoom={false} // Disabled so wheel/pinch always scrolls the page
        minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
        maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <group
          scale={isMobile ? 0.7 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>
      </Suspense>
    </Canvas>
    </div>
  );
};

export default HeroExperience;
