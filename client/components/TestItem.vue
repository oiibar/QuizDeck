<template>
  <div class="bg-grayBg p-6 rounded-lg shadow-lg flex flex-col gap-6">
    <p class="text-lg leading-relaxed">{{ flashcard.question }}</p>
    <div class="flex flex-col gap-4">
      <p class="text-xl font-semibold">Choose matching answer</p>
      <div class="space-y-2">
        <div
          class="p-4 border-2 hover:border-gray-300 rounded-lg shadow-sm cursor-pointer transition-colors bg-gray-500 border-gray-300"
        >
          {{ flashcard.answer }}
        </div>
        <div
          class="p-4 border-2 border-gray-600 hover:border-gray-300 rounded-lg shadow-sm cursor-pointer transition-colors"
        >
          Answer
        </div>
        <div
          class="p-4 border-2 border-gray-600 hover:border-gray-300 rounded-lg shadow-sm cursor-pointer transition-colors"
        >
          Answer
        </div>
        <div
          class="p-4 border-2 border-gray-600 hover:border-gray-300 rounded-lg shadow-sm cursor-pointer transition-colors"
        >
          Answer
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Flashcard } from "~/types/types";

const props = defineProps({
  flashcard: {
    type: Object as () => Flashcard,
    required: true,
  },
});
</script>

<style scoped></style>
