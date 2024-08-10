<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center z-50 text-black bg-gray-900 bg-opacity-50"
    @click="handleBackdropClick"
  >
    <div class="bg-white p-6 rounded shadow-lg" @click.stop>
      <h2 class="text-xl font-semibold mb-4">Confirm Action</h2>
      <p class="mb-4">{{ message }}</p>
      <div class="flex gap-4">
        <button
          @click="confirm"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yes
        </button>
        <button @click="cancel" class="bg-red-500 text-white px-4 py-2 rounded">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "confirm"]);

const confirm = () => {
  emit("confirm");
  emit("close");
};

const cancel = () => {
  emit("close");
};

const handleBackdropClick = () => {
  emit("close");
};
</script>

<style scoped>
/* Add any specific styling here if needed */
</style>
