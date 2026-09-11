import * as THREE from 'three';

export default function mount(root) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x171717);

  const camera = new THREE.PerspectiveCamera(50, root.clientWidth / root.clientHeight, 0.1, 100);
  camera.position.set(5, 4, 7);
  camera.lookAt(0, 0.7, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  renderer.shadowMap.enabled = true;
  root.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
  keyLight.position.set(4, 7, 4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.left = -5;
  keyLight.shadow.camera.right = 5;
  keyLight.shadow.camera.top = 5;
  keyLight.shadow.camera.bottom = -5;
  scene.add(keyLight);

  const material = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.5 });

  const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), material);
  box.position.set(-1.2, 0.75, 0);
  box.castShadow = true;
  scene.add(box);

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.9, 40, 32), material.clone());
  sphere.material.color.set(0x60a5fa);
  sphere.position.set(1.4, 0.9, 0.2);
  sphere.castShadow = true;
  scene.add(sphere);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshStandardMaterial({ color: 0x303030, roughness: 0.9 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  renderer.setAnimationLoop(() => renderer.render(scene, camera));

  window.addEventListener('resize', () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
  });
}
