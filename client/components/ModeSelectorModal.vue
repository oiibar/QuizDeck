<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center z-50 text-black bg-gray-900 bg-opacity-50"
    @click="handleBackdropClick"
  >
    <div class="bg-white p-6 rounded shadow-lg" @click.stop>
      <h2 class="text-xl font-semibold mb-4">Select Mode</h2>
      <div class="flex gap-4">
        <button
          @click="chooseMode('flashcard')"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Flashcard
        </button>
        <button
          @click="chooseMode('test')"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Test
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "choose"]);

const chooseMode = (mode: string) => {
  emit("choose", mode);
  emit("close");
};

const handleBackdropClick = () => {
  emit("close");
};
</script>

<style scoped></style>
