<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-50" @click="cancelDelete"></div>

    <div
      class="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm relative"
      @click.stop
    >
      <h2 class="text-xl font-semibold mb-4 text-black">
        Are you sure you want to delete?
      </h2>
      <div class="flex justify-end gap-4">
        <button
          class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          @click="confirmDelete"
        >
          Yes, Delete
        </button>
        <button
          class="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
          @click="cancelDelete"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isVisible: boolean;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const confirmDelete = () => {
  emit("confirm");
};

const cancelDelete = () => {
  emit("cancel");
};
</script>

<style scoped></style>
