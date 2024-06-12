<template>
  <Dialog>
    <DialogTrigger>
      <div class="flex flex-col justify-center gap-2">
        <img :src="pkg.image" alt="" class="md:w-48 md:h-48 w-28 h-28 object-cover bg-gray-200 rounded-2xl"/>
        <h3 class="text-lg font-bold text-gray-800 text-center w-full">{{ pkg.name }}</h3>
      </div>
    </DialogTrigger>
    <DialogContent class="md:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Thông tin gói nạp</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-2">
        <div class="flex items-center py-2 border-b border-gray-200">
          <img :src="pkg.image" class="h-20 w-20 rounded-lg bg-gray-200"/>
          <div class="ml-2">
            <h3 class="text-lg font-bold text-gray-800">{{ pkg.name }}</h3>
            <p class="text-lg font-bold text-gray-800">{{ `Price: ${pkg.price} FUN` }}</p>
          </div>
        </div>
        <div class="flex flex-col gap-4 py-2 border-b border-gray-200">
          <div>
            <span class="text-orange-500 font-semibold text-lg">Mô tả</span>
            <p class="text-gray-800 font-semibold ml-3">{{ pkg.description }}</p>
          </div>
          <ul>
            <span class="text-orange-500 font-semibold text-lg">Điều kiện</span>
            <li v-for="(condition, index) in pkg.conditions" :key="index" class="text-gray-800 font-semibold ml-3">
              {{ condition }}
            </li>
          </ul>
        </div>
        <div>
          <div class="text-gray-800 font-bold text-xl flex items-center gap-2">
            Số lượng:
            <QuantityInput :value="quantity" @update-value="setQuantity"/>
          </div>
        </div>
        <div class="flex gap-4 justify-center">
          <button class="bg-orange-600 text-white font-semibold py-2 px-3 sm:px-8 rounded-lg w-full max-w-[200px]">Mua
            ngay
          </button>
          <button class="bg-orange-600 text-white font-semibold py-2 px-3 sm:px-8 rounded-lg w-full max-w-[200px]"
                  @click="handleAddToCart">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import {ref} from 'vue';
import {useUserStore} from '@/stores/userStore.ts';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue';
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue';
import QuantityInput from '@/components/QuantityInput.vue';
import {useToast} from '@/components/ui/toast/use-toast';

// Props
const {pkg, char} = defineProps({
                                  pkg: Object,
                                  char: Object
                                });

// State
const quantity = ref(1);

// Store
const userStore = useUserStore();

// Methods
const setQuantity = (value) => {
  quantity.value = value;
};

const handleAddToCart = () => {
  try {
    userStore.addToCart({package: pkg, quantity: quantity.value}, char);
    useToast().toast({title: 'Thêm thành công!', variant: 'default'});
  } catch (e) {
    useToast().toast({title: e.message, variant: 'destructive'});
  }
};
</script>
