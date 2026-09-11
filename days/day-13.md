# Day 13 — Post Processing

## 오늘의 목표

Scene을 바로 화면에 끝내지 않고 여러 후처리 Pass를 거쳐 최종 이미지를 만드는 구조를 이해한다.

## 기본 구조

```text
Scene + Camera
      ↓
 RenderPass
      ↓
 Effect Pass
      ↓
 OutputPass
      ↓
    Screen
```

`EffectComposer`는 여러 Pass를 순서대로 관리한다.

```js
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(effectPass);
composer.addPass(new OutputPass());
```

이후 일반 `renderer.render()` 대신:

```js
composer.render();
```

## Bloom

밝은 영역 주변에 빛이 번지는 느낌을 준다. 효과를 강하게 넣는 것보다 왜 필요한지, 어떤 요소에만 시선을 집중시키려는지 먼저 결정한다.

## 성능

Post-processing은 render target과 추가 pixel 연산을 사용한다. 모바일, 고해상도, 큰 pixel ratio에서는 특히 비용이 커질 수 있다.

효과를 추가할 때:

```text
디자인 가치가 있는가?
↓
낮은 성능 기기에서도 괜찮은가?
↓
강도/해상도를 줄일 수 있는가?
```

순으로 생각한다.

## 오늘 실습

`src/days/day-13.js`는 emissive Object에 Bloom을 적용한다.

변경할 값:

- bloom strength
- threshold
- radius
- renderer pixel ratio

## 숙제

1. Bloom을 끈 화면과 비교한다.
2. 너무 강한 Bloom을 의도적으로 만든 뒤 적당한 값으로 줄인다.
3. EffectComposer 사용 시 resize에서 무엇을 추가로 조정해야 하는지 확인한다.
4. Post-processing이 제품 UI의 가독성을 방해하지 않도록 기준을 작성한다.

### Challenge
GlitchPass 같은 다른 공식 addon Pass를 잠깐 적용한 뒤, 실제 제품 페이지에 필요한 효과인지 판단하고 제거/유지 이유를 적는다.

## 공식 문서

- Post Processing: https://threejs.org/manual/en/post-processing.html
- EffectComposer: https://threejs.org/docs/pages/EffectComposer.html
- UnrealBloomPass: https://threejs.org/docs/pages/UnrealBloomPass.html
