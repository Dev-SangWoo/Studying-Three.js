import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MODEL_URL = 'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb';

export default async function mount(root) {
  root.insertAdjacentHTML('beforeend', '<div class="loading" id="model-loading">Loading animated model...</div>');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);

  const camera = new THREE.PerspectiveCamera(45, root.clientWidth / root.clientHeight, 0.1, 100);
  camera.position.set(0, 1.2, 5);

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

  scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, 2.2));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(4, 5, 4);
  scene.add(light);

  const clock = new THREE.Clock();
  let mixer = null;

  try {
    const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
    const model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    model.scale.setScalar(2.8 / Math.max(size.x, size.y, size.z));
    const scaledBox = new THREE.Box3().setFromObject(model);
    model.position.sub(scaledBox.getCenter(new THREE.Vector3()));
    scene.add(model);

    console.table(gltf.animations.map((clip, index) => ({ index, name: clip.name, duration: clip.duration })));

    if (gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);
      mixer.clipAction(gltf.animations[0]).play();
    }

    document.querySelector('#model-loading')?.remove();
  } catch (error) {
    const loading = document.querySelector('#model-loading');
    if (loading) loading.textContent = '모델 로딩 실패';
    console.error(error);
  }

  renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    mixer?.update(delta);
    controls.update();
    renderer.render(scene, camera);
  });

  window.addEventListener('resize', () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
  });
}
