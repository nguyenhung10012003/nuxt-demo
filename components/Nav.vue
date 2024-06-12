<template>
  <div class="flex bg-gray-200 gap-2 md:px-20 lg:px-32 px-5 py-10 flex-wrap md:justify-center">
    <div v-for="(item, index) in navItems" :key="index" class="flex w-full max-w-[250px]">
      <div v-if="item.isModal" class="flex w-full max-w-[250px]">
        <component :is="item.modal"></component>
      </div>
      <NuxtLink v-else :href="item.href || '#'" class="flex w-full gap-2 max-w-[250px]">
        <div :class="`p-3 ${item.bgColor} rounded-md`">
          <component :is="item.icon" class="w-12 h-12 text-white"></component>
        </div>
        <div class="flex flex-col justify-center">
          <p v-if="item.subTitle" class="font-bold text-md text-gray-600">{{ item.subTitle }}</p>
          <h1 class="font-bold text-lg text-gray-900">{{ item.title }}</h1>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { IdentificationIcon, WalletIcon, ClockIcon } from '@heroicons/vue/20/solid'
import CartModal from '../components/CartModel'
import {useUserStore} from "@/stores/userStore.ts";

export default {

  components: {
    IdentificationIcon,
    WalletIcon,
    ClockIcon,
    CartModal
  },
  data() {
    return {
      user: {},
      navItems: [
        {
          title: this.user.id,
          subTitle: 'ID Tài khoản',
          icon: 'IdentificationIcon',
          bgColor: 'bg-blue-500',
          href: '#',
          isModal: false
        },
        {
          title: `${this.user.balance} FUN`,
          subTitle: 'Số dư ví',
          icon: 'WalletIcon',
          bgColor: 'bg-green-500',
          href: '#',
          isModal: false
        },
        {
          title: 'Lịch sử',
          icon: 'ClockIcon',
          bgColor: 'bg-yellow-500',
          href: '#',
          isModal: false
        },
        {
          title: 'Giỏ hàng',
          isModal: true,
          modal: 'CartModal'
        }
      ]
    }
  },
  beforeCreate() {
    this.user = useUserStore().user
  }
}
</script>