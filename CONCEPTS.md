# Three.js 전체 개념 요약

이 문서는 14일 과정을 진행하면서 계속 돌아와 보는 **전체 지도**입니다.

## 1. 가장 중요한 구조

```text
Geometry + Material
        ↓
       Mesh
        ↓
      Scene
        ↑
     Camera
        ↓
    Renderer
        ↓
      Canvas
```

- `Scene`: 3D 세계의 루트 컨테이너
- `Camera`: Scene의 어느 부분을 어떤 관점으로 볼지 결정
- `Renderer`: Scene + Camera를 받아 2D Canvas에 그려줌
- `Geometry`: 정점(vertex) 기반의 형태 데이터
- `Material`: 표면이 어떻게 보이는지 결정
- `Mesh`: Geometry와 Material을 묶은 실제 3D Object

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
renderer.render(scene, camera);
```

## 2. 좌표와 Transform

Three.js의 3D Object는 보통 다음 세 transform을 가집니다.

```js
object.position.set(x, y, z);
object.rotation.set(x, y, z);
object.scale.set(x, y, z);
```

중요한 점은 좌표가 항상 절대 좌표가 아니라는 것입니다. 부모가 있으면 자식의 `position`, `rotation`, `scale`은 **부모의 local space 기준**입니다.

```text
Scene
└─ Car
   ├─ Wheel
   ├─ Wheel
   ├─ Wheel
   └─ Wheel
```

Car를 움직이면 Wheel도 함께 움직입니다.

## 3. Scene Graph

Three.js의 대부분 3D 객체는 `Object3D` 계열입니다.

```text
Object3D
├─ Scene
├─ Group
├─ Mesh
├─ Camera
└─ Light 일부 객체
```

대표 API:

```js
parent.add(child);
parent.remove(child);
object.children;
object.parent;
```

Scene Graph는 복잡한 물체를 계층적으로 관리하는 핵심 구조입니다.

## 4. Camera

가장 자주 사용하는 카메라는 `PerspectiveCamera`입니다.

```js
const camera = new THREE.PerspectiveCamera(
  60,                 // field of view
  width / height,     // aspect ratio
  0.1,                // near
  100                 // far
);
```

- `fov`: 세로 시야각
- `aspect`: 화면 가로/세로 비율
- `near`, `far`: 렌더링할 깊이 범위

브라우저 크기가 바뀌면:

```js
camera.aspect = width / height;
camera.updateProjectionMatrix();
renderer.setSize(width, height);
```

## 5. Renderer

현재 과정에서는 `WebGLRenderer`를 중심으로 사용합니다.

```js
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(width, height);
root.appendChild(renderer.domElement);
```

`devicePixelRatio`를 무작정 높이면 화면은 선명해지지만 GPU가 처리할 픽셀 수가 크게 증가합니다.

## 6. Geometry

기본 제공 Geometry 예시:

```text
BoxGeometry
SphereGeometry
PlaneGeometry
CylinderGeometry
TorusGeometry
TorusKnotGeometry
```

실제로는 모두 vertex/index/attribute 데이터를 가진 `BufferGeometry`를 기반으로 합니다.

필요하면 Geometry를 여러 Mesh에서 재사용할 수 있습니다.

## 7. Material

대표적인 Material:

- `MeshBasicMaterial`: 빛의 영향을 받지 않음
- `MeshLambertMaterial`: 비교적 단순한 조명
- `MeshPhongMaterial`: specular highlight 표현
- `MeshStandardMaterial`: PBR metallic-roughness 기반, 실무에서 자주 사용
- `MeshPhysicalMaterial`: Standard보다 더 많은 물리 기반 표현 제공

```js
new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.4,
  metalness: 0.7,
});
```

재질이 현실적일수록 보통 연산 비용도 더 커질 수 있습니다.

## 8. Light

대표 Light:

```text
AmbientLight      장면 전체에 방향 없는 빛
HemisphereLight   하늘/바닥 두 방향의 환경광 느낌
DirectionalLight  멀리서 한 방향으로 오는 빛
PointLight        한 점에서 사방으로 퍼지는 빛
SpotLight         원뿔 형태의 집중광
```

`MeshBasicMaterial`은 light의 영향을 받지 않습니다.

## 9. Shadow

```js
renderer.shadowMap.enabled = true;
light.castShadow = true;
mesh.castShadow = true;
floor.receiveShadow = true;
```

Shadow는 추가 렌더링 비용이 발생합니다. 모든 Light와 Mesh에 습관적으로 켜지 않습니다.

## 10. Texture와 PBR

대표 map:

```text
map            base color
normalMap      표면 굴곡 방향
roughnessMap   거칠기
metalnessMap   금속성
aoMap          ambient occlusion
emissiveMap    스스로 빛나는 부분
```

색상용 texture는 color space를 확인합니다.

```js
texture.colorSpace = THREE.SRGBColorSpace;
```

PBR 결과는 **Material + Texture + Light/Environment** 조합으로 결정됩니다.

## 11. Animation / Render Loop

```js
renderer.setAnimationLoop((time) => {
  update(time);
  renderer.render(scene, camera);
});
```

프레임마다 고정값을 더하면 모니터 주사율에 따라 속도가 달라질 수 있습니다.

```js
const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  const delta = clock.getDelta();
  mesh.rotation.y += delta;
  renderer.render(scene, camera);
});
```

**frame 기반보다 time 기반 animation을 우선**합니다.

## 12. glTF / GLB

웹 런타임 3D asset에는 가능하면 glTF/GLB를 우선 고려합니다.

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const gltf = await loader.loadAsync('/models/model.glb');
scene.add(gltf.scene);
```

