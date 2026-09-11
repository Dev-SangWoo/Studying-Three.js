# Day 14 — Final Project: 3D Product Showcase

## 오늘의 목표

앞의 개념을 하나의 프론트엔드 페이지에 조합한다. "기능을 많이 넣는 것"보다 **사용자 경험, 코드 구조, 성능을 함께 판단하는 것**이 목표다.

## 프로젝트 요구사항

### 필수

- [ ] GLB/glTF 모델 로딩
- [ ] Loading / Error UI
- [ ] 반응형 Camera + Renderer
- [ ] OrbitControls 또는 목적에 맞는 Camera interaction
- [ ] Light / Material을 사용한 읽기 좋은 제품 표현
- [ ] Raycaster로 최소 한 가지 3D interaction
- [ ] 일반 DOM 설명/UI와 3D 상태 연결
- [ ] 모바일에서도 조작 가능
- [ ] 필요 없는 resource cleanup 고려

### 선택

- [ ] AnimationMixer로 모델 animation
- [ ] 제품 색상 변경
- [ ] Hotspot / label
- [ ] Post-processing
- [ ] render-on-demand
- [ ] 접근성 fallback

## 권장 구조

```text
Product Showcase
├─ DOM
│  ├─ Product Title
│  ├─ Description
│  ├─ Option Buttons
│  └─ Loading / Error State
│
└─ Three.js
   ├─ Scene
   ├─ Camera
   ├─ Renderer
   ├─ Lights
   ├─ GLB Model
   ├─ Controls
   ├─ Raycaster
   └─ optional Post Processing
```

## 구현 순서

완성 화면부터 한 번에 만들지 않는다.

```text
1. Scene / Camera / Renderer
2. Model load
3. Camera framing
4. Light / Material 확인
5. Responsive
6. Controls
7. Picking
8. DOM UI 연결
9. Loading / Error
10. 성능 확인
11. 선택 효과
```

## 오늘 예제

`src/days/day-14.js`는 최종 프로젝트를 시작할 수 있는 작은 Product Viewer 예제다. 완성 답안이 아니라 **확장할 기반 코드**로 사용한다.

## 최종 숙제

자신이 고른 GLB 하나로 3D Product Showcase를 완성한다.

조건:

1. 사용자가 모델을 회전해 볼 수 있다.
2. 클릭 가능한 부분 또는 제품 자체 선택 interaction이 있다.
3. DOM에 제품명과 설명이 존재한다.
4. 최소 두 가지 UI action이 3D 상태를 바꾼다.
5. resize가 정상 동작한다.
6. loading 중 빈 화면만 보이지 않는다.
7. `renderer.info`와 DevTools를 사용해 성능을 한 번 확인한다.
8. "왜 이 페이지에서 3D가 필요한가?"를 한 문단으로 설명한다.

## 자기 점검 질문

- Scene / Camera / Renderer 관계를 코드 없이 설명할 수 있는가?
- Scene Graph를 사용해야 할 상황을 찾을 수 있는가?
- GLB가 너무 크거나 중심이 이상할 때 진단할 수 있는가?
- Pointer click을 3D Object selection으로 변환하는 과정을 설명할 수 있는가?
- 지속 렌더링과 render-on-demand 중 무엇을 선택할지 판단할 수 있는가?
- GPU resource cleanup이 필요한 이유를 아는가?
- 3D 효과가 UX를 돕는지 방해하는지 판단할 수 있는가?

여기까지 가능하면 **프론트엔드 개발자로서 Three.js를 활용하기 위한 기본 체계**를 갖춘 것이다.

## 다음 단계

과정 완료 후 필요에 따라 진행한다.

```text
Three.js 실전
↓
React Three Fiber / Drei
↓
Shader / GLSL
↓
WebGPU / 고급 렌더링 (필요할 때)
```

## 공식 문서

- Three.js Manual: https://threejs.org/manual/
- Three.js Docs: https://threejs.org/docs/
- Loading 3D Models: https://threejs.org/manual/en/loading-3d-models.html
- Picking: https://threejs.org/manual/en/picking.html
- Cleanup: https://threejs.org/manual/en/cleanup.html
