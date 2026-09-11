import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MODEL_URL = 'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb';

export default async function mount(root) {
  root.insertAdjacentHTML('beforeend', `
    <div class="loading" id="final-loading">Loading product...</div>
    <section class="study-panel" id="final-panel">
      <h2>3D Product Showcase</h2>
      <p id="final-description">모델을 드래그해서 회전하고 클릭해 보세요.</p>
      <button id="toggle-rotate">Auto Rotate</button>
      <button id="reset-camera">Reset Camera</button>
    </section>
  `);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1020);

  const camera = new THREE.PerspectiveCamera(45, root.clientWidth / root.clientHeight, 0.1, 100);
  const initialCameraPosition = new THREE.Vector3(0, 1.2, 5);
  camera.position.copy(initialCameraPosition);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.inset = '0';
  root.prepend(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 2.5;
  controls.maxDistance = 8;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x24324a, 2.2));
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
  keyLight.position.set(4, 6, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.2);
  fillLight.position.set(-4, 2, 2);
  scene.add(fillLight);

  let model = null;
  try {
    const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
    model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    model.scale.setScalar(2.8 / Math.max(size.x, size.y, size.z));
    const scaledBox = new THREE.Box3().setFromObject(model);
    model.position.sub(scaledBox.getCenter(new THREE.Vector3()));

    scene.add(model);
    document.querySelector('#final-loading')?.remove();
  } catch (error) {
    const loading = document.querySelector('#final-loading');
    if (loading) loading.textContent = '모델 로딩 실패 — Console을 확인하세요.';
    console.error(error);
  }

  const description = document.querySelector('#final-description');
  document.querySelector('#toggle-rotate').addEventListener('click', () => {
    controls.autoRotate = !controls.autoRotate;
    description.textContent = `Auto Rotate: ${controls.autoRotate ? 'ON' : 'OFF'}`;
  });

  document.querySelector('#reset-camera').addEventListener('click', () => {
    camera.position.copy(initialCameraPosition);
    controls.target.set(0, 0, 0);
    controls.update();
    description.textContent = 'Camera를 초기 위치로 되돌렸습니다.';
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  renderer.domElement.addEventListener('click', (event) => {
    if (!model) return;

    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObject(model, true);
    if (hits.length > 0) {
      const name = hits[0].object.name || 'unnamed mesh';
      description.textContent = `선택한 Mesh: ${name}`;
    }
  });

  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });

  window.addEventListener('resize', () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
  });
}
