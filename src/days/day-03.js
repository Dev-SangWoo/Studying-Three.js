import * as THREE from 'three';

export default function mount(root) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111827);

  const camera = new THREE.PerspectiveCamera(60, root.clientWidth / root.clientHeight, 0.1, 100);
  camera.position.set(0, 1.5, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  root.appendChild(renderer.domElement);

  const object = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.3, 120, 16),
    new THREE.MeshNormalMaterial()
  );
  scene.add(object);
  scene.add(new THREE.GridHelper(10, 10, 0x64748b, 0x334155));

  renderer.setAnimationLoop((time) => {
    object.rotation.y = time * 0.0004;
    renderer.render(scene, camera);
  });

  function resize() {
    const width = root.clientWidth;
    const height = root.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', resize);
}
