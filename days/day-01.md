# Day 01 — Three.js 첫걸음

## 오늘의 목표

Three.js의 가장 기본 구조인 `Scene → Camera → Renderer`와 `Geometry + Material → Mesh`를 이해하고 회전하는 Cube를 직접 만든다.

## 핵심 개념

### Scene
3D 세계의 루트 컨테이너다. Mesh, Light, Group 등을 Scene에 추가한다.

```js
const scene = new THREE.Scene();
scene.add(mesh);
```

### Camera
Scene 전체를 자동으로 보여주는 것이 아니라 **어떤 관점에서 어느 범위를 볼지** 결정한다. 이번 과정에서는 주로 `PerspectiveCamera`를 사용한다.

### Renderer
Scene과 Camera를 받아 브라우저 Canvas에 실제 픽셀을 그린다.

```js
renderer.render(scene, camera);
```

### Geometry / Material / Mesh

```text
Geometry = 모양 데이터
Material = 표면 표현
Mesh = Geometry + Material
```

같은 Geometry와 Material을 여러 Mesh가 공유할 수도 있다.

## 오늘 코드에서 볼 것

`src/days/day-01.js`

1. Scene 생성
2. PerspectiveCamera 생성 후 `z` 방향으로 이동
3. BoxGeometry 생성
4. MeshNormalMaterial 생성
5. Mesh를 Scene에 추가
6. WebGLRenderer 생성
7. render loop에서 회전 후 렌더

코드를 실행한 뒤 다음 값을 직접 바꿔 본다.

- Camera `position.z`: 2, 5, 10
- Box 크기
- `rotation.x`, `rotation.y` 속도
- Material을 `MeshBasicMaterial`로 교체

## 생각해 볼 질문

- Camera가 원점 `(0, 0, 0)`에 Cube와 같이 있으면 왜 문제가 생길까?
- `renderer.render(scene, camera)`에서 Scene과 Camera 둘 다 필요한 이유는?
- `Geometry`와 `Mesh`는 왜 같은 개념이 아닐까?

## 숙제

1. Cube를 하나 더 추가한다.
2. 두 Cube의 위치와 크기를 다르게 만든다.
3. 두 Cube가 서로 다른 방향/속도로 회전하게 만든다.
4. 아래 내용을 코드 주석 없이 말로 설명해 본다.
   - Scene
   - Camera
   - Renderer
   - Geometry
   - Material
   - Mesh

### Challenge
`MeshNormalMaterial`을 사용하지 않고 Light 없이도 보이는 Material을 찾아 적용해 본다.

## 완료 기준

빈 JS 파일을 보고 아래 흐름을 스스로 다시 만들 수 있다.

```text
Scene
Camera
Renderer
Geometry
Material
Mesh
scene.add(mesh)
render
```

## 공식 문서

- Fundamentals: https://threejs.org/manual/en/fundamentals.html
- Installation: https://threejs.org/manual/en/installation.html
- WebGLRenderer: https://threejs.org/docs/pages/WebGLRenderer.html
