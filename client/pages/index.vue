<template>
  <div class="container">
    <h1 class="text-5xl font-bold text-center">Welcome to QuizDeck</h1>
    <p class="text-lg text-center">
      We're glad to have you here. Click the button below to get started!
    </p>

    <div class="flex justify-center items-center gap-4">
      <button
        @click="handleCreate"
        class="bg-blueAc py-2 px-4 rounded-md flex gap-2 items-center"
      >
        <img src="~/assets/create.svg" class="w-6" alt="Create" />
        <p>Create</p>
      </button>
      <button
        @click="handleLibrary"
        class="bg-blueAc py-2 px-4 rounded-md flex gap-2 items-center"
      >
        <img src="~/assets/library.svg" class="w-6" alt="Library" />
        <p>Library</p>
      </button>
    </div>

    <div v-if="pinnedFlashcards.length" class="mt-8">
      <LibraryList :flashcards="pinnedFlashcards" />
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const flashcardStore = useFlashcardStore();
const pinnedFlashcards = ref([]);

definePageMeta({
  middleware: ["auth"],
});

onMounted(async () => {
  if (userStore.user) {
    await flashcardStore.fetchFlashcards();
    pinnedFlashcards.value = flashcardStore.flashcards.filter(
      (fc) => fc.pinned
    );
  }
});

const handleCreate = () => {
  if (userStore.user) {
    navigateTo("/edit");
  } else {
    navigateTo("/auth/login");
  }
};

const handleLibrary = () => {
  if (userStore.user) {
    navigateTo("/library");
  } else {
    navigateTo("/auth/login");
  }
};
</script>

<style scoped></style>
