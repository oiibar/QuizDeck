<template>
  <div
    class="cursor-pointer w-full p-6 bg-grayBg rounded-md border-b-4 border-grayBg hover:border-purpleAc hover:border-b-4 transition-all duration-100"
    @click="$emit('click')"
  >
    <div class="flex flex-col gap-2">
      <div class="flex items-center">
        <p class="border-r-2 border-black pr-2">
          {{ flashcard.flashcards.length }} questions
        </p>
        <p class="pl-2">
          {{ flashcard.user.username }}
        </p>
      </div>

      <h3 class="text-xl font-bold">{{ flashcard.title }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Flashcard } from "~/types";

const props = defineProps({
  flashcard: {
    type: Object as () => Flashcard,
    required: true,
  },
});
</script>
