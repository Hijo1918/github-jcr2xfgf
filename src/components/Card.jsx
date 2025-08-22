<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 v-if="title" class="text-xl font-semibold text-gray-900 mb-4">{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
  },
};
</script>
