import * as THREE from 'three';

export default function mount(root) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);

  const camera = new THREE.PerspectiveCamera(50, root.clientWidth / root.clientHeight, 0.1, 100);
  camera.position.set(0, 0.7, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  root.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x1e293b, 2));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(4, 5, 4);
  scene.add(light);

  const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3, metalness: 0.45 });
  const product = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.3, 160, 24), material);
  product.userData.description = '3D Object를 클릭해서 DOM 상태를 바꿨습니다.';
  scene.add(product);

  root.insertAdjacentHTML('beforeend', `
    <section class="study-panel" id="product-panel">
      <h2>3D + DOM UI</h2>
      <p id="product-description">색상 버튼을 누르거나 3D Object를 클릭해 보세요.</p>
      <button data-color="#3b82f6">Blue</button>
      <button data-color="#ef4444">Red</button>
      <button data-color="#22c55e">Green</button>
    </section>
  `);

  const description = document.querySelector('#product-description');
  document.querySelectorAll('#product-panel [data-color]').forEach((button) => {
    button.addEventListener('click', () => {
      material.color.set(button.dataset.color);
      description.textContent = `DOM 버튼 → Three.js Material: ${button.textContent}`;
    });
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  renderer.domElement.addEventListener('click', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    const hit = raycaster.intersectObject(product, false)[0];
    if (hit) description.textContent = product.userData.description;
  });

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    product.rotation.y = clock.getElapsedTime() * 0.25;
    renderer.render(scene, camera);
  });

  window.addEventListener('resize', () => {
    camera.aspect = root.clientWidth / root.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(root.clientWidth, root.clientHeight);
  });
}
