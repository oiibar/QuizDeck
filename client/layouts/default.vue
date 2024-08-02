<template>
  <header>
    <nav class="flex gap-4">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/library">Library</NuxtLink>
      <NuxtLink to="/flashcards">Flashcards</NuxtLink>
    </nav>
  </header>
  <div>
    <slot />
  </div>
</template>
