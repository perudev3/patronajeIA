<script setup>
import { ref, computed } from 'vue';

/* =========================
   ESTADO PRINCIPAL
========================= */

const points = ref([
  { id: 1, x: 100, y: 100 },
  { id: 2, x: 200, y: 100 },
  { id: 3, x: 200, y: 200 },
  { id: 4, x: 100, y: 200 },
]);

const selectedPoint = ref(null);
const draggingPoint = ref(null);

/* =========================
   SVG PATH
========================= */

const pathData = computed(() => {
  if (points.value.length === 0) return '';
  const start = points.value[0];
  let d = `M ${start.x} ${start.y}`;
  points.value.slice(1).forEach((p) => {
    d += ` L ${p.x} ${p.y}`;
  });
  d += ' Z';
  return d;
});

/* =========================
   DRAG DE PUNTOS
========================= */

const startDrag = (point) => {
  draggingPoint.value = point;
};

const onMouseMove = (e) => {
  if (!draggingPoint.value) return;
  const rect = e.currentTarget.getBoundingClientRect();
  draggingPoint.value.x = Math.round(e.clientX - rect.left);
  draggingPoint.value.y = Math.round(e.clientY - rect.top);
};

const stopDrag = () => {
  draggingPoint.value = null;
};

/* =========================
   GUARDAR / CARGAR PATRÓN
========================= */

const savePattern = () => {
  localStorage.setItem('pattern_points', JSON.stringify(points.value));
  alert('Patrón guardado');
};

const loadPattern = () => {
  const data = localStorage.getItem('pattern_points');
  if (!data) return alert('No hay patrón guardado');
  points.value = JSON.parse(data);
};

/* =========================
   EXPORTAR SVG
========================= */

const exportSVG = () => {
  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
  <path d="${pathData.value}" fill="none" stroke="black" stroke-width="2"/>
</svg>
  `;
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'patron.svg';
  a.click();

  URL.revokeObjectURL(url);
};

/* =========================
   🔹 NUEVO: REGLAS POR EMPRESA
========================= */

const companyId = ref('empresa_demo');

const sizeRules = ref([
  { size: 'S', dx: -5, dy: -5 },
  { size: 'M', dx: 0, dy: 0 },
  { size: 'L', dx: 5, dy: 5 },
]);

const saveRules = () => {
  localStorage.setItem(
    `size_rules_${companyId.value}`,
    JSON.stringify(sizeRules.value)
  );
  alert('Reglas guardadas para la empresa');
};

const loadRules = () => {
  const data = localStorage.getItem(`size_rules_${companyId.value}`);
  if (!data) return alert('No hay reglas para esta empresa');
  sizeRules.value = JSON.parse(data);
};
</script>

<template>
  <div class="editor-container">
    <div class="left-panel">
      <svg
        width="600"
        height="400"
        class="canvas"
        @mousemove="onMouseMove"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
      >
        <!-- GRID PROFESIONAL -->
        <defs>
          <pattern
            id="gridSmall"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#e5e5e5"
              stroke-width="1"
            />
          </pattern>

          <pattern
            id="gridLarge"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="url(#gridSmall)" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="#cfcfcf"
              stroke-width="1.5"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#gridLarge)" />

        <path :d="pathData" fill="none" stroke="#000" stroke-width="2" />

        <circle
          v-for="p in points"
          :key="p.id"
          :cx="p.x"
          :cy="p.y"
          r="6"
          fill="red"
          @mousedown="startDrag(p)"
          @click="selectedPoint = p"
        />
      </svg>
    </div>

    <div class="right-panel">
      <h3>Puntos</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>X</th>
            <th>Y</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in points"
            :key="p.id"
            :class="{ selected: selectedPoint?.id === p.id }"
          >
            <td>{{ p.id }}</td>
            <td><input type="number" v-model.number="p.x" /></td>
            <td><input type="number" v-model.number="p.y" /></td>
          </tr>
        </tbody>
      </table>

      <div class="actions">
        <button @click="savePattern">Guardar</button>
        <button @click="loadPattern">Cargar</button>
        <button @click="exportSVG">Exportar SVG</button>
      </div>

      <!-- 🔹 NUEVO BLOQUE -->
      <hr />

      <h3>Reglas por empresa</h3>

      <label>Empresa</label>
      <input v-model="companyId" />

      <table>
        <thead>
          <tr>
            <th>Talla</th>
            <th>ΔX</th>
            <th>ΔY</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in sizeRules" :key="r.size">
            <td>{{ r.size }}</td>
            <td><input type="number" v-model.number="r.dx" /></td>
            <td><input type="number" v-model.number="r.dy" /></td>
          </tr>
        </tbody>
      </table>

      <div class="actions">
        <button @click="saveRules">Guardar reglas</button>
        <button @click="loadRules">Cargar reglas</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor-container {
  display: flex;
  gap: 16px;
}

.canvas {
  border: 1px solid #ccc;
  background: #fff;
}

.right-panel {
  width: 260px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 4px;
  text-align: center;
}

input {
  width: 60px;
}

.selected {
  background: #eef;
}

.actions {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

button {
  padding: 6px;
  cursor: pointer;
}
</style>
