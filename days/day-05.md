# Day 05 — Light와 Shadow

## 오늘의 목표

Light 종류의 차이를 알고, Shadow가 단순 CSS 효과가 아니라 **추가 렌더링 비용을 가진 3D 계산**임을 이해한다.

## 주요 Light

### AmbientLight
모든 방향에서 균일하게 더해지는 빛. 방향/그림자 개념이 없다.

### HemisphereLight
하늘색과 바닥색을 이용해 환경광 같은 느낌을 줄 수 있다.

### DirectionalLight
태양처럼 매우 멀리서 한 방향으로 비추는 빛을 표현하기 좋다.

### PointLight
전구처럼 한 점에서 여러 방향으로 퍼진다.

### SpotLight
특정 방향으로 원뿔 모양의 빛을 만든다.

## Shadow

기본 설정 흐름:

```js
renderer.shadowMap.enabled = true;
light.castShadow = true;
mesh.castShadow = true;
floor.receiveShadow = true;
```

Shadow를 만드는 Light는 Scene을 Light 관점에서도 렌더해야 하므로 비용이 생긴다. `shadow.mapSize`, shadow camera 범위를 무작정 크게 잡지 않는다.

## 오늘 실습

`src/days/day-05.js`는 바닥과 여러 Object를 DirectionalLight로 비추는 스튜디오 Scene이다.

관찰:

- Light 위치 변경
- AmbientLight intensity 0 / 높은 값
- `castShadow` 끄기
- `receiveShadow` 끄기

## 숙제

1. DirectionalLight 대신 PointLight를 적용해 차이를 확인한다.
2. 그림자가 필요한 Mesh와 필요 없는 Mesh를 구분해서 설정한다.
3. Light 두 개를 추가하고 무조건 모두 shadow를 켜는 것이 왜 나쁜지 설명한다.

### Challenge
`CameraHelper`로 DirectionalLight의 shadow camera 범위를 시각화하고 필요한 영역만 포함하도록 조정한다.

## 공식 문서

- Lights: https://threejs.org/manual/en/lights.html
- Shadows: https://threejs.org/manual/en/shadows.html
- DirectionalLight: https://threejs.org/docs/pages/DirectionalLight.html
