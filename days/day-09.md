# Day 09 — OrbitControls와 모델 Animation

## 오늘의 목표

사용자가 Camera를 직접 돌려보는 3D Viewer를 만들고, GLB에 포함된 animation clip을 `AnimationMixer`로 재생한다.

## OrbitControls

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
```

대표 동작:

- Orbit: target 중심 회전
- Dolly/Zoom: 가까워지거나 멀어짐
- Pan: target/Camera 평행 이동

`enableDamping`이나 `autoRotate`를 사용하는 경우 loop에서 `controls.update()`가 필요하다.

## 사용자 경험 제한

제품 Viewer라면 사용자가 카메라를 물체 내부로 넣거나 무한히 멀어지는 것을 막는 편이 좋다.

```js
controls.minDistance = 2;
controls.maxDistance = 8;
controls.enablePan = false;
```

## AnimationMixer

```text
AnimationClip = 모델에 들어있는 animation 데이터
AnimationMixer = 특정 Object의 animation 재생 관리자
AnimationAction = clip의 실제 재생 상태
```

```js
const mixer = new THREE.AnimationMixer(model);
const action = mixer.clipAction(gltf.animations[0]);
action.play();
```

loop에서는:

```js
mixer.update(delta);
```

## 오늘 실습

`src/days/day-09.js`에서 OrbitControls와 공식 animated GLB를 함께 사용한다.

## 숙제

1. `minDistance`, `maxDistance`를 제품 Viewer에 맞게 조절한다.
2. pan을 끄고 damping을 적용한다.
3. GLB 안의 animation 이름 목록을 console에 출력한다.
4. 첫 clip이 아닌 다른 clip을 재생한다.

### Challenge
화면에 `<select>`를 만들어 animation clip을 선택하면 기존 action을 stop/fade하고 새 action이 재생되게 만든다.

## 공식 문서

- OrbitControls: https://threejs.org/docs/pages/OrbitControls.html
- Animation System: https://threejs.org/manual/en/animation-system.html
- AnimationMixer: https://threejs.org/docs/pages/AnimationMixer.html
