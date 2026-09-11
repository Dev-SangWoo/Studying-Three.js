# Day 12 — 성능 최적화와 Cleanup

## 오늘의 목표

3D 성능을 "JS가 느리다" 하나로 보지 않고 CPU/GPU/Memory/Network/Draw Call 관점에서 생각한다.

## 먼저 측정할 것

```text
FPS / frame time
Draw calls
Triangles
Texture memory
Asset size
Pixel ratio
Shadow / post-processing 비용
```

`renderer.info`에서도 draw call, triangle 등 일부 정보를 확인할 수 있다.

## 많은 동일 Object

동일 Geometry/Material의 Object가 매우 많다면 각각 Mesh로 만드는 대신 `InstancedMesh`를 고려한다.

```js
const instances = new THREE.InstancedMesh(geometry, material, count);
```

각 instance의 transform matrix를 바꾸면서 여러 물체를 적은 draw call로 표현할 수 있다.

## Render on Demand

모든 페이지가 매 frame 변하는 것은 아니다. 정적인 모델 Viewer라면:

```text
초기 load → render
controls change → render
resize → render
UI 변경 → render
그 외 → 쉬기
```

처럼 필요한 순간에만 render할 수 있다.

## Dispose

Three.js의 GPU resource는 application이 책임지고 해제해야 하는 경우가 있다.

```js
geometry.dispose();
material.dispose();
texture.dispose();
renderer.dispose();
```

SPA에서 route를 이동할 때 이전 Scene resource가 계속 남지 않게 해야 한다.

## 오늘 실습

`src/days/day-12.js`는 `InstancedMesh`로 많은 Cube를 그린다. `renderer.info.render.calls`를 console에서 확인한다.

## 숙제

1. 동일 Cube 수백 개를 각각 `Mesh`로 만든 버전과 InstancedMesh 버전을 비교한다.
2. pixel ratio를 1 / 2 / devicePixelRatio로 비교한다.
3. animation이 없는 Scene을 render-on-demand 방식으로 바꾼다.
4. 페이지 제거 시 dispose해야 할 resource 목록을 작성한다.

### Challenge
직접 작은 `disposeObject(root)` 유틸을 만들어 hierarchy의 Geometry/Material을 순회 정리한다. 공유 resource를 중복 dispose하는 문제도 생각해 본다.

## 공식 문서

- Optimizing Lots of Objects: https://threejs.org/manual/en/optimize-lots-of-objects.html
- Rendering on Demand: https://threejs.org/manual/en/rendering-on-demand.html
- Cleanup: https://threejs.org/manual/en/cleanup.html
- InstancedMesh: https://threejs.org/docs/pages/InstancedMesh.html
