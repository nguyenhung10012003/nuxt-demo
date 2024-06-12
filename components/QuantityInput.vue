<template>
  <div class="flex gap-2 items-center">
    <button
        :disabled="value <= 1"
        class="p-1 bg-orange-600 rounded-md disabled:bg-orange-300"
        @click="decreaseValue"
    >
      <MinusIcon class="h-5 w-5 text-gray-800"/>
    </button>
    <input
        :value="value"
        class="w-8 text-center"
        @input="updateValue($event.target.value)"
    />
    <button
        class="p-1 bg-orange-600 rounded-md disabled:bg-orange-300"
        @click="increaseValue"
    >
      <PlusIcon class="h-5 w-5 text-gray-800"/>
    </button>
  </div>
</template>

<script setup>
import {defineEmits, defineProps} from 'vue';
import MinusIcon from '@heroicons/vue/20/solid/MinusIcon';
import PlusIcon from '@heroicons/vue/20/solid/PlusIcon';

// Props
const props = defineProps({
                            value: Number
                          });

// Emits
const emit = defineEmits(['update-value']);

// Methods
const decreaseValue = () => {
  if (props.value > 1) {
    emit('update-value', props.value - 1);
  }
};

const increaseValue = () => {
  emit('update-value', props.value + 1);
};

const updateValue = (newValue) => {
  const parsedValue = parseInt(newValue, 10);
  if (!isNaN(parsedValue)) {
    emit('update-value', parsedValue);
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
