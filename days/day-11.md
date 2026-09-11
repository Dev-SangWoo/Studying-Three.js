# Day 11 — Three.js와 DOM UI 연결

## 오늘의 목표

Three.js Canvas를 웹 전체로 착각하지 않고 **일반 HTML/CSS UI와 3D Scene이 상태와 이벤트를 주고받는 구조**를 만든다.

## 실무 구조

```text
DOM UI
 ├─ 제품명
 ├─ 설명
 ├─ 색상 버튼
 └─ 구매 버튼
      ↕ event / state
Three.js
 ├─ Camera
 ├─ Model
 └─ Material
```

3D는 버튼, 텍스트, 접근성 있는 UI를 모두 대체하기보다 필요한 시각/interaction을 담당하게 하는 편이 일반적으로 좋다.

## DOM → Three.js

```js
button.addEventListener('click', () => {
  material.color.set('#ff3355');
});
```

## Three.js → DOM

```js
const hits = raycaster.intersectObjects(products);
info.textContent = hits[0].object.userData.description;
```

`userData`에는 application에서 필요한 메타데이터를 넣을 수 있다.

## 3D 위치에 HTML Label 붙이기

Three.js addon의 `CSS2DRenderer`를 이용하면 Object 위치와 HTML label을 연결할 수 있다. 다만 오늘은 원리를 이해하기 위해 DOM overlay + picking부터 다룬다.

## 오늘 실습

`src/days/day-11.js`에서는 색상 버튼이 3D Object의 Material을 바꾸고, 3D Object를 클릭하면 DOM 설명이 바뀐다.

## 숙제

1. 3개의 색상 버튼을 만든다.
2. 현재 선택 색상을 DOM 텍스트에도 표시한다.
3. 3D Object click 시 제품 설명 영역을 업데이트한다.
4. Canvas가 로딩 실패해도 핵심 텍스트/버튼은 사용할 수 있게 UI를 설계해 본다.

### Challenge
`CSS2DRenderer`로 Object 위에 이름 label을 붙인다.

## 완료 기준

"Three.js app"을 Canvas 하나가 아니라 아래처럼 생각할 수 있다.

```text
Web Application
├─ Accessible DOM UI
├─ Application State
└─ 3D Rendering Layer
```

## 공식 문서

- CSS2DRenderer: https://threejs.org/docs/pages/CSS2DRenderer.html
- Picking: https://threejs.org/manual/en/picking.html
