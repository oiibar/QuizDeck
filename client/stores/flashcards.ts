import { defineStore } from "pinia";
import type { flashcardGroups } from "@/types/types";

const BASE_URL = "https://quizdeck.onrender.com/api";

export const useFlashcardStore = defineStore("flashcards", () => {
  const flashcards = ref<flashcardGroups[]>([]);
  const userStore = useUserStore();

  const fetchFlashcards = async () => {
    try {
      const res = await $fetch<flashcardGroups[]>(`${BASE_URL}/flashcards`, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      flashcards.value = res;
    } catch (error) {
      console.error("Failed to fetch flashcards:", error);
    }
  };

  const fetchPublicFlashcards = async () => {
    try {
      const res = await $fetch<flashcardGroups[]>(
        `${BASE_URL}/flashcards/public`,
        {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        }
      );
      return res;
    } catch (error) {
      console.error("Failed to fetch public flashcards:", error);
    }
  };

  const getFlashcard = async (id: string) => {
    try {
      const res = await $fetch<flashcardGroups>(
        `${BASE_URL}/flashcards/${id}`,
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

  const createFlashcard = async (
    data: Omit<flashcardGroups, "id" | "user" | "updatedAt" | "createdAt">
  ) => {
    try {
      const res = await $fetch<flashcardGroups>(`${BASE_URL}/flashcards`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${userStore.token}`,
          "Content-Type": "application/json",
        },
      });
      flashcards.value.push(res);
    } catch (error) {
      console.error("Failed to create flashcard:", error);
    }
  };

  const updateFlashcards = async (
    id: number,
    data: Omit<flashcardGroups, "id" | "user" | "updatedAt" | "createdAt">
  ) => {
    try {
      const res = await $fetch<flashcardGroups>(
        `${BASE_URL}/flashcards/${id}`,
        {
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${userStore.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      flashcards.value = flashcards.value.map((fc) =>
        fc.id === id ? res : fc
      );
    } catch (error) {
      console.error("Failed to update flashcards:", error);
    }
  };

  const deleteFlashcard = async (id: number) => {
    try {
      await $fetch(`${BASE_URL}/flashcards/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      flashcards.value = flashcards.value.filter((fc) => fc.id !== id);
    } catch (error) {
      console.error("Failed to delete flashcard:", error);
    }
  };

  return {
    flashcards,
    fetchFlashcards,
    getFlashcard,
    createFlashcard,
    updateFlashcards,
    deleteFlashcard,
    fetchPublicFlashcards,
  };
});
