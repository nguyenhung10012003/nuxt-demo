<template>
  <div class="flex flex-col px-3 gap-6" v-if="game && server && character">
    <div class="flex flex-col gap-4 border-gray-200 border-b pb-4">
      <h1 class="text-2xl font-bold text-gray-800">Nạp game: <span class="text-sky-600">{{ game?.name }}</span></h1>
      <div class="flex flex-row gap-2 items-center">
        <img :src="game?.image" alt="" class="w-28 h-28"/>
        <div>
          <h2 class="text-lg font-bold text-gray-800">{{ game?.name }}</h2>
          <p class="text-gray-800 text-md font-semibold">
            Server: <span class="text-red-500">{{ server.name }}</span>
          </p>
          <p class="text-gray-800 text-md font-semibold">
            Nhân vật: <span class="text-red-500">{{ character.name }}</span>
          </p>
          <p class="text-gray-800 text-md font-semibold">
            Cấp Vip: <span class="text-red-500">{{ character.vipLevel }}</span>
          </p>
          <router-link :to="`/game/${game.id}`" class="text-sm font-semibold text-orange-400 underline">
            Thay đổi tài khoản
          </router-link>
        </div>
      </div>
    </div>

    <ChoosePackage :packages="game.packages" :char="character"/>
  </div>
  <div v-else>No game found</div>
</template>

<script setup>
import {useUserStore} from '@/stores/userStore.ts';
import ChoosePackage from '@/components/ChoosePackage.vue';

const route = useRoute();
const userStore = useUserStore();

const gameId = ref(route.query.game);
const charId = ref(route.query.char);
const serverId = ref(route.query.server);

const {data: game} = useFetch(`/api/game?id=${gameId.value}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})

const character = computed(() => userStore.user.characters.find(char => char.id === charId.value));
const server = computed(() => game.value?.servers.find(server => server.id === serverId.value));

</script>
