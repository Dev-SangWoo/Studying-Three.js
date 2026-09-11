import './style.css';

const DAY_COUNT = 14;
const modules = import.meta.glob('./days/day-*.js');
const params = new URLSearchParams(window.location.search);
const requestedDay = Number(params.get('day') ?? 1);
const day = Math.min(DAY_COUNT, Math.max(1, Number.isFinite(requestedDay) ? requestedDay : 1));
const dayKey = String(day).padStart(2, '0');

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="study-nav">
    <strong>Three.js Study</strong>
    <select id="day-select" aria-label="학습 Day 선택">
      ${Array.from({ length: DAY_COUNT }, (_, index) => {
        const value = index + 1;
        return `<option value="${value}" ${value === day ? 'selected' : ''}>Day ${String(value).padStart(2, '0')}</option>`;
      }).join('')}
    </select>
  </div>
  <main id="scene"></main>
`;

document.querySelector('#day-select').addEventListener('change', (event) => {
  const nextDay = event.target.value;
  window.location.search = `?day=${nextDay}`;
});

const sceneRoot = document.querySelector('#scene');
const modulePath = `./days/day-${dayKey}.js`;
const loadModule = modules[modulePath];

if (!loadModule) {
  sceneRoot.innerHTML = `<div class="loading">Day ${dayKey} 예제가 아직 없습니다.</div>`;
} else {
  const { default: mount } = await loadModule();
  mount(sceneRoot);
}
