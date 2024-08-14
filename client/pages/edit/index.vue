<template>
  <div class="container">
    <div class="flex justify-between">
      <div>
        <h1 class="font-bold text-2xl">Create flashcards</h1>
      </div>

      <div class="flex gap-2 items-center">
        <button
          class="bg-transparent hover:bg-grayBg border-2 border-gray-400 text-white py-2 px-4 rounded-md"
          @click="handleCreate"
        >
          Create
        </button>
        <input type="checkbox" v-model="isPublic" id="isPublic" class="mr-2" />
        <span class="text-sm">{{ isPublic ? "Public" : "Private" }}</span>
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
      <div class="flex flex-col gap-6" @dragover="handleDragOver">
        <div
          v-for="(flashcard, index) in flashcards"
          :key="index"
          class="bg-grayBg rounded-lg w-full p-3 flex flex-col gap-6"
          draggable="true"
          @dragstart="handleDragStart($event, index)"
          @drop="handleDrop($event, index)"
          @dragend="handleDragEnd"
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
import { useToast } from "vue-toastification";

const toast = useToast();
const flashcardStore = useFlashcardStore();
const title = ref("");
const isPublic = ref(false);
const description = ref("");
const router = useRouter();
const flashcards = ref<Array<{ question: string; answer: string }>>([]);

let draggedIndex = -1;

definePageMeta({
  middleware: ["auth"],
});

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

    const hasValidFlashcard = flashcards.value.some(
      (flashcard) =>
        flashcard.question.trim() !== "" && flashcard.answer.trim() !== ""
    );

    if (!hasValidFlashcard) {
      throw new Error(
        "Please add at least one valid question and answer pair."
      );
    }

    const response = await flashcardStore.createFlashcard({
      title: title.value,
      pinned: false,
      description: description.value,
      flashcards: flashcards.value,
      isPublic: isPublic.value, // Ensure this is included
    });
    toast.success("Created flashcard successfully");

    router.push(`/library`);
  } catch (error) {
    toast.error("Fill all necessary fields");
  }
};

const handleDragStart = (event: DragEvent, index: number) => {
  draggedIndex = index;
  event.dataTransfer!.setData("text/plain", `${index}`);
  event.dataTransfer!.effectAllowed = "move";
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (event: DragEvent, index: number) => {
  event.preventDefault();
  const draggedIndexStr = event.dataTransfer!.getData("text/plain");
  const draggedIndex = parseInt(draggedIndexStr, 10);

  if (draggedIndex !== index && draggedIndex >= 0) {
    const movedItem = flashcards.value[draggedIndex];
    flashcards.value.splice(draggedIndex, 1);
    flashcards.value.splice(index, 0, movedItem);
  }
};

const handleDragEnd = () => {
  draggedIndex = -1;
};
</script>
