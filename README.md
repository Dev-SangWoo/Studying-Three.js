# Studying Three.js

프론트엔드 개발자가 웹에서 3D를 실전 활용하기 위한 **14일 · 하루 2시간 · 최대 28시간** 학습 저장소입니다.

- 기준 버전: `three@0.186.0`
- 개발 환경: JavaScript + ES Modules + Vite
- 기준 자료: Three.js 공식 Manual / Docs
- 최종 목표: 3D 제품 소개, 포트폴리오 Hero, 모델 뷰어처럼 **웹 UI와 3D를 결합한 인터랙티브 페이지를 스스로 설계하고 구현**하기

> 이 과정의 목표는 3D 엔진 개발자가 되는 것이 아니라, 프론트엔드 개발자로서 Three.js를 적절하게 활용할 수 있는 수준까지 가는 것입니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 기본적으로 Day 1이 열립니다.

```text
http://localhost:5173/?day=1
http://localhost:5173/?day=2
...
http://localhost:5173/?day=14
```

상단 Day 선택기로도 예제를 바꿀 수 있습니다.

## 학습 방식

매일 약 2시간을 다음처럼 사용합니다.

| 시간 | 내용 |
|---|---|
| 0:00 ~ 0:20 | 공식 문서 읽기 + 오늘 개념 확인 |
| 0:20 ~ 0:45 | 핵심 개념 이해 |
| 0:45 ~ 1:40 | 예제 코드 직접 수정/구현 |
| 1:40 ~ 1:55 | 숙제 / Challenge |
| 1:55 ~ 2:00 | 오늘 배운 내용을 말로 설명 |

중요한 원칙은 **코드를 외우는 것이 아니라 각 객체가 왜 필요한지 설명할 수 있게 되는 것**입니다.

---

## 전체 커리큘럼

| Day | 주제 | 핵심 개념 | 결과물 |
|---:|---|---|---|
| 01 | Three.js 첫걸음 | Scene, Camera, Renderer, Geometry, Material, Mesh | 회전하는 Cube |
| 02 | 3D 공간과 Scene Graph | XYZ, Object3D, Group, parent/children, local/world | 미니 태양계 |
| 03 | Camera & Responsive | PerspectiveCamera, FOV, aspect, near/far, resize | 반응형 3D Canvas |
| 04 | Geometry & Material | Geometry, MeshBasic/Standard/Physical Material | Material 실험실 |
| 05 | Light & Shadow | Ambient, Directional, Point, Spot, Shadow Map | 스튜디오 조명 |
| 06 | Texture & PBR | Texture, colorSpace, map, roughness, metalness | 재질 표현 |
| 07 | Animation | render loop, Clock, deltaTime, elapsedTime | 시간 기반 애니메이션 |
| 08 | glTF / GLB | GLTFLoader, async loading, Box3, model normalize | 실제 모델 뷰어 |
| 09 | Controls & Model Animation | OrbitControls, AnimationMixer, Clip, Action | 애니메이션 모델 뷰어 |
| 10 | 사용자 인터랙션 | Pointer NDC, Raycaster, Picking | 클릭 가능한 3D |
| 11 | 3D + DOM UI | Canvas overlay, UI state, CSS2D 개념 | 3D 웹 섹션 |
| 12 | 성능 & Cleanup | draw call, InstancedMesh, render-on-demand, dispose | 최적화 예제 |
| 13 | Post Processing | EffectComposer, RenderPass, Bloom, OutputPass | 후처리 화면 |
| 14 | Final Project | Loader + Controls + Picking + UI + 최적화 | 3D Product Showcase |

---

## 저장소 구조

```text
.
├─ README.md                 # 전체 커리큘럼
├─ CONCEPTS.md               # 전 과정 핵심 개념 요약
├─ days/
│  ├─ day-01.md              # 그날의 교재 + 숙제
│  ├─ ...
│  └─ day-14.md
├─ src/
│  ├─ main.js                # Day 예제 선택/실행
│  ├─ style.css
│  └─ days/
│     ├─ day-01.js           # 실제 수정할 예제 코드
│     ├─ ...
│     └─ day-14.js
├─ index.html
└─ package.json
```

## 2주 뒤 체크할 수 있어야 하는 것

아래 질문에 코드와 말로 답할 수 있으면 성공입니다.

- `Scene`, `Camera`, `Renderer`는 각각 왜 필요한가?
- `Geometry`, `Material`, `Mesh`의 관계는 무엇인가?
- 부모-자식 Scene Graph가 좌표에 어떤 영향을 주는가?
- 브라우저 resize 시 Camera와 Renderer를 왜 둘 다 조정하는가?
- PBR Material에서 light, roughness, metalness, texture가 어떻게 상호작용하는가?
- 프레임 수가 아니라 시간 기준으로 animation을 만들어야 하는 이유는?
- GLB 모델을 로딩하고 크기/중심을 정규화하려면 어떻게 하는가?
- 화면 좌표의 마우스 위치로 3D Object를 어떻게 선택하는가?
- 항상 60/120FPS로 렌더링하지 않아도 되는 페이지는 어떤 경우인가?
- `dispose()`가 왜 필요한가?
- 많은 동일 객체를 `InstancedMesh`로 처리하면 무엇이 좋아지는가?
- Three.js Canvas와 일반 DOM UI를 어떻게 연결할 것인가?

## 이번 과정에서 깊게 다루지 않는 것

학습 범위를 28시간 안에 유지하기 위해 아래 내용은 후속 과정으로 미룹니다.

- Raw WebGL
- GLSL / ShaderMaterial 심화
- 복잡한 Vector / Matrix 수학
- Physics Engine
- WebXR / VR
- Blender 모델링 자체
- WebGPU 내부 구조
- React Three Fiber / Drei

React Three Fiber는 Three.js의 Scene, Mesh, Material, Camera, Loader 구조를 이해한 뒤 배우는 것을 권장합니다.

## 공식 문서

- Fundamentals: https://threejs.org/manual/en/fundamentals.html
- Installation: https://threejs.org/manual/en/installation.html
- Scene Graph: https://threejs.org/manual/en/scenegraph.html
- Cameras: https://threejs.org/manual/en/cameras.html
- Responsive Design: https://threejs.org/manual/en/responsive.html
- Materials: https://threejs.org/manual/en/materials.html
- Textures: https://threejs.org/manual/en/textures.html
- Lights: https://threejs.org/manual/en/lights.html
- Shadows: https://threejs.org/manual/en/shadows.html
- Animation System: https://threejs.org/manual/en/animation-system.html
- Loading 3D Models: https://threejs.org/manual/en/loading-3d-models.html
- Picking: https://threejs.org/manual/en/picking.html
- Rendering on Demand: https://threejs.org/manual/en/rendering-on-demand.html
- Cleanup: https://threejs.org/manual/en/cleanup.html
- Post Processing: https://threejs.org/manual/en/post-processing.html
