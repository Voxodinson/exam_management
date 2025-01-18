<template>
  <UPopover
    class="fixed-to-datepicker"
    :popper="{
      placement: 'bottom-start'
    }">
    <UInput
      :id="useId()"
      type="text"
      color="white"
      variant="outline"
      size="md"
      :name="name"
      icon="i-heroicons-calendar-days-20-solid"
      class="w-full"
      placeholder="dd-MM-yyyy"
      v-model="dateFormatted"
      role="input"
      readonly/>
    <template #panel="{ close }">
      <DatePicker
        v-model="date"
        is-required
        @update:model-value="getDate"
        @close="close"/>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import {
  DatePicker
} from "@/components/ui/";
import {
  format
} from 'date-fns';

defineProps({
  name: {
    type: String,
    required: false
  }
});

/**
 * Begin::Declare variable section
 */
const date: Ref<Date> = ref<Date>(new Date());
const dateFormatted = computed(() => format(date.value, 'dd-MMM-yyyy'));
/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical in this component
 */
const getDate = (value: string): void => {
  date.value = new Date(value);
}
/**
 * End::Some logical in this component
 */
</script>

<style lang="css">
.fixed-to-datepicker > div.group{
  position: fixed;
}
</style>