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
  meta: [
    {
      name: "description",
      content: "Learn and practice with flashcards on QuizDeck.",
    },
    { name: "keywords", content: "flashcards, learning, education, QuizDeck" },
    { property: "og:title", content: "QuizDeck" },
    {
      property: "og:description",
      content: "Learn and practice with flashcards on QuizDeck.",
    },
  ],
});
</script>
