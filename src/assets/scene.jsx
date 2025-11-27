import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Scene = () => {
  const meshRef = useRef();

  // Simple rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default Scene;
