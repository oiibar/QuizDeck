<template>
  <div>
    <button @click="signout">Logout</button>
    <div>
      <pre>{{ userStore.user }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

definePageMeta({
  middleware: "auth",
});

const userStore = useUserStore();

const signout = () => {
  userStore.logout();
  useRouter().go(0);
};
</script>
