<template>
  <div class="container">
    <header>
      <nav class="flex gap-4">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/library">Library</NuxtLink>
        <NuxtLink to="/flashcards">Flashcards</NuxtLink>
        <NuxtLink to="/profile">Profile</NuxtLink>
        <NuxtLink to="/auth/signup">Sign Up</NuxtLink>
        <NuxtLink to="/auth/login">Login</NuxtLink>
      </nav>
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/main.css";
</script>

<style scoped></style>
