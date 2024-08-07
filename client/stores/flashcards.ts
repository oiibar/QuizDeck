import { defineStore } from "pinia";
import type { Flashcard, flashcardGroups } from "~/types";

export const useFlashcardStore = defineStore("flashcards", () => {
  const flashcards = ref<Flashcard[]>([]);
  const userStore = useUserStore();

  const fetchFlashcards = async () => {
    try {
      const res = await $fetch<Flashcard[]>(
        "http://localhost:10000/api/flashcards",
        {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        }
      );
      flashcards.value = res;
    } catch (error) {
      console.error("Failed to fetch flashcards:", error);
    }
  };

  const getFlashcard = async (id: string) => {
    try {
      const res = await $fetch<Flashcard>(
        `http://localhost:10000/api/flashcards/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        }
      );
      return res;
    } catch (error) {
      console.error("Failed to fetch flashcard:", error);
    }
  };

  const createFlashcard = async (data: flashcardGroups) => {
    try {
      const res = await $fetch<Flashcard>(
        "http://localhost:10000/api/flashcards",
        {
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${userStore.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      flashcards.value.push(res);
    } catch (error) {
      console.error("Failed to create flashcard:", error);
    }
  };

  return {
    flashcards,
    fetchFlashcards,
    getFlashcard,
    createFlashcard,
  };
});
