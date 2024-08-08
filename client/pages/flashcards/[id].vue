<template>
  <div class="container">
    <h1 class="text-5xl font-bold text-center">{{ flashcard?.title }}</h1>

    <div class="relative perspective-1000">
      <div
        class="flashcard relative w-full h-64 perspective-1000 rounded-lg overflow-hidden"
        :class="{ 'flip-card-active': isFlipped }"
        @click="toggleFlip"
      >
        <div
          class="flashcard-side absolute w-full h-full backface-hidden flex items-center justify-center bg-grayBg text-3xl rounded-lg"
        >
          {{ currentFlashcard.question }}
        </div>

        <div
          class="flashcard-side absolute w-full h-full backface-hidden transform rotate-x-180 flex items-center justify-center bg-grayBg text-3xl rounded-lg"
        >
          {{ currentFlashcard.answer }}
        </div>
      </div>
    </div>

    <div class="flex gap-8 items-center justify-center mt-4">
      <button
        class="bg-transparent border-2 border-gray-500 hover:bg-gray-300 rounded-full p-2"
        @click="prevFlashcard"
      >
        <img src="~/assets/arrow_left.svg" alt="<-" class="w-8" />
      </button>
      <p>{{ currentIndex + 1 }}/{{ flashcard?.flashcards?.length }}</p>
      <button
        class="bg-transparent border-2 border-gray-500 hover:bg-gray-300 rounded-full p-2"
        @click="nextFlashcard"
      >
        <img src="~/assets/arrow_right.svg" alt="->" class="w-8" />
      </button>
    </div>

    <hr />

    <div class="flex flex-col gap-8">
      <div class="flex justify-between">
        <div class="flex items-center gap-4">
          <div
            class="w-16 h-16 flex items-center justify-center text-3xl rounded-full bg-purpleAc text-white cursor-pointer hover:bg-purpleAc transition-colors duration-200"
            @click="navigateToProfile"
          >
            {{ userStore.user.username.charAt(0).toUpperCase() }}
          </div>
          <div class="text-gray-400">
            <p class="text-xs">Created by</p>
            <p class="text-white">{{ flashcard?.user.username }}</p>
            <p class="text-xs">Created 13 hours ago</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="bg-transparent border-2 rounded-md p-1 border-grayBg hover:bg-gray-300"
          >
            <img src="~/assets/create.svg" alt="Edit" class="w-6" />
          </button>
          <button
            class="bg-transparent border-2 rounded-md p-1 border-grayBg hover:bg-gray-300"
            @click="showModal = true"
          >
            <img src="~/assets/delete.svg" alt="Delete" class="w-6" />
          </button>
        </div>
      </div>
      <p>{{ flashcard?.description }}</p>
    </div>

    <ConfirmationModal
      :isVisible="showModal"
      @confirm="handleDelete"
      @cancel="showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import { useFlashcardStore } from "~/stores/flashcards";
import type { Flashcard } from "~/types/types";
import { useUserStore } from "~/stores/user";
import ConfirmationModal from "~/components/Flashcard/ConfirmModal.vue";

const userStore = useUserStore();
const router = useRouter();
const flashcardStore = useFlashcardStore();
const flashcard = ref<Flashcard | null>(null);
const showModal = ref(false);
const currentIndex = ref(0);
const isFlipped = ref(false);

const currentFlashcard = computed(() => {
  return (
    flashcard.value?.flashcards[currentIndex.value] || {
      question: "",
      answer: "",
    }
  );
});

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value;
};

const nextFlashcard = () => {
  if (currentIndex.value < (flashcard.value?.flashcards.length || 0) - 1) {
    currentIndex.value++;
    isFlipped.value = false;
  }
};

const prevFlashcard = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    isFlipped.value = false;
  }
};

const handleDelete = async () => {
  const id = router.currentRoute.value.params.id as string;
  await flashcardStore.deleteFlashcard(id);
  router.push("/library");
};

onMounted(async () => {
  const id = router.currentRoute.value.params.id as string;
  flashcard.value = await flashcardStore.getFlashcard(id);
});
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.flashcard {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flip-card-active {
  transform: rotateX(180deg);
}

.flashcard-side {
  backface-visibility: hidden;
}

.flashcard-side:last-of-type {
  transform: rotateX(180deg);
}
</style>
