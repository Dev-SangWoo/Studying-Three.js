import * as THREE from 'three';

export default function mount(root) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x09090b);

  const camera = new THREE.PerspectiveCamera(55, root.clientWidth / root.clientHeight, 0.1, 100);
  camera.position.set(0, 1, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  root.appendChild(renderer.domElement);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
    new THREE.MeshNormalMaterial()
  );
  scene.add(cube);

  const orbiting = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0xfacc15 })
  );
  scene.add(orbiting);

  const clock = new THREE.Clock();

  renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    const elapsed = clock.elapsedTime;

    cube.rotation.x += 0.7 * delta;
    cube.rotation.y += 1.2 * delta;
    cube.position.y = Math.sin(elapsed * 2) * 0.35;

    orbiting.position.x = Math.cos(elapsed) * 2.3;
    orbiting.position.z = Math.sin(elapsed) * 2.3;

    renderer.render(scene, camera);
  });

  window.addEventListener('resize', () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
  });
}
