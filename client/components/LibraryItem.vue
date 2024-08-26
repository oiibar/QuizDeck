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
          >
            {{ userStore.user.username.charAt(0).toUpperCase() }}
          </div>
          <p class="font-medium">
            {{ flashcard.user.username }}
          </p>
        </div>
        <div v-if="isOwner" class="pl-2 border-r-2 border-white pr-2">
          <img
            :src="isPinned ? pin : unpin"
            alt="Pin"
            class="w-6 cursor-pointer"
            @click="handlePinClick"
          />
        </div>
        <div class="pl-2 pr-2">
          {{ flashcard.isPublic ? "Public" : "Private" }}
        </div>
      </div>

      <h3 class="text-xl font-bold">{{ flashcard.title }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { flashcardGroups } from "~/types/types";
import pin from "~/assets/pin.svg";
import unpin from "~/assets/unpin.svg";
import { useUserStore } from "~/stores/user";
import { useFlashcardStore } from "~/stores/flashcards";

const userStore = useUserStore();
const flashcardStore = useFlashcardStore();

const props = defineProps<{
  flashcard: flashcardGroups;
}>();

const isPinned = ref(props.flashcard.pinned);
const isOwner = computed(() => props.flashcard.user.id === userStore.user?.id);

const handlePinClick = async (event: MouseEvent) => {
  event.stopPropagation();

  isPinned.value = !isPinned.value;

  const updatedData = {
    ...props.flashcard,
    pinned: isPinned.value,
  };

  try {
    await flashcardStore.updateFlashcards(props.flashcard.id, updatedData);
  } catch (error) {
    console.error("Failed to update flashcard:", error);
    isPinned.value = !isPinned.value;
  }
};
</script>
