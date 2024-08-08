<template>
  <aside
    class="sticky top-0 h-screen w-16 flex flex-col justify-between items-center text-center font-bold px-2 py-4 shadow-lg"
  >
    <div class="flex flex-col gap-10">
      <NuxtLink to="/" class="text-4xl">Q</NuxtLink>

      <nav class="flex flex-col gap-2">
        <NuxtLink to="/" class="hover:bg-grayBg rounded-lg p-1 tooltip">
          <span class="tooltiptext">Home</span>
          <img src="~/assets/home.svg" alt="Home" class="w-6" />
        </NuxtLink>

        <NuxtLink to="/library" class="hover:bg-grayBg rounded-lg p-1 tooltip"
          ><span class="tooltiptext">Library</span>
          <img src="~/assets/library.svg" alt="Library" class="w-6" />
        </NuxtLink>

        <NuxtLink
          to="/flashcards/edit"
          class="hover:bg-grayBg rounded-lg p-1 tooltip"
          ><span class="tooltiptext">Create</span>
          <img src="~/assets/create.svg" alt="Library" class="w-6" />
        </NuxtLink>
      </nav>
    </div>

    <div
      v-if="userStore.user"
      class="flex flex-col justify-center items-center gap-2"
    >
      <button @click="signout" class="hover:bg-grayBg rounded-lg tooltip">
        <span class="tooltiptext">Logout</span>
        <img src="~/assets/logout.svg" class="w-8" alt="Logout" />
      </button>
      <div
        class="w-10 h-10 flex items-center justify-center rounded-full bg-purpleAc cursor-pointer"
        @click="() => router.push('/profile')"
        title="Profile"
      >
        {{ userStore.user.username.charAt(0).toUpperCase() }}
      </div>
    </div>

    <div v-else class="flex flex-col gap-4">
      <NuxtLink to="/auth/signup" class="bg-blueAc p-2 rounded-md"
        >Sign Up</NuxtLink
      >

      <NuxtLink to="/auth/login" class="bg-blueAc p-2 rounded-md"
        >Login</NuxtLink
      >
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { useRouter } from "#app";

const router = useRouter();
const userStore = useUserStore();

const signout = () => {
  userStore.logout();
  router.push("/auth/login");
};
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  padding: 5px 15px;
  background-color: #2e3856;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  transform: translateY(-12%);
  left: 105%;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
