import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MODEL_URL = 'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb';

export default async function mount(root) {
  root.insertAdjacentHTML('beforeend', '<div class="loading" id="model-loading">Loading GLB...</div>');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111827);

  const camera = new THREE.PerspectiveCamera(45, root.clientWidth / root.clientHeight, 0.1, 100);
  camera.position.set(0, 1.5, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.inset = '0';
  root.prepend(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 2.2));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(4, 6, 5);
  scene.add(light);

  try {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(MODEL_URL);
    const model = gltf.scene;

    const initialBox = new THREE.Box3().setFromObject(model);
    const initialSize = initialBox.getSize(new THREE.Vector3());
    const maxSize = Math.max(initialSize.x, initialSize.y, initialSize.z);
    model.scale.setScalar(2.8 / maxSize);

    const scaledBox = new THREE.Box3().setFromObject(model);
    const center = scaledBox.getCenter(new THREE.Vector3());
    model.position.sub(center);

    scene.add(model);
    document.querySelector('#model-loading')?.remove();
  } catch (error) {
    const loading = document.querySelector('#model-loading');
    if (loading) loading.textContent = '모델 로딩에 실패했습니다. Console을 확인하세요.';
    console.error(error);
  }

  renderer.setAnimationLoop(() => renderer.render(scene, camera));

  window.addEventListener('resize', () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
  });
}
