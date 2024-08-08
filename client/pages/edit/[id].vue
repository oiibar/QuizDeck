<template>
  <div class="container">
    <div class="flex justify-between">
      <div>
        <h1 class="font-bold text-2xl">Update flashcards</h1>
        <p class="text-sm text-gray-400">
          Updated at
          {{ flashcard ? formatDate(flashcard.updatedAt) : "Not saved yet" }}
        </p>
      </div>

      <div class="flex gap-2 items-center">
        <button
          class="bg-transparent hover:bg-grayBg border-2 border-gray-400 text-white py-2 px-4 rounded-md"
          @click="handleUpdate"
        >
          Update
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-4 text-xl">
      <div class="flex flex-col gap-2">
        <input
          class="input"
          type="text"
          v-model="title"
          id="title"
          placeholder="Title..."
        />
        <label class="text-sm" for="title">Title</label>
      </div>
      <div class="flex flex-col gap-2">
        <input
          type="text"
          class="input"
          v-model="description"
          id="description"
          placeholder="Add a description..."
        />
        <label class="text-sm" for="description">Description</label>
      </div>
      <div class="flex flex-col gap-6">
        <div
          v-for="(flashcard, index) in flashcards"
          :key="index"
          class="bg-grayBg rounded-lg w-full p-3 flex flex-col gap-6"
        >
          <FlashcardItem
            :flashcard="flashcard"
            :index="index"
            @remove="removeFlashcard"
          />
        </div>

        <div
          class="bg-grayBg rounded-lg p-6 flex flex-col gap-6 items-center justify-center cursor-pointer"
          @click="addFlashcard"
        >
          <div class="py-2 flex gap-2">
            <img src="~/assets/add.svg" alt="Add" class="w-10" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import FlashcardItem from "~/components/Create/FlashcardItem.vue";
import { useFlashcardStore } from "~/stores/flashcards";
import type { Flashcard } from "~/types/types";

const router = useRouter();
const flashcardStore = useFlashcardStore();

const title = ref("");
const description = ref("");
const flashcards = ref<Array<{ question: string; answer: string }>>([]);
const flashcard = ref<Flashcard | null>(null);

const addFlashcard = () => {
  flashcards.value.push({ question: "", answer: "" });
};

const removeFlashcard = (index: number) => {
  flashcards.value.splice(index, 1);
};

const handleUpdate = async () => {
  try {
    if (!title.value || !description.value) {
      throw new Error("Title and description must not be empty.");
    }

    const id = router.currentRoute.value.params.id as string;
    const response = await flashcardStore.updateFlashcards(id, {
      title: title.value,
      pinned: flashcard.value?.pinned ?? false,
      description: description.value,
      flashcards: flashcards.value,
    });
    router.push(`/library`);
  } catch (error) {
    console.error("Failed to update flashcard:", error.message);
  }
};

const formatDate = (date: Date) => new Date(date).toLocaleDateString();

onMounted(async () => {
  const id = router.currentRoute.value.params.id as string;
  flashcard.value = await flashcardStore.getFlashcard(id);
  if (flashcard.value) {
    title.value = flashcard.value.title;
    description.value = flashcard.value.description;
    flashcards.value = flashcard.value.flashcards;
  }
});
</script>

<style scoped></style>
