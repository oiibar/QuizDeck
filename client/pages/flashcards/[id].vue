<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div v-if="flashcard" class="flex flex-wrap gap-4 justify-center">
      <div
        v-for="(item, index) in flashcard.flashcards"
        :key="index"
        class="flashcard-container"
      >
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <p class="text-lg font-semibold text-gray-800">
              {{ item.question }}
            </p>
          </div>
          <div class="flashcard-back">
            <p class="text-lg font-semibold text-gray-800">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-600">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFlashcardStore } from "~/stores/flashcards";
import type { Flashcard } from "~/types";

const route = useRoute();
const flashcardStore = useFlashcardStore();
const flashcard = ref<Flashcard | null>(null);

onMounted(async () => {
  const id = route.params.id as string;
  flashcard.value = await flashcardStore.getFlashcard(id);
});
</script>

<style scoped>
.flashcard-container {
  perspective: 1000px;
  width: 200px;
  height: 300px;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flashcard-container:hover .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 0.5rem;
}

.flashcard-front {
  background-color: #ffffff;
  border: 1px solid #e5e7eb; /* Tailwind's gray-200 */
}

.flashcard-back {
  background-color: #f3f4f6; /* Tailwind's gray-100 */
  transform: rotateY(180deg);
}
</style>
