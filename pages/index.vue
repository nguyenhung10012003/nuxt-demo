<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-bold">Chọn Game</h1>
    <div class="flex gap-4 mt-2 flex-wrap md:flex-row justify-center md:justify-normal">
      <div v-for="game in games" :key="game.id" class="flex flex-col items-center max-w-[120px]">
        <NuxtLink :to="`/game/${game.id}`">
          <img :src="game.image" :alt="game.name" class="rounded-lg w-28 h-28 object-cover"/>
          <h2 class="text-sm font-bold mt-2 text-center">{{ game.name }}</h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>

useHead({
          title: "Chọn game",
        })

const {data: games} = useFetch('/api/game', {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})

</script>
