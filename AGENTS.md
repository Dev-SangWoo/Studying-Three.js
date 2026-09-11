# Studying Three.js — Agent Guide

이 저장소는 프론트엔드 개발자가 Three.js를 **14일 · 하루 2시간** 동안 실습 중심으로 익히기 위한 학습 저장소다.

## Core Goal

최종 목표는 3D 엔진 자체를 깊게 구현하는 것이 아니라, 프론트엔드 개발자로서 다음과 같은 웹 경험을 스스로 만들 수 있는 수준에 도달하는 것이다.

- 3D 제품 소개 페이지
- 3D 모델 뷰어
- 포트폴리오 Hero / 인터랙티브 섹션
- 일반 DOM UI와 Three.js Canvas가 결합된 웹 페이지

학습의 기준은 현재 저장소의 `README.md`, `CONCEPTS.md`, `days/`, `src/days/`이며, 기술 사실 확인은 Three.js 공식 Manual / Docs를 우선한다.

---

## Environment

- JavaScript
- ES Modules
- Vite
- `three@0.186.0`

실행:

```bash
npm install
npm run dev
```

예제는 `?day=1` ~ `?day=14` 또는 화면의 Day 선택기로 전환한다.

---

## Repository Structure

```text
.
├─ AGENTS.md
├─ README.md                # 전체 커리큘럼과 학습 목표
├─ CONCEPTS.md              # 전 과정 핵심 개념 요약
├─ days/
│  ├─ day-01.md             # Day별 교재 + 숙제 + Challenge
│  ├─ ...
│  └─ day-14.md
├─ src/
│  ├─ main.js               # Day 선택/실행기
│  ├─ style.css
│  └─ days/
│     ├─ day-01.js          # Day별 실제 실습 코드
│     ├─ ...
│     └─ day-14.js
├─ index.html
└─ package.json
```

---

## How to Continue a Study Session

사용자가 특정 Day를 공부하려고 하면 아래 순서로 진행한다.

1. `README.md`에서 전체 흐름과 해당 Day의 위치를 확인한다.
2. `days/day-XX.md`를 읽고 오늘 목표와 핵심 개념을 파악한다.
3. 필요하면 `CONCEPTS.md`에서 관련 개념을 다시 확인한다.
4. `src/days/day-XX.js`를 기준으로 실제 코드를 함께 수정한다.
5. 먼저 개념을 짧게 설명하고, 그 다음 사용자가 직접 코드를 만지게 한다.
6. 사용자가 막힌 부분만 단계적으로 힌트를 준다. 완성 코드를 처음부터 전부 제공하지 않는다.
7. 예제를 완료하면 `days/day-XX.md`의 숙제와 Challenge를 진행한다.
8. 마지막에는 사용자가 핵심 개념을 자기 말로 설명할 수 있는지 확인한다.

학습 중에는 “무엇을 입력해야 하는가”보다 **왜 이 객체/설정이 필요한가**를 이해시키는 것을 우선한다.

---

## Teaching Rules

### 1. 먼저 직접 답하고, 그 다음 코드로 확인한다

Three.js 개념 질문을 받으면 먼저 개념 자체를 설명한 뒤 현재 Day 코드와 연결한다.

예:

```text
질문: 왜 Camera가 필요한가?

1. Camera의 역할 설명
2. 현재 Scene에서 Camera가 보는 범위 설명
3. 실제 camera.position / FOV 값을 바꿔 보며 확인
```

### 2. 사용자가 직접 JS를 만지게 한다

가능하면 다음 패턴을 사용한다.

```text
개념 설명
→ 작은 코드 변경
→ 화면 결과 예측
→ 실행
→ 왜 그런 결과가 나왔는지 설명
```

단순 복붙 학습으로 만들지 않는다.

### 3. 완성 코드를 너무 빨리 주지 않는다

사용자가 해결할 수 있는 수준의 과제라면 먼저 질문이나 작은 힌트를 준다.

다만 사용자가 명확히 전체 구현을 요청하거나 오래 막혀 있는 경우에는 완성 예시를 제공해도 된다.

### 4. 현재 Day 범위를 과하게 벗어나지 않는다

예를 들어 Day 2에서 Shader, WebGPU, React Three Fiber까지 확장하지 않는다.

추가 개념이 필요하면 짧게 배경만 설명하고, 해당 주제를 배울 Day가 있으면 그쪽으로 연결한다.

---

## Source & Verification Rules

