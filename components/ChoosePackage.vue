<template>
  <div class="flex flex-col gap-4">
    <h2 class="font-bold text-center text-2xl text-gray-800">Chọn gói nạp</h2>
    <div class="flex gap-4 w-full justify-around border-b border-gray-200 py-4 flex-wrap">
      <button
          @click="setTab('all')"
          :class="`min-w-[200px] px-4 py-2 rounded-lg w-[250px] ${tab === 'all' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-800'}`"
      >
        Tất cả
      </button>
      <button
          v-for="pkgType in packageTypes"
          :key="pkgType.id"
          @click="setTab(pkgType.id)"
          :class="`min-w-[200px] px-4 py-2 rounded-lg w-[250px] ${tab === pkgType.id ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-800'}`"
      >
        {{ pkgType.name }}
      </button>
    </div>
    <div class="flex gap-4 w-full border-b border-gray-200 py-4 flex-wrap justify-center sm:justify-normal">
      <PackageModal
          v-for="pkg in filteredPackages"
          :key="pkg.id"
          :pkg="pkg"
          :char="char"
      />
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import PackageModal from '@/components/PackageModal.vue';

// Props
const {packages, char} = defineProps({
                                       packages: Array,
                                       char: Object
                                     });

const tab = ref('all');

const packageTypes = computed(() => {
  const types = [];
  packages.forEach(pkg => {
    if (!types.some(type => type.id === pkg.type.id)) {
      types.push(pkg.type);
    }
  });
  return types;
});

const setTab = (id) => {
  tab.value = id;
};


const filteredPackages = computed(() => {
  return tab.value === 'all' ? packages : packages.filter(pkg => pkg.type.id === tab.value);
});
</script>
