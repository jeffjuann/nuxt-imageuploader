<script setup lang="ts">
  import { defineProps } from 'vue';

  const { title, description } = defineProps({
    title: String,
    description: String
  });
</script>

<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow p-4">
    <div class="w-full flex flex-col text-center mb-3">
      <h4 class="text-2xl font-semibold">{{ title }}</h4>
      <p class="text-sm text-neutral-600">{{ description }}</p>
    </div>
    <slot />
  </div>
</template>