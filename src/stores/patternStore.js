import { ref } from 'vue';
import { supabase } from '../supabase.js';

export const usePatternStore = () => {
  // 🔹 Patrón base (temporal)
  const basePattern = ref([
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 220, y: 200 },
    { x: 120, y: 220 },
  ]);

  // 🔹 Guardar puntos en Supabase
  const savePatternPoints = async (patternId) => {
    const rows = basePattern.value.map((p, index) => ({
      pattern_id: patternId,
      x: p.x,
      y: p.y,
      order_index: index, // 🔥 coincide con tu SQL
    }));

    const { error } = await supabase.from('pattern_points').insert(rows);

    if (error) {
      console.error('Error guardando pattern_points:', error);
      throw error;
    }
  };

  return {
    basePattern,
    savePatternPoints,
  };
};
