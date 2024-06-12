<template>
  <div class="flex flex-col px-3 gap-6">
    <div class="flex flex-col gap-4 border-gray-200 border-b pb-4">
      <h1 class="text-2xl font-bold text-gray-800">Nạp game: <span class="text-sky-600">{{ game?.name || "" }}</span>
      </h1>
      <div class="flex flex-row gap-2 items-center">
        <img :src="game?.image" alt="" class="w-28 h-28"/>
        <h2 class="text-lg font-bold text-gray-800">{{ game?.name }}</h2>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="font-bold text-center text-2xl text-gray-800">Chọn nhân vật</h2>
      <div class="flex gap-2 flex-col">
        <label class="font-semibold" for="server">Chọn server</label>
        <select v-model="server" @change="handleServerChange" class="w-full border-gray-200 border p-2 rounded-lg">
          <option value="" selected disabled hidden>Chọn server</option>
          <option v-for="server in game?.servers" :value="server.id" :key="server.id">{{ server.name }}</option>
        </select>
      </div>
      <div class="flex gap-2 flex-col">
        <label class="font-semibold" for="character">Chọn nhân vật</label>
        <select v-model="character" :disabled="!server" class="w-full border-gray-300 border p-2 rounded-lg"
        >
          <option v-if="character" :value="character" :selected="true">{{
              findCharacter?.name || "Chọn nhân vật"
            }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex w-full gap-4 justify-center">
      <button @click="goBack" class="bg-gray-300 text-gray-800 font-semibold py-2 px-8 rounded-lg">Quay lại</button>
      <button @click="confirm" :disabled="!character || !server"
              class="bg-orange-600 text-white font-semibold py-2 px-8 rounded-lg"
              :class="{ 'disabled:bg-orange-400 disabled:text-gray-200 disabled:cursor-not-allowed': !character || !server }"
      >
        Xác nhận
      </button>
    </div>
    <div class="bg-gray-200 p-2">
      <ul>
        <span class="text-orange-500 font-semibold">Lưu ý</span>
        <li v-for="(note, index) in notes" :key="index" class="p-2 text-gray-500 text-md">{{ note }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>

const route = useRoute();
const {data: game} = useFetch(`/api/game?id=${route.params.id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
const router = useRouter();
const notes = [
  "Nhân vật phải ở trạng thái online",
  "Nhân vật không được đang trong trận đấu",
  "Nhân vật không được đang trong trạng thái AFK"
];
const {user} = useUserStore();
const character = ref("");
const server = ref("");
const findCharacter = computed(() => {
  return user.characters.find(character => character.serverId === server.value && character.gameId === game.value.id);
});

const handleServerChange = () => {
  const char = user.characters.find(character => character.serverId === server.value && character.gameId === game.value.id);
  character.value = char ? char.id : "";
}

const goBack = () => router.back();
const confirm = () => {
  router.push(`/topup?game=${game.value.id}&server=${server.value}&char=${character.value}`)
}

useServerHead({
                title: `Nạp game ${game.value?.name || ""}`
              })

</script>
