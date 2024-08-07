<template>
  <form class="flex items-center justify-between w-full">
    <select
      v-model="selectedSort"
      class="border-2 border-grayBg rounded-lg py-2 px-4 bg-transparent hover:bg-grayBg hover:bg-opacity-40"
      @change="emitSorting"
    >
      <option value="recent">Recent</option>
    </select>

    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search flashcards"
        class="rounded-lg py-2 px-4 pr-12 bg-grayBg focus:outline-none"
        @input="emitSearch"
      />
      <img
        src="~/assets/search.svg"
        alt="Search"
        class="absolute w-4 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits<{
  (e: "search", query: string): void;
  (e: "sort", sort: string): void;
}>();

const searchQuery = ref("");
const selectedSort = ref("recent");

const emitSearch = () => {
  emit("search", searchQuery.value);
};

const emitSorting = () => {
  emit("sort", selectedSort.value);
};
</script>

<style scoped>
/* Add styles for the Queries component here if needed */
</style>
