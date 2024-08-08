<template>
  <div class="container">
    <h1 class="text-5xl font-bold text-center">{{ flashcard?.title }}</h1>

    <div
      class="w-full flex items-center justify-center bg-grayBg text-3xl rounded-lg perspective"
    >
      <div
        class="relative w-full py-64 transform-style-preserve-3d transition-transform duration-500 cursor-pointer"
        :class="{ 'rotate-x-180': isFlipped }"
        @click="toggleFlip"
      >
        <div
          class="absolute inset-0 flex items-center justify-center backface-hidden"
        >
          {{ currentFlashcard.question }}
        </div>
        <div
          class="absolute inset-0 flex items-center justify-center backface-hidden rotate-x-180"
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
          <div class="text-gray-400 text-xs">
            <p>Created by</p>
            <p class="text-white text-lg">
              {{ flashcard ? flashcard.user.username : "" }}
            </p>
            <p>
              {{ flashcard ? formatDate(flashcard.createdAt) : "" }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="navigateToEditPage"
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
import { formatDistanceToNow } from "date-fns";

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

const navigateToEditPage = () => {
  const id = flashcard.value?.id;
  if (id) {
    router.push(`/edit/${id}`);
  }
};

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

const formatDate = (date: Date) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });

onMounted(async () => {
  const id = router.currentRoute.value.params.id as string;
  flashcard.value = await flashcardStore.getFlashcard(id);
});
</script>

<style scoped>
.perspective {
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-x-180 {
  transform: rotateX(180deg);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
