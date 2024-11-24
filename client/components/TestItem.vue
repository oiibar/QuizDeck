<template>
  <div class="bg-grayBg p-6 rounded-lg shadow-lg flex flex-col gap-6">
    <p class="text-lg leading-relaxed">{{ flashcard.question }}</p>
    <div class="flex flex-col gap-4">
      <p class="text-xl font-semibold">Choose the correct answer</p>
      <div class="space-y-2">
        <div
          v-for="(option, index) in options"
          :key="index"
          @click="choose(index)"
          :class="[
            'p-4 border-2 rounded-lg shadow-sm cursor-pointer transition-colors',
            selectedIndex === index
              ? 'bg-gray-500 border-gray-300'
              : 'border-gray-600 hover:border-gray-300',
          ]"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Flashcard } from "~/types/types";

const props = defineProps({
  flashcard: {
    type: Object as () => Flashcard,
    required: true,
  },
});

const emit = defineEmits(["answerSelected"]);

// Mock options for the flashcard (answers)
const options = ["Answer 1", props.flashcard.answer, "Answer 3", "Answer 4"];

// Store the index of the selected answer
const selectedIndex = ref<number | null>(null);

// Emit the selected answer when it changes
const choose = (index: number) => {
  selectedIndex.value = index;
  emit("answerSelected", {
    question: props.flashcard.question,
    answer: options[index],
  });
};
</script>

<style scoped></style>
