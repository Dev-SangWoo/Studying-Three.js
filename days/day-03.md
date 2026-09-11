# Day 03 — Camera와 Responsive 3D

## 오늘의 목표

`PerspectiveCamera`의 `fov`, `aspect`, `near`, `far`를 이해하고 브라우저 크기가 변해도 찌그러지지 않는 Canvas를 만든다.

## PerspectiveCamera

```js
new THREE.PerspectiveCamera(fov, aspect, near, far);
```

- `fov`: 세로 시야각. 커질수록 광각처럼 더 넓게 보인다.
- `aspect`: 화면 가로/세로 비율.
- `near`: 이 거리보다 가까운 것은 잘린다.
- `far`: 이 거리보다 먼 것은 잘린다.

near를 지나치게 작게, far를 지나치게 크게 잡으면 depth precision 문제를 만들 수 있으므로 무조건 `0.0001 ~ 999999`처럼 잡는 것은 좋은 습관이 아니다.

## Responsive가 필요한 이유

CSS로 Canvas 크기만 바뀌는 것과 Renderer의 실제 drawing buffer 크기가 바뀌는 것은 다르다. 화면 크기가 변했는데 Camera의 aspect가 이전 값이면 장면이 눌리거나 늘어나 보인다.

```js
camera.aspect = width / height;
camera.updateProjectionMatrix();
renderer.setSize(width, height);
```

`PerspectiveCamera`의 projection 관련 속성을 수정한 뒤에는 `updateProjectionMatrix()`를 호출해야 한다.

## Pixel Ratio

고해상도 기기에서:

```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

처럼 제한하면 지나치게 많은 픽셀을 그리는 비용을 막는 데 도움이 된다.

## 오늘 실습

`src/days/day-03.js`에서 창 크기를 계속 변경해 본다.

그리고 다음을 바꿔 본다.

- FOV: 25 / 60 / 100
- near: 0.1 / 4
- far: 100 / 6
- camera z 위치

무엇이 "zoom"이고 무엇이 "카메라 이동"인지 비교한다.

## 숙제

1. resize 코드를 직접 지운 뒤 화면이 어떻게 깨지는지 확인한다.
2. 다시 직접 구현한다.
3. `devicePixelRatio` 제한을 제거한 경우와 비교한다.
4. `fov`를 바꾸는 것과 camera `position.z`를 바꾸는 것의 시각적 차이를 설명한다.

### Challenge
브라우저가 세로로 매우 길거나 가로로 매우 길어져도 Object가 화면 밖으로 완전히 사라지지 않게 카메라 거리 또는 FOV를 조절해 본다.

## 공식 문서

- Cameras: https://threejs.org/manual/en/cameras.html
- Responsive Design: https://threejs.org/manual/en/responsive.html
- PerspectiveCamera: https://threejs.org/docs/pages/PerspectiveCamera.html
