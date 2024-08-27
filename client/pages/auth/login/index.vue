<template>
  <div class="container">
    <div class="flex flex-col items-center justify-center text-center">
      <div
        class="flex flex-col items-center gap-6 justify-center text-center shadow-[0_4px_12px_0px_rgba(0,0,0,0.1)] p-16 rounded-2xl bg-white text-black"
      >
        <h2 class="text-3xl font-bold">Welcome back</h2>
        <p class="text-[#828282] text-xs">
          Access your flashcards and start learning today
        </p>
        <form
          class="flex flex-col items-center gap-6 justify-center"
          @submit.prevent="login"
        >
          <div class="relative w-full">
            <input
              placeholder="Email"
              type="email"
              class="border border-[#BDBDBD] pl-10 pr-4 py-2 rounded-md w-full"
              v-model="email"
            />
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <img src="~/assets/auth/email.svg" alt="" class="w-4" />
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
                :src="showPassword ? unlocked : passwordIcon"
                alt=""
                class="w-4"
              />
            </div>
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              @click="togglePasswordVisibility"
            >
              <img :src="showPassword ? open : closed" alt="" class="w-4" />
            </div>
          </div>
          <button class="bg-[#2F80ED] rounded-xl px-4 py-2 text-white w-full">
            Start Your Learning
          </button>
        </form>
        <p class="text-[#828282] text-xs">
          or continue with these social profiles
        </p>
        <div class="flex gap-4">
          <a href="">
            <img
              src="~/assets/auth/google.svg"
              alt=""
              class="border w-8 border-[#BDBDBD] rounded-full p-2 transition duration-300 ease-in-out hover:scale-150 hover:text-white"
            />
          </a>
          <a href="">
            <img
              src="~/assets/auth/github.svg"
              alt=""
              class="border w-8 border-[#BDBDBD] rounded-full p-2 transition duration-300 ease-in-out hover:scale-150 hover:text-white"
            />
          </a>
        </div>
        <p class="text-[#828282] text-xs mt-4">
          Don't have an account?
          <a href="/auth/signup" class="text-[#2F80ED] font-bold">Create one</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import unlocked from "~/assets/auth/unlocked.svg";
import passwordIcon from "~/assets/auth/password.svg";
import open from "~/assets/auth/open.svg";
import closed from "~/assets/auth/closed.svg";

const { $toast } = useNuxtApp();
const userStore = useUserStore();
const showPassword = ref(false);
const email = ref("");
const password = ref("");

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const login = async () => {
  try {
    await userStore.login({
      email: email.value,
      password: password.value,
    });

    if (userStore.user) {
      $toast.success("Logged in successfully");
      await navigateTo("/library");
    }
  } catch (error) {
    $toast.error("Email or password is incorrect");
  }
};
</script>

<style scoped></style>
