# Day 08 — glTF / GLB 모델 불러오기

## 오늘의 목표

직접 만든 primitive가 아닌 실제 3D asset을 `GLTFLoader`로 불러오고, 비동기 로딩과 모델의 크기/중심 문제를 다룬다.

## 왜 glTF / GLB인가?

Three.js 공식 가이드는 가능한 경우 runtime 3D asset에 glTF를 권장한다. mesh, material, texture, skin, animation 등을 웹 전달에 적합한 형태로 담을 수 있다.

- `.gltf`: JSON과 binary/image가 분리될 수 있음
- `.glb`: 여러 데이터를 단일 binary 파일로 묶기 편함

## GLTFLoader

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const gltf = await loader.loadAsync('/models/model.glb');
scene.add(gltf.scene);
```

Loader는 core import와 별도로 addon 경로에서 가져온다.

## 로딩 후 흔한 문제

모델마다 제작 좌표/크기가 다르므로 다음 과정이 자주 필요하다.

```text
load
↓
BoundingBox 계산
↓
center 확인
↓
scale 결정
↓
camera framing
```

```js
const box = new THREE.Box3().setFromObject(model);
const center = box.getCenter(new THREE.Vector3());
const size = box.getSize(new THREE.Vector3());
```

## 오늘 실습

`src/days/day-08.js`는 Three.js 공식 example asset을 로드해 bounding box를 기준으로 center와 scale을 맞춘다.

Network 탭에서 모델 요청이 실제로 얼마나 걸리는지도 확인한다.

## 숙제

1. `public/models/`를 만들고 다른 `.glb` 파일을 넣어 로딩한다.
2. 모델이 너무 크거나 작아도 적당한 크기로 normalize한다.
3. 로딩 중 "Loading..." UI를 표시한다.
4. loader 실패 시 사용자에게 오류 메시지를 보여준다.

### Challenge
모델을 무조건 `scale.set(0.1, 0.1, 0.1)`로 맞추는 대신 BoundingBox 크기를 이용해 목표 크기로 자동 조절한다.

## 공식 문서

- Loading 3D Models: https://threejs.org/manual/en/loading-3d-models.html
- GLTFLoader: https://threejs.org/docs/pages/GLTFLoader.html
- Box3: https://threejs.org/docs/pages/Box3.html
