<template>
  <div class="flex gap-4 justify-center items-center">
    <div>
      <pre>{{ userStore.user }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { useRouter } from "#app";

const userStore = useUserStore();
const router = useRouter();

const signout = () => {
  userStore.logout();
  router.push("/auth/login");
};
</script>
