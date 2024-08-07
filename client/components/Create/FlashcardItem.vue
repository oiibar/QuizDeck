<template>
  <div class="bg-grayBg rounded-lg w-full p-2 flex flex-col gap-6">
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
    <div class="flex justify-between gap-10 text-lg w-full">
      <div class="flex flex-col gap-1 w-1/2">
        <input
          class="border-b-2 border-b-white focus:border-b-4 focus:border-[#FFCD1F] py-1 bg-transparent focus:outline-none"
          type="text"
          v-model="flashcard.question"
          placeholder="Enter term..."
        />
        <label class="text-sm">Term</label>
      </div>
      <div class="flex flex-col gap-1 w-1/2">
        <input
          type="text"
          class="border-b-2 border-b-white focus:border-b-4 focus:border-[#FFCD1F] py-1 bg-transparent focus:outline-none"
          v-model="flashcard.answer"
          placeholder="Enter definition..."
        />
        <label class="text-sm">Definition</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  flashcard: { question: string; answer: string };
  index: number;
}>();

const emit = defineEmits<{ (e: "remove"): void }>();

const handleRemove = () => {
  emit("remove", props.index);
};
</script>
