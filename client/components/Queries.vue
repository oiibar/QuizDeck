<template>
  <form class="flex items-center justify-between w-full">
    <select
      id="module-select"
      class="border-2 border-grayBg rounded-lg py-2 px-4 bg-transparent hover:bg-grayBg hover:bg-opacity-40"
    >
      <option
        value="recent"
        class="bg-darkBg focus:bg-grayBg hover:bg-opacity-40 p-2"
      >
        Recent
      </option>
      <option
        value="recent"
        class="bg-darkBg hover:bg-grayBg hover:bg-opacity-40"
      >
        Learned
      </option>
      <option
        value="recent"
        class="bg-darkBg hover:bg-grayBg hover:bg-opacity-40"
      >
        Pinned
      </option>
    </select>
    <input
      type="text"
      placeholder="Search modules"
      class="rounded-lg py-2 px-4 bg-grayBg focus:outline-none"
    />
  </form>
</template>

<script setup lang="ts"></script>

<style scoped></style>
