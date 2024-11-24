<template>
  <div class="flex flex-col gap-8">
    <TestItem
      v-for="flashcard in flashcards"
      :key="flashcard.question"
      :flashcard="flashcard"
      @answerSelected="storeAnswer"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Flashcard } from "~/types/types";

const props = defineProps({
  flashcards: {
    type: Array as () => Flashcard[],
    required: true,
  },
});

const emit = defineEmits(["updateUserAnswers"]);

const userAnswers = ref<{ question: string; answer: string }[]>([]);

const storeAnswer = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const existingAnswerIndex = userAnswers.value.findIndex(
    (item) => item.question === question
  );
  if (existingAnswerIndex !== -1) {
    userAnswers.value[existingAnswerIndex].answer = answer;
  } else {
    userAnswers.value.push({ question, answer });
  }

  emit("updateUserAnswers", userAnswers.value);
};
</script>