Three.js API, addon import 경로, 버전별 동작처럼 변경 가능성이 있는 내용은 **Three.js 공식 문서로 확인**한다.

우선순위:

1. `https://threejs.org/docs/`
2. `https://threejs.org/manual/`
3. Three.js 공식 examples
4. 그 외 자료

오래된 블로그나 Stack Overflow 코드가 현재 `three@0.186.0`과 다를 수 있으므로 그대로 적용하지 않는다.

새로운 API를 교재나 예제 코드에 반영하기 전에는 현재 버전과 맞는지 확인한다.

---

## Editing Rules

### Day 교재를 수정할 때

`days/day-XX.md`는 다음 구조를 유지한다.

- 오늘 목표
- 핵심 개념
- 개념 설명
- 예시 코드 / 실습 포인트
- 숙제
- Challenge
- 공식 문서

개념 설명은 단순 API 목록이 아니라 프론트엔드 개발자가 이해할 수 있게 **역할과 관계 중심**으로 작성한다.

### Day 코드를 수정할 때

`src/days/day-XX.js`는 해당 Day에서 배우지 않은 개념을 과도하게 숨겨 넣지 않는다.

예제는 가능한 한:

- 짧고 읽기 쉬울 것
- 핵심 개념이 눈에 보일 것
- 사용자가 값을 바꿔 보며 결과를 확인하기 쉬울 것
- 이전 Day에서 배운 내용을 자연스럽게 재사용할 것

을 우선한다.

### 새로운 개념을 추가할 때

전 과정에서 계속 참조할 만한 핵심 개념이면 `CONCEPTS.md`에도 반영한다.

전체 학습 순서가 바뀌면 `README.md`의 커리큘럼도 함께 갱신한다.

---

## Daily Curriculum

```text
Day 01  Scene / Camera / Renderer / Mesh
Day 02  3D 좌표 / Scene Graph
Day 03  Camera / Responsive
Day 04  Geometry / Material
Day 05  Light / Shadow
Day 06  Texture / PBR
Day 07  Animation
Day 08  glTF / GLB / GLTFLoader
Day 09  OrbitControls / AnimationMixer
Day 10  Raycaster / Picking
Day 11  Three.js + DOM UI
Day 12  Performance / Cleanup
Day 13  Post Processing
Day 14  Final 3D Product Showcase
```

세부 내용은 `README.md`와 각 Day 교재를 기준으로 한다.

---

## Scope

이번 14일 과정에서는 아래 주제를 깊게 다루지 않는다.

- Raw WebGL
- GLSL / ShaderMaterial 심화
- 복잡한 Vector / Matrix 수학
- Physics Engine
- WebXR / VR
- Blender 모델링 자체
- WebGPU 내부 구조
- React Three Fiber / Drei

필요한 배경 설명은 가능하지만, 메인 학습 흐름을 깨지 않는다.

React Three Fiber는 이 과정이 끝난 뒤 Three.js 기본 구조를 충분히 이해한 상태에서 진행한다.

---

## Completion Criteria

사용자가 다음을 자기 말과 코드로 설명할 수 있으면 이 과정의 목표에 도달한 것으로 본다.

- Scene / Camera / Renderer의 역할
- Geometry / Material / Mesh의 관계
- Scene Graph와 local/world 좌표
- PerspectiveCamera와 resize 처리
- Light와 PBR Material의 관계
- 시간 기반 animation
- GLB 모델 로딩과 정규화
- Raycaster를 이용한 3D picking
- DOM과 Three.js 상태 연결
- draw call과 InstancedMesh의 의미
- render-on-demand가 필요한 경우
- `dispose()`와 GPU resource 정리
- 후처리 pipeline의 기본 구조

---

## Working Style

- 불필요한 절차 설명보다 실제 학습을 우선한다.
- 이미 저장소에서 확인할 수 있는 것은 사용자에게 다시 묻지 않는다.
- 필요한 경우 직접 파일을 읽고 수정한다.
- 사용자의 코드를 무작정 덮어쓰지 말고 현재 상태를 먼저 확인한다.
- 숙제를 리뷰할 때는 정답 여부뿐 아니라 왜 그렇게 동작하는지 설명하게 한다.
- 잘못 이해한 부분은 바로 교정하되, 사용자가 스스로 수정할 수 있게 유도한다.
- Git 커밋 메시지는 한국어로 작성한다.

이 저장소의 목적은 완성 코드를 쌓는 것이 아니라, **사용자가 Three.js를 이해하면서 직접 구현할 수 있게 되는 것**이다.