- `.gltf`: JSON과 asset 파일이 분리될 수 있음
- `.glb`: 여러 데이터를 binary 하나에 묶을 수 있음

모델을 받은 뒤 자주 하는 작업:

```text
load
↓
scene 확인
↓
BoundingBox 계산
↓
center 맞추기
↓
scale 조정
↓
material/light 확인
```

## 13. OrbitControls

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
```

`enableDamping` 또는 `autoRotate` 등을 사용할 때는 일반적으로 render loop에서 `controls.update()`를 호출합니다.

## 14. AnimationMixer

GLB에 포함된 animation clip은 `AnimationMixer`로 재생할 수 있습니다.

```js
const mixer = new THREE.AnimationMixer(model);
const action = mixer.clipAction(gltf.animations[0]);
action.play();

const delta = clock.getDelta();
mixer.update(delta);
```

```text
AnimationClip
     ↓
AnimationMixer
     ↓
AnimationAction
```

## 15. Raycaster / Picking

DOM click에서는 브라우저 화면 좌표를 쓰지만 3D picking에서는 pointer를 NDC 좌표로 변환합니다.

```text
clientX/Y
  ↓
NDC (-1 ~ +1)
  ↓
Raycaster.setFromCamera()
  ↓
intersectObjects()
  ↓
선택된 Object
```

```js
pointer.x = (event.clientX / width) * 2 - 1;
pointer.y = -(event.clientY / height) * 2 + 1;

raycaster.setFromCamera(pointer, camera);
const hits = raycaster.intersectObjects(objects, true);
```

## 16. DOM UI + 3D

실무에서는 Canvas만 있는 경우보다 일반 웹 UI와 결합하는 경우가 많습니다.

```text
DOM UI
 ↕ state/event
Three.js Scene
```

예:

- 3D 제품 클릭 → 설명 DOM 표시
- 색상 버튼 클릭 → Material color 변경
- 스크롤 → Camera 이동
- 3D 위치 → HTML label 위치 연결

필요하면 `CSS2DRenderer`를 이용해 3D Object와 HTML label을 연결할 수 있습니다.

## 17. 성능

Three.js 성능은 단순 JS 성능만 보면 안 됩니다.

```text
CPU
GPU
Draw Calls
Polygon Count
Texture Memory
Network Asset Size
Pixel Count
Shadow / Post Processing Cost
```

대표 전략:

- geometry/material 재사용
- 동일한 물체가 많으면 `InstancedMesh` 고려
- 지나치게 큰 texture 피하기
- 필요 없는 shadow 줄이기
- `devicePixelRatio` 제한
- 정적인 화면은 render-on-demand 고려
- 필요 없어진 GPU resource는 dispose

## 18. Cleanup

JavaScript object reference가 없어졌다고 모든 GPU resource가 즉시 정리되는 것은 아닙니다.

```js
geometry.dispose();
material.dispose();
texture.dispose();
renderer.dispose();
```

SPA에서 페이지 진입/이탈을 반복할 때 특히 중요합니다.

## 19. Post Processing

```text
Scene
 ↓
RenderPass
 ↓
Bloom / 기타 Pass
 ↓
OutputPass
 ↓
Screen
```

```js
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(effectPass);
composer.addPass(new OutputPass());

composer.render();
```

효과 하나를 추가할 때마다 GPU 비용도 함께 생각합니다.

## 20. 프론트엔드 개발자로서의 최종 판단 기준

Three.js를 잘 쓴다는 것은 효과를 많이 넣는 것이 아닙니다.

```text
사용자가 얻는 가치
      ↓
3D가 실제로 필요한가?
      ↓
필요한 interaction만 설계
      ↓
asset / GPU / mobile 비용 관리
      ↓
DOM UI와 자연스럽게 연결
```

3D는 웹 UI를 대체하는 것이 아니라 **필요한 경험을 강화하는 도구**로 사용합니다.

## 공식 문서 지도

- https://threejs.org/manual/en/fundamentals.html
- https://threejs.org/manual/en/scenegraph.html
- https://threejs.org/manual/en/cameras.html
- https://threejs.org/manual/en/responsive.html
- https://threejs.org/manual/en/materials.html
- https://threejs.org/manual/en/textures.html
- https://threejs.org/manual/en/lights.html
- https://threejs.org/manual/en/shadows.html
- https://threejs.org/manual/en/animation-system.html
- https://threejs.org/manual/en/loading-3d-models.html
- https://threejs.org/manual/en/picking.html
- https://threejs.org/manual/en/rendering-on-demand.html
- https://threejs.org/manual/en/cleanup.html
- https://threejs.org/manual/en/post-processing.html
