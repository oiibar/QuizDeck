<template>
  <Header />
  <div class="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/Header.vue";
</script>

<style scoped></style>
