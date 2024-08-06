<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-full max-w-md bg-white shadow-md rounded-lg p-8 text-black">
      <h2 class="text-2xl font-semibold mb-6 text-center">Profile</h2>
      <form @submit.prevent="updateProfile" class="space-y-4">
        <div class="relative w-full">
          <input
            placeholder="Username"
            type="text"
            class="border border-[#BDBDBD] pl-10 pr-4 py-2 rounded-md w-full"
            v-model="username"
          />
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <img :src="userIcon" alt="" class="w-4" />
          </div>
        </div>

        <div class="relative w-full">
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="border border-[#BDBDBD] pl-10 pr-10 py-2 rounded-md w-full"
            v-model="password"
          />
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <img
              :src="showPassword ? unlockedIcon : passwordIcon"
              alt=""
              class="w-4"
            />
          </div>
          <div
            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            @click="togglePasswordVisibility"
          >
            <img
              :src="showPassword ? openIcon : closedIcon"
              alt=""
              class="w-4"
            />
          </div>
        </div>
        <div class="relative w-full">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm password"
            class="border border-[#BDBDBD] pl-10 pr-10 py-2 rounded-md w-full"
            v-model="confirmPassword"
          />
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <img
              :src="showConfirmPassword ? unlockedIcon : passwordIcon"
              alt=""
              class="w-4"
            />
          </div>
          <div
            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            @click="toggleConfirmPasswordVisibility"
          >
            <img
              :src="showConfirmPassword ? openIcon : closedIcon"
              alt=""
              class="w-4"
            />
          </div>
        </div>
        <p v-if="passwordMismatch" class="text-red-500 text-xs mt-2">
          Passwords do not match
        </p>
        <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Profile
        </button>
        <button
          @click="signout"
          class="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import passwordIcon from "@/assets/auth/password.svg";
import unlockedIcon from "@/assets/auth/unlocked.svg";
import closedIcon from "@/assets/auth/closed.svg";
import openIcon from "@/assets/auth/open.svg";
import userIcon from "@/assets/auth/user.svg";

import { ref, computed } from "vue";
import { useUserStore } from "~/stores/user";
import { useRouter } from "#app";

const userStore = useUserStore();
const router = useRouter();

const username = ref(userStore.user?.username || "");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const passwordMismatch = computed(
  () => password.value !== confirmPassword.value
);

const isFormValid = computed(() => {
  return username.value.trim() !== "" || password.value.trim() !== "";
});

const updateProfile = async () => {
  if (passwordMismatch.value) return;

  try {
    await userStore.updateProfile({
      username: username.value,
      password: password.value,
    });
    username.value = "";
    password.value = "";
    confirmPassword.value = "";
    router.push("/profile");
  } catch (error) {
    console.error("Update failed:", error);
  }
};

const signout = () => {
  userStore.logout();
  router.push("/auth/login");
};
</script>
