# Day 04 — Geometry와 Material

## 오늘의 목표

물체의 **모양(Geometry)**과 **표면(Material)**을 분리해서 사고하고, Material마다 Light에 반응하는 방식이 다르다는 것을 이해한다.

## Geometry

대표 기본 Geometry:

```text
BoxGeometry
SphereGeometry
PlaneGeometry
CylinderGeometry
TorusGeometry
TorusKnotGeometry
```

이들은 편리한 생성 API이지만 내부적으로는 `BufferGeometry`의 vertex attribute 데이터를 기반으로 렌더링된다.

## Material

### MeshBasicMaterial
Light 영향을 받지 않는다. 색/Texture 자체를 그대로 보여주고 싶은 경우 유용하다.

### MeshLambertMaterial
비교적 단순한 diffuse lighting.

### MeshPhongMaterial
반짝임(specular highlight) 표현이 가능하다.

### MeshStandardMaterial
PBR metallic-roughness workflow를 사용하는 중요한 실무 Material이다.

```js
new THREE.MeshStandardMaterial({
  roughness: 0.4,
  metalness: 0.8,
});
```

### MeshPhysicalMaterial
Standard보다 clearcoat, transmission 등 더 많은 물리 기반 옵션을 제공하지만 비용도 고려해야 한다.

## Geometry와 Material 재사용

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial();

const a = new THREE.Mesh(geometry, material);
const b = new THREE.Mesh(geometry, material);
```

같은 resource를 여러 Mesh가 공유할 수 있다. 이후 dispose를 할 때도 공유 여부를 생각해야 한다.

## 오늘 실습

`src/days/day-04.js`는 여러 Geometry와 Material을 나란히 보여준다.

다음 값을 바꿔 비교한다.

- `roughness`: 0 ~ 1
- `metalness`: 0 ~ 1
- Light 위치
- Sphere segment 수

## 숙제

1. Box, Sphere, Torus를 화면에 함께 배치한다.
2. 각각 Basic / Standard / Physical Material 중 하나를 사용한다.
3. Standard Material의 roughness와 metalness를 극단값으로 비교한다.
4. `MeshBasicMaterial`에 Light가 필요 없는 이유를 설명한다.

### Challenge
하나의 Geometry를 두 Mesh가 공유하되 Material만 다르게 만들어 비교한다.

## 공식 문서

- Materials: https://threejs.org/manual/en/materials.html
- Geometries: https://threejs.org/manual/en/primitives.html
- MeshStandardMaterial: https://threejs.org/docs/pages/MeshStandardMaterial.html
