<template>
  <div class="flex">
    <Header />
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/UI/Header.vue";
</script>

<style scoped></style>
