<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <div class="text-5xl font-bold text-center mb-4">
      <h1>{{ flashcard?.title }}</h1>
      <p class="text-xl text-gray-600">1/{{ flashcard?.flashcards?.length }}</p>
    </div>

    <TestList :flashcards="flashcard?.flashcards || []" />

    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-bold text-3xl">All done! Ready to submit your test?</p>
      <div class="flex flex-col justify-center items-center gap-2">
        <button
          @click="openConfirmationModal"
          class="bg-blueAc py-4 px-6 rounded-md flex gap-2 items-center"
        >
          Submit test
        </button>
        <button
          @click="router.push('/library')"
          class="bg-red-500 py-4 px-6 rounded-md flex gap-2 items-center"
        >
          Exit test
        </button>
      </div>
    </div>

    <ConfirmationModal
      :visible="isModalVisible"
      message="Are you sure you want to submit the test?"
      @close="closeConfirmationModal"
      @confirm="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TestList from "~/components/Test/TestList.vue";
import { useFlashcardStore } from "~/stores/flashcards";
import { useRouter } from "#app";
import ConfirmationModal from "~/components/Test/ConfirmationModal.vue";
import type { Flashcard } from "~/types/types";

const flashcardStore = useFlashcardStore();
const flashcard = ref<Flashcard | null>(null);
const router = useRouter();
const isModalVisible = ref(false);

onMounted(async () => {
  try {
    const id = router.currentRoute.value.params.id as string;
    flashcard.value = await flashcardStore.getFlashcard(id);
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
  router.replace("/test/result");
};
</script>

<style scoped></style>
