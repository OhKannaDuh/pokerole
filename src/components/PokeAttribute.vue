<template>
  <div>
    <span>{{ name }}:</span> <span class="dot" v-for="index in max" :key="index" :class="{ base: base >= index }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PokeAttribute',
  props: {
    name: {
      type: String,
      required: true,
    },

    base: {
      type: Number,
      required: true,
    },

    max: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.dot {
  position: relative;
  top: 1px;
  height: 12px;
  width: 12px;
  background-color: #666;
  border-radius: 50%;
  display: inline-block;
  margin-right: 2px;
}

.base {
  background-color: white;
}
</style>
