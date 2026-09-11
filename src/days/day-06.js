import * as THREE from 'three';

function createCheckerTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');

  const size = 64;
  for (let y = 0; y < 4; y += 1) {
    for (let x = 0; x < 4; x += 1) {
      context.fillStyle = (x + y) % 2 === 0 ? '#f8fafc' : '#2563eb';
      context.fillRect(x * size, y * size, size, size);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

export default function mount(root) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);

  const camera = new THREE.PerspectiveCamera(50, root.clientWidth / root.clientHeight, 0.1, 100);
  camera.position.set(0, 1, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  root.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 1.8));
  const light = new THREE.DirectionalLight(0xffffff, 4);
  light.position.set(3, 5, 4);
  scene.add(light);

  const texture = createCheckerTexture();
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.35,
    metalness: 0.15,
  });

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.4, 64, 48), material);
  scene.add(sphere);

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    sphere.rotation.y = clock.getElapsedTime() * 0.25;
    renderer.render(scene, camera);
  });

  window.addEventListener('resize', () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
  });
}
