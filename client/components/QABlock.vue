<template>
  <div class="flex flex-col gap-6 bg-grayBg rounded-lg w-full">
    <div class="flex justify-between cursor-move">
      <p class="text-lg font-bold">{{ index + 1 }}</p>
      <div class="flex gap-4 items-center justify-center">
        <div>
          <img src="~/assets/drag.svg" alt="Move" class="w-5 cursor-move" />
        </div>
        <div>
          <img
            src="~/assets/delete.svg"
            alt="Delete"
            class="w-5 cursor-pointer"
            @click="handleRemove"
          />
        </div>
      </div>
    </div>
    <div
      class="flex flex-wrap justify-between gap-10 text-lg w-full md:flex-nowrap"
    >
      <div class="flex flex-col gap-1 md:w-1/2 w-full">
        <input
          class="input"
          type="text"
          v-model="flashcard.question"
          placeholder="Enter term..."
        />
        <label class="text-sm">Term</label>
      </div>
      <div class="flex flex-col gap-1 md:w-1/2 w-full">
        <input
          type="text"
          class="input"
          v-model="flashcard.answer"
          placeholder="Enter definition..."
        />
        <label class="text-sm">Definition</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Flashcard } from "~/types/types";

const props = defineProps<{
  flashcard: Flashcard;
  index: number;
}>();

const emit = defineEmits<{ (e: "remove", index: number): void }>();

const handleRemove = () => {
  emit("remove", props.index);
};
</script>
