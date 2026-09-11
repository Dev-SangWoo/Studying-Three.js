import * as THREE from 'three';

export default function mount(root) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050814);

  const camera = new THREE.PerspectiveCamera(55, root.clientWidth / root.clientHeight, 0.1, 100);
  camera.position.set(0, 5, 11);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  root.appendChild(renderer.domElement);

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffb42b })
  );
  scene.add(sun);

  const earthOrbit = new THREE.Group();
  scene.add(earthOrbit);

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0x3b82f6 })
  );
  earth.position.x = 4;
  earthOrbit.add(earth);

  const moonOrbit = new THREE.Group();
  moonOrbit.position.copy(earth.position);
  earthOrbit.add(moonOrbit);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xcbd5e1 })
  );
  moon.position.x = 1;
  moonOrbit.add(moon);

  scene.add(new THREE.AxesHelper(2));

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const elapsed = clock.getElapsedTime();
    sun.rotation.y = elapsed * 0.3;
    earthOrbit.rotation.y = elapsed * 0.45;
    earth.rotation.y = elapsed * 1.8;
    moonOrbit.rotation.y = elapsed * 1.8;
    renderer.render(scene, camera);
  });

  window.addEventListener('resize', () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
  });
}
