import * as THREE from 'three';

export default function mount(root) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0c1222);

  const camera = new THREE.PerspectiveCamera(50, root.clientWidth / root.clientHeight, 0.1, 100);
  camera.position.set(0, 1, 7);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  root.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, 2));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(4, 5, 5);
  scene.add(light);

  const colors = [0xef4444, 0x22c55e, 0x3b82f6, 0xeab308, 0xa855f7];
  const targets = colors.map((color, index) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 32, 24),
      new THREE.MeshStandardMaterial({ color, roughness: 0.45 })
    );
    mesh.position.x = (index - 2) * 1.6;
    mesh.userData.baseColor = color;
    scene.add(mesh);
    return mesh;
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let selected = null;

  function updatePointer(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  renderer.domElement.addEventListener('click', (event) => {
    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(targets, false);

    if (selected) {
      selected.material.color.setHex(selected.userData.baseColor);
      selected.scale.setScalar(1);
      selected = null;
    }

    if (hits.length > 0) {
      selected = hits[0].object;
      selected.material.color.set(0xffffff);
      selected.scale.setScalar(1.18);
    }
  });

  renderer.setAnimationLoop(() => renderer.render(scene, camera));

  window.addEventListener('resize', () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
  });
}
