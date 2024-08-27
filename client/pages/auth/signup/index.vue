<template>
  <div class="container">
    <div class="flex flex-col items-center justify-center text-center">
      <div
        class="flex flex-col items-center gap-6 justify-center text-center shadow-[0_4px_12px_0px_rgba(0,0,0,0.1)] p-16 rounded-2xl bg-white text-black"
      >
        <h2 class="text-3xl font-bold">Join to Quiz Deck</h2>
        <p class="text-[#828282] text-xs">
          Create an account and start learning today
        </p>
        <form
          class="flex flex-col items-center gap-6 justify-center"
          @submit.prevent="signup"
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
              placeholder="Username"
              type="text"
              class="border border-[#BDBDBD] pl-10 pr-4 py-2 rounded-md w-full"
              v-model="username"
            />
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <img src="~/assets/auth/user.svg" alt="" class="w-4" />
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
                :src="showConfirmPassword ? unlocked : passwordIcon"
                alt=""
                class="w-4"
              />
            </div>
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              @click="toggleConfirmPasswordVisibility"
            >
              <img
                :src="showConfirmPassword ? open : closed"
                alt=""
                class="w-4"
              />
            </div>
          </div>
          <p v-if="passwordMismatch" class="text-red-500 text-xs">
            Passwords do not match
          </p>
          <button
            :disabled="passwordMismatch"
            class="bg-[#2F80ED] rounded-xl px-4 py-2 text-white w-full"
          >
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
          Already have an account?
          <a href="/auth/login" class="text-[#2F80ED] font-bold">Log in</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp();
import unlocked from "~/assets/auth/unlocked.svg";
import passwordIcon from "~/assets/auth/password.svg";
import open from "~/assets/auth/open.svg";
import closed from "~/assets/auth/closed.svg";

const userStore = useUserStore();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const passwordMismatch = computed(() => {
  return password.value !== confirmPassword.value;
});

const signup = async () => {
  if (passwordMismatch.value) {
    return;
  }

  try {
    await userStore.signup({
      email: email.value,
      username: username.value,
      password: password.value,
    });

    if (userStore.user) {
      await userStore.login({
        email: email.value,
        password: password.value,
      });
      $toast.success("Signed up in successfully");

      await navigateTo("/library");
    }
  } catch (error) {
    $toast.error("Check fields and try again");
  }
};
</script>

<style scoped></style>
