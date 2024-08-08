<template>
  <div class="container">
    <div class="flex justify-between">
      <div>
        <h1 class="font-bold text-2xl">Create flashcards</h1>
        <p class="text-sm text-gray-400">Saved 58 mins ago</p>
      </div>

      <div class="flex gap-2 items-center">
        <button
          class="bg-transparent hover:bg-grayBg border-2 border-gray-400 text-white py-2 px-4 rounded-md"
          @click="handleCreate"
        >
          Create
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
import { ref } from "vue";
import FlashcardItem from "~/components/Create/FlashcardItem.vue";
import { useFlashcardStore } from "~/stores/flashcards";
import { useRouter } from "vue-router";
const flashcardStore = useFlashcardStore();

const title = ref("");
const description = ref("");
const router = useRouter();
const flashcards = ref<Array<{ question: string; answer: string }>>([]);

const addFlashcard = () => {
  flashcards.value.push({ question: "", answer: "" });
};

const removeFlashcard = (index: number) => {
  flashcards.value.splice(index, 1);
};

const handleCreate = async () => {
  try {
    if (!title.value || !description.value) {
      throw new Error("Title and description must not be empty.");
    }

    const response = await flashcardStore.createFlashcard({
      title: title.value,
      pinned: false,
      description: description.value,
      flashcards: flashcards.value,
    });
    router.push(`/library`);
  } catch (error) {
    console.error("Failed to create flashcard:", error.message);
  }
};
</script>
