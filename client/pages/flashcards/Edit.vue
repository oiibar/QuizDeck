<template>
  <div class="flex flex-col gap-8 container h-screen pt-16">
    <div class="flex justify-between">
      <h1 class="font-bold text-xl">Create flashcards</h1>
      <div class="flex gap-2 items-center">
        <button
          class="bg-transparent hover:bg-grayBg border-2 border-gray-400 text-white py-2 px-4 rounded-md"
        >
          Create</button
        ><button class="bg-blueAc text-white py-2 px-4 rounded-md">
          Create and practice
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-4 text-xl">
      <div class="flex flex-col gap-2">
        <input
          class="border-b-2 border-b-white focus:border-b-4 focus:border-[#FFCD1F] py-2 bg-transparent focus:outline-none"
          type="text"
          id="title"
          placeholder="Title..."
        /><label class="text-sm" for="title">Title</label>
      </div>
      <div class="flex flex-col gap-2">
        <input
          type="text"
          class="border-b-2 border-b-white focus:border-b-4 focus:border-[#FFCD1F] py-2 bg-transparent focus:outline-none"
          id="description"
          placeholder="Add a description..."
        /><label class="text-sm" for="description">Description</label>
      </div>
    </div>
    <div class="flex flex-col gap-6">
      <div class="bg-grayBg rounded-lg w-full p-6 flex flex-col gap-6">
        <div class="flex justify-between">
          <p class="text-lg font-bold">1</p>
          <div class="flex gap-4 items-center justify-center">
            <div>
              <img src="~/assets/drag.svg" alt="Move" class="w-5 cursor-move" />
            </div>
            <div>
              <img src="~/assets/delete.svg" alt="Del" class="w-5" />
            </div>
          </div>
        </div>
        <div class="flex justify-between gap-10 text-lg w-full">
          <div class="flex flex-col gap-1 w-1/2">
            <input
              class="border-b-2 border-b-white focus:border-b-4 focus:border-[#FFCD1F] py-1 bg-transparent focus:outline-none"
              type="text"
              id="title"
              placeholder="Enter term"
            /><label class="text-sm" for="title">Title</label>
          </div>
          <div class="flex flex-col gap-1 w-1/2">
            <input
              type="text"
              class="border-b-2 border-b-white focus:border-b-4 focus:border-[#FFCD1F] py-1 bg-transparent focus:outline-none"
              id="description"
              placeholder="Enter definition..."
            /><label class="text-sm" for="description">Description</label>
          </div>
        </div>
      </div>
      <div class="bg-grayBg rounded-lg w-full p-6 flex flex-col gap-6">
        <div class="flex justify-between">
          <p class="text-lg font-bold">2</p>
          <div class="flex gap-4 items-center justify-center">
            <div>
              <img src="~/assets/drag.svg" alt="Move" class="w-5 cursor-move" />
            </div>
            <div>
              <img src="~/assets/delete.svg" alt="Del" class="w-5" />
            </div>
          </div>
        </div>
        <div class="flex justify-between gap-10 text-lg w-full">
          <div class="flex flex-col gap-1 w-1/2">
            <input
              class="border-b-2 border-b-white focus:border-b-4 focus:border-[#FFCD1F] py-1 bg-transparent focus:outline-none"
              type="text"
              id="title"
              placeholder="Enter term"
            /><label class="text-sm" for="title">Title</label>
          </div>
          <div class="flex flex-col gap-1 w-1/2">
            <input
              type="text"
              class="border-b-2 border-b-white focus:border-b-4 focus:border-[#FFCD1F] py-1 bg-transparent focus:outline-none"
              id="description"
              placeholder="Enter definition..."
            /><label class="text-sm" for="description">Description</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<style scoped></style>
