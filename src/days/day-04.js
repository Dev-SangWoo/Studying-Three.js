import * as THREE from 'three';

export default function mount(root) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x10131c);

  const camera = new THREE.PerspectiveCamera(55, root.clientWidth / root.clientHeight, 0.1, 100);
  camera.position.set(0, 2, 8);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  root.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(4, 6, 5);
  scene.add(light);

  const items = [
    new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.6, 1.6),
      new THREE.MeshBasicMaterial({ color: 0xff6b6b })
    ),
    new THREE.Mesh(
      new THREE.SphereGeometry(1, 48, 32),
      new THREE.MeshStandardMaterial({ color: 0x4dabf7, roughness: 0.35, metalness: 0.65 })
    ),
    new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.8, 0.28, 120, 20),
      new THREE.MeshPhysicalMaterial({ color: 0xa78bfa, roughness: 0.2, metalness: 0.2, clearcoat: 1 })
    ),
  ];

  items.forEach((item, index) => {
    item.position.x = (index - 1) * 2.8;
    scene.add(item);
  });

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const elapsed = clock.getElapsedTime();
    items.forEach((item, index) => {
      item.rotation.y = elapsed * (0.35 + index * 0.12);
      item.rotation.x = elapsed * 0.15;
    });
    renderer.render(scene, camera);
  });

  window.addEventListener('resize', () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
  });
}
