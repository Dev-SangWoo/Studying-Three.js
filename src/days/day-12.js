import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function mount(root) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07111f);

  const camera = new THREE.PerspectiveCamera(55, root.clientWidth / root.clientHeight, 0.1, 200);
  camera.position.set(14, 10, 18);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  root.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 2));
  const light = new THREE.DirectionalLight(0xffffff, 2.5);
  light.position.set(8, 12, 6);
  scene.add(light);

  const geometry = new THREE.BoxGeometry(0.45, 0.45, 0.45);
  const material = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.55 });
  const count = 1000;
  const instances = new THREE.InstancedMesh(geometry, material, count);
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3(1, 1, 1);

  for (let i = 0; i < count; i += 1) {
    position.set(
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 18
    );
    matrix.compose(position, quaternion, scale);
    instances.setMatrixAt(i, matrix);
  }
  instances.instanceMatrix.needsUpdate = true;
  scene.add(instances);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;

  function render() {
    renderer.render(scene, camera);
    console.log('renderer.info.render', renderer.info.render);
  }

  controls.addEventListener('change', render);
  render();

  function resize() {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
    render();
  }
  window.addEventListener('resize', resize);

  function cleanup() {
    geometry.dispose();
    material.dispose();
    controls.dispose();
    renderer.dispose();
  }

  window.addEventListener('beforeunload', cleanup, { once: true });
}
