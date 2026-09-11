# Day 02 — 3D 공간과 Scene Graph

## 오늘의 목표

`position`, `rotation`, `scale`을 이해하고 부모-자식 관계가 만드는 **local space / world space**를 체감한다.

## Transform

모든 Object3D 계열 객체는 기본적으로 transform을 가진다.

```js
object.position.set(x, y, z);
object.rotation.set(x, y, z);
object.scale.set(x, y, z);
```

Three.js에서 회전값은 radian이다.

```js
Math.PI        // 180도
Math.PI / 2    // 90도
```

## Scene Graph

3D Scene은 평평한 배열이 아니라 계층 구조로 구성할 수 있다.

```text
Scene
└─ Sun
   └─ EarthOrbit
      ├─ Earth
      └─ MoonOrbit
         └─ Moon
```

자식의 transform은 부모 기준이다. `EarthOrbit`가 회전하면 그 아래 Earth와 Moon도 함께 움직인다.

이 구조의 장점은 "달이 태양 주위를 어떤 복잡한 곡선으로 움직이는가"를 직접 계산하지 않고, **달은 지구 주변만 생각하도록 역할을 분리할 수 있다는 것**이다.

## Group과 Object3D

`Group`은 여러 Object3D를 논리적으로 묶는 데 편리하다. 실제로 그려지는 Geometry가 없어도 transform의 기준점(pivot) 역할을 할 수 있다.

```js
const pivot = new THREE.Group();
scene.add(pivot);
pivot.add(mesh);
```

## 오늘 실습

`src/days/day-02.js`는 간단한 태양-지구-달 구조를 만든다.

확인할 것:

- `earthOrbit.rotation.y`를 바꾸면 무엇이 움직이는가?
- `earth.rotation.y`를 바꾸는 것과 어떤 차이가 있는가?
- Moon의 `position.x`는 무엇을 기준으로 한 값인가?

## 숙제

1. 태양계에 두 번째 행성을 추가한다.
2. 행성마다 공전 속도를 다르게 한다.
3. 두 번째 행성에도 위성 하나를 추가한다.
4. `Group` 없이 모든 world position을 직접 계산한다면 왜 복잡해지는지 설명한다.

### Challenge
`AxesHelper`를 Sun, EarthOrbit, MoonOrbit에 각각 추가해 local axis가 어떻게 변하는지 관찰한다.

## 완료 기준

다음을 구분할 수 있다.

```text
자전 = 자신의 transform 변경
공전 = 부모/pivot의 transform을 이용
local position = 부모 좌표계 기준
world position = 최종 Scene 기준 위치
```

## 공식 문서

- Scene Graph: https://threejs.org/manual/en/scenegraph.html
- Object3D: https://threejs.org/docs/pages/Object3D.html
- Group: https://threejs.org/docs/pages/Group.html
