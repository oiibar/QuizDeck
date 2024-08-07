<template>
  <div
    class="cursor-pointer w-full p-6 bg-grayBg rounded-md border-b-4 border-grayBg hover:border-purpleAc hover:border-b-4 transition-all duration-100"
    @click="$emit('click')"
  >
    <div class="flex flex-col gap-2">
      <div class="flex items-center">
        <p class="border-r-2 border-white pr-2">
          {{ flashcard.flashcards.length }} questions
        </p>
        <div class="pl-2 flex items-center gap-2 border-r-2 border-white pr-2">
          <div
            class="w-6 h-6 flex items-center justify-center text-xs rounded-full bg-purple-600 text-white cursor-pointer hover:bg-purple-700 transition-colors duration-200"
            @click="navigateToProfile"
          >
            {{ userStore.user.username.charAt(0).toUpperCase() }}
          </div>

          <p class="font-medium">
            {{ flashcard.user.username }}
          </p>
        </div>
        <div class="pl-2">
          <img
            :src="isPinned ? pin : unpin"
            alt="Pin"
            class="w-6 cursor-pointer"
            @click="handlePinClick"
          />
        </div>
      </div>

      <h3 class="text-xl font-bold">{{ flashcard.title }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Flashcard } from "~/types";
import pin from "~/assets/pin.svg";
import unpin from "~/assets/unpin.svg";

const userStore = useUserStore();
const props = defineProps({
  flashcard: {
    type: Object as () => Flashcard,
    required: true,
  },
});

const isPinned = ref(false);

const handlePinClick = (event: MouseEvent) => {
  event.stopPropagation();

  isPinned.value = !isPinned.value;
  console.log(isPinned.value ? "Flashcard pinned" : "Flashcard unpinned");
};
</script>

<style scoped></style>
