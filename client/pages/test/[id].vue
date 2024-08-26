<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <div class="text-5xl font-bold text-center mb-4">
      <h1>{{ flashcard.title }}</h1>
      <p class="text-xl text-gray-600">1/{{ flashcard.flashcards?.length }}</p>
    </div>

    <TestList :flashcards="flashcard.flashcards || []" />

    <div class="flex flex-col justify-center items-center gap-8 mt-8">
      <p class="font-bold text-3xl">All done! Ready to submit your test?</p>
      <div class="flex flex-col justify-center items-center gap-2 mt-4">
        <button
          @click="openConfirmationModal"
          class="bg-blue-500 py-4 px-6 rounded-md flex gap-2 items-center text-white"
        >
          Submit test
        </button>
        <button
          @click="navigateToLibrary"
          class="bg-red-500 py-4 px-6 rounded-md flex gap-2 items-center text-white"
        >
          Exit test
        </button>
      </div>
    </div>

    <TestConfirmModal
      :visible="isModalVisible"
      message="Are you sure you want to submit the test?"
      @close="closeConfirmationModal"
      @confirm="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useFlashcardStore } from "~/stores/flashcards";
import type { Flashcard, flashcardGroups } from "~/types/types";

const route = useRoute();
const flashcardStore = useFlashcardStore();
const flashcard = ref<flashcardGroups>({} as flashcardGroups);
const isModalVisible = ref(false);

onMounted(async () => {
  const id = route.params.id as string;
  try {
    const response = await flashcardStore.getFlashcard(id);
    flashcard.value = response;
  } catch (error) {
    console.error("Failed to fetch flashcard:", error);
  }
});

const openConfirmationModal = () => {
  isModalVisible.value = true;
};

const closeConfirmationModal = () => {
  isModalVisible.value = false;
};

const handleSubmit = () => {
  navigateTo("/test/result");
};

const navigateToLibrary = () => {
  navigateTo("/library");
};
</script>

<style scoped></style>
