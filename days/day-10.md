# Day 10 — Raycaster와 Picking

## 오늘의 목표

2D 화면의 pointer 위치를 3D ray로 변환해 사용자가 어떤 Object를 가리키거나 클릭했는지 판별한다.

## 좌표 변환

브라우저 pointer 좌표는 pixel 좌표다.

```text
(0, 0) ──────────────→ clientX
  │
  │
  ↓ clientY
```

Three.js `Raycaster.setFromCamera()`에 전달하는 pointer는 NDC(-1 ~ +1) 범위다.

```js
pointer.x = (x / width) * 2 - 1;
pointer.y = -(y / height) * 2 + 1;
```

Y에 minus가 붙는 이유는 DOM screen 좌표와 NDC의 Y 방향이 다르기 때문이다.

## Raycasting

```js
raycaster.setFromCamera(pointer, camera);
const hits = raycaster.intersectObjects(targets, true);
```

hit 결과는 거리 순으로 정렬되며 `object`, `point`, `distance` 등의 정보를 가진다.

## Canvas가 전체 화면이 아닐 때

`window.innerWidth`를 무조건 쓰면 안 된다. Canvas의 `getBoundingClientRect()`를 기준으로 pointer 위치를 계산해야 한다.

## 오늘 실습

`src/days/day-10.js`에서 여러 Sphere를 클릭하면 선택 색상이 바뀐다.

확인할 것:

- hover와 click 차이
- `recursive=true`가 GLB 같은 계층 모델에서 왜 필요한지
- 클릭 대상 배열을 Scene 전체로 잡는 것이 항상 좋은지

## 숙제

1. hover된 Object를 scale up 한다.
2. click된 Object는 선택 상태를 유지한다.
3. 빈 공간을 클릭하면 선택을 해제한다.
4. pointer → NDC → Ray → intersection 흐름을 그림으로 설명한다.

### Challenge
GLB 모델의 특정 child Mesh를 클릭해서 `object.name`을 DOM에 출력한다.

## 공식 문서

- Picking: https://threejs.org/manual/en/picking.html
- Raycaster: https://threejs.org/docs/pages/Raycaster.html
