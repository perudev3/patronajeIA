<template>
  <q-page class="q-pa-md">
    <h1>MVP Patronaje Digital</h1>

    <q-btn
      label="Crear Nuevo Patrón"
      color="primary"
      to="/editor"
      class="q-mb-md"
    />

    <q-list bordered padding>
      <q-item
        v-for="p in patterns"
        :key="p.id"
        clickable
        @click="openPattern(p)"
      >
        <q-item-section>{{ p.name }}</q-item-section>
        <q-item-section side>{{
          new Date(p.created_at).toLocaleString()
        }}</q-item-section>
      </q-item>
      <q-item v-if="patterns.length === 0">
        <q-item-section>No hay patrones aún</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePatternStore } from '../stores/patternStore.js';

const router = useRouter();
const patterns = ref([]);
let patternStore = null;
const userId = '11111111-1111-1111-1111-111111111111';

onMounted(async () => {
  patternStore = usePatternStore();
  await patternStore.fetchPatterns(userId);
  patterns.value = patternStore.patterns;
});

function openPattern(pattern) {
  patternStore.selectPattern(pattern);
  router.push('/editor');
}
</script>
