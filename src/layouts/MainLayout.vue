<template>
<q-layout view="hHh lpR fFf" class="bg-main">

  <!-- Top bar -->
  <q-header elevated class="bg-panel text-white">
    <q-toolbar>
      <q-btn flat label="File" />
      <q-btn flat label="Edit" />
      <q-btn flat label="View" />
      <q-btn flat label="Export" />

      <q-space />

      <q-btn outline label="Save" class="q-mr-sm" />
      <q-btn color="primary" label="Export" />
    </q-toolbar>
  </q-header>

  <!-- Left tools -->
  <q-drawer show-if-above width="260" class="bg-panel text-white">
    <div class="q-pa-md">
      <h6>Tools</h6>
      <q-list dense>
        <q-item clickable v-for="tool in tools" :key="tool">
          <q-item-section>{{ tool }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-drawer>

  <!-- Right simulation -->
  <q-drawer side="right" show-if-above width="300" class="bg-panel text-white">
    <div class="q-pa-md">
      <h6>Simulation</h6>
      <q-img src="/mock-dress.png" ratio="3/4" />
      <q-slider label="Fit Tension" />
    </div>
  </q-drawer>

  <!-- Main canvas -->
  <q-page-container>
    <router-view />
  </q-page-container>

</q-layout>
</template>

<script setup>
const tools = [
'Select',
'Point Edit',
'Add Point',
'Cut Line',
'Seam Allowance',
'Notch',
'Curve'
]
</script>

<style scoped>
.bg-main {
background: var(--bg-main);
}
.bg-panel {
background: var(--bg-panel);
}
</style>
