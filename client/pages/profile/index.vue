<template>
  <div
    class="container space-y-4 w-full max-w-md bg-white rounded-lg p-8 text-black"
  >
    <h2 class="text-5xl font-bold text-center">Profile</h2>
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
          <img src="~/assets/auth/user.svg" alt="Username" class="w-4" />
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
            alt="Password"
            class="w-4"
          />
        </div>
        <div
          class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          @click="togglePasswordVisibility"
        >
          <img
            :src="showPassword ? openIcon : closedIcon"
            alt="Password"
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
            alt="Confirm Password"
            class="w-4"
          />
        </div>
        <div
          class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          @click="toggleConfirmPasswordVisibility"
        >
          <img
            :src="showConfirmPassword ? openIcon : closedIcon"
            alt="Confirm Password"
            class="w-4"
          />
        </div>
      </div>
      <p v-if="passwordMismatch" class="text-red-500">Passwords do not match</p>
      <button
        type="submit"
        :disabled="!isFormValid"
        class="w-full bg-blueAc text-white py-2 px-4 rounded-md"
      >
        Update Profile
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import passwordIcon from "@/assets/auth/password.svg";
import unlockedIcon from "@/assets/auth/unlocked.svg";
import closedIcon from "@/assets/auth/closed.svg";
import openIcon from "@/assets/auth/open.svg";
import { useToast } from "vue-toastification";
import { useUserStore } from "~/stores/user";

const toast = useToast();
const userStore = useUserStore();
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
    toast.success("Profile updated successfully");
    navigateTo("/");
  } catch (error) {
    toast.error("All fields are required");
  }
};
</script>
