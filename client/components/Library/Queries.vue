<template>
  <form
    class="flex flex-col md:flex-row items-center justify-between w-full gap-4"
  >
    <select
      v-model="selectedSort"
      class="border-2 border-grayBg rounded-lg p-2 bg-transparent hover:bg-grayBg hover:bg-opacity-40"
      @change="emitSorting"
    >
      <option selected value="date-desc" class="bg-darkBg">Most Recent</option>
      <option value="date-asc" class="bg-darkBg">Oldest First</option>
      <option value="title-asc" class="bg-darkBg">Title (A-Z)</option>
      <option value="title-desc" class="bg-darkBg">Title (Z-A)</option>
    </select>

    <div class="relative w-full md:w-1/3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search flashcards"
        class="rounded-lg py-2 px-4 pr-12 bg-grayBg focus:outline-none w-full"
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
const selectedSort = ref("date-desc");

const emitSearch = () => {
  emit("search", searchQuery.value);
};

const emitSorting = () => {
  emit("sort", selectedSort.value);
};
</script>
