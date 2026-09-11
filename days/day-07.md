# Day 07 — Animation과 Render Loop

## 오늘의 목표

"프레임마다 조금 움직인다"가 아니라 **시간을 기준으로 움직이는 animation**을 만든다.

## Render Loop

Animation이 있는 Scene은 계속 상태를 갱신하고 다시 렌더한다.

```text
frame
 ↓
update
 ↓
render
 ↓
next frame
```

Three.js에서는 `renderer.setAnimationLoop()`를 사용할 수 있다.

## Frame 기반의 문제

```js
mesh.rotation.y += 0.01;
```

이 코드는 1초에 몇 frame이 실행되는지에 따라 1초 동안의 회전량이 달라질 수 있다.

## Delta Time

```js
const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  const delta = clock.getDelta();
  mesh.rotation.y += 1.2 * delta;
  renderer.render(scene, camera);
});
```

`1.2`를 "초당 회전량"으로 사고할 수 있다.

## Elapsed Time

주기적인 움직임을 만들 때 전체 경과 시간도 유용하다.

```js
const elapsed = clock.getElapsedTime();
mesh.position.y = Math.sin(elapsed) * 0.5;
```

## 오늘 실습

`src/days/day-07.js`는 회전 + 위아래 움직임을 시간 기반으로 처리한다.

Browser DevTools로 성능을 낮추거나 다른 주사율 환경에서도 움직임이 시간 기준으로 유지되는지 생각해 본다.

## 숙제

1. Cube가 초당 정확히 한 바퀴 회전하도록 만든다.
2. `Math.sin()`으로 부드럽게 위아래 이동시킨다.
3. 두 Object의 animation 속도를 다르게 한다.
4. 왜 `+= 0.01`보다 `speed * delta`가 의도를 표현하기 좋은지 설명한다.

### Challenge
`elapsedTime`을 이용해 원 궤도로 도는 Object를 만든다.

```js
x = Math.cos(t) * radius;
z = Math.sin(t) * radius;
```

## 1주차 체크

지금까지 빈 파일에서 다음을 조립할 수 있는지 확인한다.

```text
Scene / Camera / Renderer
Mesh
Transform / Scene Graph
Responsive
Material / Light / Texture
Time-based Animation
```

## 공식 문서

- Fundamentals: https://threejs.org/manual/en/fundamentals.html
- Clock: https://threejs.org/docs/pages/Clock.html
- WebGLRenderer.setAnimationLoop: https://threejs.org/docs/pages/WebGLRenderer.html
