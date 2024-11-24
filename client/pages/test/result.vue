<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <div class="text-5xl font-bold text-center mb-6">
      <h1>Test Results</h1>
    </div>

    <div class="mb-8 text-center">
      <p class="text-xl font-semibold">
        You got {{ correctCount }} out of {{ flashcards.length }} correct!
      </p>
      <p class="text-lg text-gray-600">
        {{ ((correctCount / flashcards.length) * 100).toFixed(2) }}% accuracy
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <div
        v-for="(flashcard, index) in flashcards"
        :key="flashcard.question"
        class="p-4 border rounded-lg shadow-md"
      >
        <p class="font-semibold text-lg">
          {{ index + 1 }}. {{ flashcard.question }}
        </p>
        <p
          :class="[
            'mt-2',
            getUserAnswer(flashcard.question) === flashcard.answer
              ? 'text-green-600'
              : 'text-red-600',
          ]"
        >
          Your Answer: {{ getUserAnswer(flashcard.question) || "No answer" }}
        </p>
        <p class="text-gray-600">Correct Answer: {{ flashcard.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import type { Flashcard } from "~/types/types";

const route = useRoute();

const flashcards = ref<Flashcard[]>(
  JSON.parse((route.query.flashcards as string) || "[]")
);
const userAnswers = ref<{ question: string; answer: string }[]>(
  JSON.parse((route.query.userAnswers as string) || "[]")
);

const getUserAnswer = (question: string) => {
  const answerObj = userAnswers.value.find(
    (item) => item.question === question
  );
  return answerObj ? answerObj.answer : null;
};

const correctCount = computed(() =>
  flashcards.value.reduce(
    (count, flashcard) =>
      getUserAnswer(flashcard.question) === flashcard.answer
        ? count + 1
        : count,
    0
  )
);
</script>

<style scoped></style>
