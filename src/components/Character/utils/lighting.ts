import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Key light — warm white from upper-left front, main illumination
  const keyLight = new THREE.DirectionalLight(0xfff5e8, 0);
  keyLight.intensity = 0;
  keyLight.position.set(-1.5, 2.5, 3);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.camera.near = 0.1;
  keyLight.shadow.camera.far = 60;
  keyLight.shadow.bias = -0.0003;
  scene.add(keyLight);

  // Fill light — soft cool white from right, lifts shadow side naturally
  const fillLight = new THREE.DirectionalLight(0xe8f0ff, 0);
  fillLight.intensity = 0;
  fillLight.position.set(2.5, 1, 2);
  scene.add(fillLight);

  // Rim / back light — purple edge glow for style depth
  const rimLight = new THREE.DirectionalLight(0x9b5fff, 0);
  rimLight.intensity = 0;
  rimLight.position.set(0.3, 0.5, -4);
  scene.add(rimLight);

  // Ambient — neutral very dark so shadows stay visible but not black
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.08);
  scene.add(ambientLight);

  // Screen point light — warm glow from laptop screen
  const pointLight = new THREE.PointLight(0xd4aaff, 0, 80, 2);
  pointLight.position.set(0, 12.5, 4.5);
  pointLight.castShadow = false;
  scene.add(pointLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 16;
    } else {
      pointLight.intensity = 0;
    }
  }

  const duration = 2;
  const ease = "power2.inOut";

  function turnOnLights() {
    // HDR environment — main source of realistic reflections
    gsap.to(scene, {
      environmentIntensity: 0.85,
      duration: duration,
      ease: ease,
    });
    // Key: strong warm white
    gsap.to(keyLight, {
      intensity: 1.6,
      duration: duration,
      ease: ease,
    });
    // Fill: half strength of key
    gsap.to(fillLight, {
      intensity: 0.55,
      duration: duration,
      ease: ease,
    });
    // Rim: subtle purple edge
    gsap.to(rimLight, {
      intensity: 0.9,
      duration: duration + 0.4,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
