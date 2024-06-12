<template>
  <Dialog>
    <DialogTrigger>
      <div class="flex w-full gap-2 items-center">
        <div class="p-3 bg-red-500 rounded-md">
          <ShoppingCartIcon class="w-12 h-12 text-white"/>
        </div>
        <div class="flex flex-col justify-center">
          <h1 class="font-bold text-lg text-gray-900">Giỏ hàng</h1>
        </div>
      </div>
    </DialogTrigger>

    <DialogContent class="md:max-w-[830px] gap-0">
      <DialogHeader class="w-full items-center font-bold text-2xl">Giỏ hàng</DialogHeader>
      <DialogTitle></DialogTitle>
      <div v-if="game" class="mt-4">
        <h2 class="text-2xl text-gray-800 font-bold">Nạp game: <span class="text-blue-700">{{ game.name }}</span></h2>
        <div class="flex gap-2 mt-3">
          <img :src="game.image" alt="" class="w-24 h-24"/>
          <div class="flex flex-col justify-center">
            <p class="text-lg font-semibold">
              Server:
              <span class="text-red-500">{{
                  game.servers?.find(server => server.id === cart.character.serverId).name
                }}</span>
            </p>
            <p class="text-lg font-semibold">
              Nhân vật:
              <span class="text-red-500">{{ cart.character.name }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex border-gray-400 border-b border-t mt-4">
        <div class="w-[120px] border-r border-gray-400 font-bold py-1 text-center text-gray-800">Sản phẩm</div>
        <div class="flex w-full">
          <div class="w-[30%] border-r border-gray-400 font-bold py-1 text-center text-gray-800">Tên sản phẩm</div>
          <div class="w-[30%] border-r border-gray-400 font-bold py-1 text-center text-gray-800">Số lượng</div>
          <div class="w-[20%] border-r border-gray-400 font-bold py-1 text-center text-gray-800">Giá</div>
          <div class="w-[20%] font-bold py-1 text-center text-gray-800">Xoá</div>
        </div>
      </div>
      <div v-for="(item, index) in cart?.items" :key="index" class="flex border-gray-400 border-b">
        <div class="w-[120px] border-r border-gray-400 text-center text-gray-800 flex justify-center">
          <img :src="item.package.image" alt="" class="w-20 h-20 rounded-lg object-cover bg-gray-300"/>
        </div>
        <div class="flex w-full items-center">
          <div
              class="w-[30%] border-r border-gray-400 text-center text-gray-800 font-semibold text-lg h-full items-center flex justify-center">
            {{ item.package.name }}
          </div>
          <div
              class="w-[30%] border-r border-gray-400 text-center text-gray-800 font-semibold text-lg h-full items-center flex justify-center">
            {{ item.quantity }}
          </div>
          <div
              class="w-[20%] border-r border-gray-400 text-center text-gray-800 font-semibold text-lg h-full items-center flex justify-center">
            {{ item.package.price }}
          </div>
          <div
              class="w-[20%] py-1 text-center text-gray-800 font-semibold text-lg h-full items-center flex justify-center">
            <button class="text-red-500 font-bold" @click="handleRemoveFromCart(item)">Xoá</button>
          </div>
        </div>
      </div>
      <div class="flex w-full justify-center text-xl font-bold text-gray-800 mt-4">
        Tổng tiền:
        <span class="text-orange-500">{{ `${cart?.total || 0} FUN` }}</span>
      </div>
      <div class="w-full flex justify-center gap-2 mt-4 ">
        <DialogClose class="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg w-full max-w-[200px]">Quay lại
        </DialogClose>
        <DialogClose class="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg w-full max-w-[200px]">Thanh toán
        </DialogClose>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import {useUserStore} from '@/stores/userStore.ts'
import {ShoppingCartIcon} from '@heroicons/vue/20/solid'

const userStore = useUserStore();
const handleRemoveFromCart = (item) => {
  userStore.removeFromCart(item)
}
const cart = computed(() => userStore.cart);
const game = ref();
watch(cart, async (newCart) => {
  if (newCart) {
    game.value = await $fetch(`/api/game?id=${newCart.character.gameId}`);
  } else {
    game.value = null;
  }
})

</script>