<template>
  <NuxtLoadingIndicator />
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useSeoMeta } from "#app";

useSeoMeta({
  title: "QuizDeck",
  description: "A flashcard app",
});
</script>
