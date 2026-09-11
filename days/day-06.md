# Day 06 — Texture와 PBR

## 오늘의 목표

Texture가 단순 "이미지 붙이기"가 아니라 PBR Material의 여러 물리 속성을 제어하는 데이터가 될 수 있음을 이해한다.

## Texture map 종류

```text
map            기본 색상
normalMap      표면 normal 방향을 변형해 굴곡처럼 보이게 함
roughnessMap   픽셀별 거칠기
metalnessMap   픽셀별 금속성
aoMap          주변광 차폐 느낌
emissiveMap    스스로 빛나는 부분
```

## Color Space

색상을 의미하는 texture는 올바른 color space 처리가 중요하다.

```js
texture.colorSpace = THREE.SRGBColorSpace;
```

반대로 normal/roughness/metalness처럼 **색이 아니라 수치 데이터**인 map을 동일한 방식으로 취급하면 안 된다.

## PBR 사고방식

```text
Geometry
 +
Material parameters
 +
Texture maps
 +
Light / Environment
 =
최종 표면
```

`roughness`가 낮다고 무조건 예쁘거나, `metalness`가 높다고 고급스럽게 되는 것이 아니다. 실제 재질의 성질에 맞게 사용한다.

## 오늘 실습

외부 이미지 파일 없이 개념을 확인하기 위해 `src/days/day-06.js`에서는 Canvas로 checker texture를 만들어 `CanvasTexture`로 사용한다.

확인할 것:

- texture 반복 횟수
- wrapping 설정
- roughness / metalness
- texture colorSpace

## 숙제

1. `public/textures/` 폴더를 만들고 직접 texture 하나를 넣어 `TextureLoader`로 불러온다.
2. `RepeatWrapping`을 적용한다.
3. color texture와 normal map이 데이터 의미상 어떻게 다른지 설명한다.
4. 4096×4096 texture를 여러 장 사용하는 것이 왜 모바일에서 문제가 될 수 있는지 생각한다.

### Challenge
무료 PBR texture 세트를 하나 구해서 `map`, `normalMap`, `roughnessMap`까지 연결해 본다. 라이선스도 함께 확인한다.

## 공식 문서

- Textures: https://threejs.org/manual/en/textures.html
- Texture: https://threejs.org/docs/pages/Texture.html
- MeshStandardMaterial: https://threejs.org/docs/pages/MeshStandardMaterial.html
