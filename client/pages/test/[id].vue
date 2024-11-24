<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <div class="text-5xl font-bold text-center mb-4">
      <h1>{{ flashcard.title }}</h1>
      <p class="text-xl text-gray-600">
        {{ userAnswers.length }}/{{ flashcard.flashcards?.length }} questions
        answered
      </p>
    </div>

    <TestList
      :flashcards="flashcard.flashcards || []"
      @updateUserAnswers="updateAnswers"
    />

    <div class="flex flex-col justify-center items-center gap-8 mt-8">
      <p class="font-bold text-3xl">All done! Ready to submit your test?</p>
      <div class="flex flex-col justify-center items-center gap-2 mt-4">
        <button
          @click="openConfirmationModal"
          class="bg-blue-500 py-3 px-5 rounded-md flex gap-2 items-center text-white"
        >
          Submit test
        </button>
        <button
          @click="navigateToLibrary"
          class="bg-red-500 py-3 px-5 rounded-md flex gap-2 items-center text-white"
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
import { ref, onMounted } from "vue";
import { useFlashcardStore } from "~/stores/flashcards";
import type { Flashcard, flashcardGroups } from "~/types/types";

const route = useRoute();
const flashcardStore = useFlashcardStore();
const flashcard = ref<flashcardGroups>({} as flashcardGroups);
const userAnswers = ref<{ question: string; answer: string }[]>([]);
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

const updateAnswers = (answers: { question: string; answer: string }[]) => {
  userAnswers.value = answers;
};

const openConfirmationModal = () => {
  isModalVisible.value = true;
};

const closeConfirmationModal = () => {
  isModalVisible.value = false;
};

const handleSubmit = () => {
  console.log("Final Submitted Answers:", userAnswers.value);
  navigateTo({
    path: "/test/result",
    query: {
      flashcards: JSON.stringify(flashcard.value.flashcards), // Passing actual flashcards data
      userAnswers: JSON.stringify(userAnswers.value), // Passing user answers
    },
  });
};

const navigateToLibrary = () => {
  navigateTo("/library");
};
</script>

<style scoped></style>
