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
        <input type="checkbox" v-model="isPublic" id="isPublic" class="mr-2" />
        <span class="text-sm ml-2">{{ isPublic ? "Public" : "Private" }}</span>
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
          v-for="(flashcardItem, index) in flashcards"
          :key="index"
          class="bg-grayBg rounded-lg w-full p-3 flex flex-col gap-6"
          draggable="true"
          @dragstart="handleDragStart($event, index)"
          @drop="handleDrop($event, index)"
          @dragend="handleDragEnd"
        >
          <QABlock
            :flashcard="flashcardItem"
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
const { $toast } = useNuxtApp();
import { useFlashcardStore } from "~/stores/flashcards";
import type { Flashcard, flashcardGroups } from "~/types/types";

const route = useRoute();
const isPublic = ref(false);
const flashcardStore = useFlashcardStore();

definePageMeta({
  middleware: ["auth"],
});

const title = ref("");
const description = ref("");
const flashcard = ref<flashcardGroups>({} as flashcardGroups);
const flashcards = ref<Flashcard[]>([]);

let draggedIndex = -1;

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

    const hasValidFlashcard = flashcards.value.some(
      (item) => item.question.trim() !== "" && item.answer.trim() !== ""
    );

    if (!hasValidFlashcard) {
      throw new Error(
        "Please add at least one valid question and answer pair."
      );
    }

    const id = route.params.id as string;
    await flashcardStore.updateFlashcards(parseInt(id), {
      title: title.value,
      pinned: flashcard.value?.pinned ?? false,
      description: description.value,
      flashcards: flashcards.value,
      isPublic: isPublic.value ?? false,
    });
    $toast.success("Updated flashcard successfully");

    navigateTo("/library");
  } catch (error) {
    $toast.error("Check fields and try again");
  }
};

const formatDate = (date: Date) => new Date(date).toLocaleDateString();

onMounted(async () => {
  const id = route.params.id as string;
  const response = await flashcardStore.getFlashcard(id);
  flashcard.value = response;
  if (flashcard.value) {
    title.value = flashcard.value.title;
    description.value = flashcard.value.description;
    flashcards.value = flashcard.value.flashcards || [];
    isPublic.value = flashcard.value.isPublic;
  }
});

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

<style scoped></style>
