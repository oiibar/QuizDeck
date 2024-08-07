<template>
  <aside
    class="min-h-screen flex flex-col justify-between items-center text-center font-bold px-2 py-4"
  >
    <div class="flex flex-col gap-10" title="Home">
      <NuxtLink to="/" class="text-4xl">Q</NuxtLink>

      <nav class="flex flex-col">
        <NuxtLink to="/" class="hover:bg-grayBg rounded-lg p-2 tooltip">
          <span class="tooltiptext">Home</span>
          <img src="~/assets/home.svg" alt="Home" class="w-6" />
        </NuxtLink>

        <NuxtLink
          title="Library"
          to="/library"
          class="hover:bg-grayBg rounded-lg p-2 tooltip"
          ><span class="tooltiptext">Library</span>
          <img src="~/assets/library.svg" alt="Library" class="w-6" />
        </NuxtLink>
      </nav>
    </div>

    <div
      v-if="userStore.user"
      class="flex flex-col justify-center items-center gap-1"
    >
      <button @click="signout" class="hover:bg-grayBg rounded-lg p-1 tooltip">
        <span class="tooltiptext">Log out</span>
        <img src="~/assets/logout.svg" class="w-8" alt="Logout" />
      </button>

      <button
        @click="navigateToCreate"
        class="hover:bg-grayBg rounded-lg p-1 tooltip"
      >
        <span class="tooltiptext">Create</span>
        <img src="~/assets/create.svg" class="w-7" alt="Create" />
      </button>
      <div
        class="w-10 h-10 flex items-center justify-center rounded-full bg-purpleAc cursor-pointer"
        @click="navigateToProfile"
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

const userStore = useUserStore();
const router = useRouter();

const signout = () => {
  userStore.logout();
  router.push("/auth/login");
};

const navigateToProfile = () => {
  router.push("/profile");
};

const navigateToCreate = () => {
  router.push("/flashcards/edit");
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
  transform: translateY(-20%);
  left: 105%;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
