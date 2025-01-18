<template>
    <div class="flex items-center justify-between h-[45px] px-4 bg-white border-b-[1px] border-gray-200">
        <UBreadcrumb 
            :links="linksItem"
            divider="/"
                :ui="{
                    base: 'font-semibold text-[.8rem]',
                    inactive: 'hover:text-blue-200',
                    active: 'text-blue-400',}"/>
        <div class=" flex gap-2 items-center justify-center h-full">
            <UTooltip 
                text="Create New Exam"
                :popper="{ offsetDistance: 12 }">
                <UButton
                        icon="material-symbols:add-circle-outline-rounded"
                        size="sm"
                        color="black"
                        label="New Exam"
                        variant="soft" 
                        :padded="false"
                        class="bg-[#3A6D8C] hover:bg-gray-200 text-white hover:text-black p-1 transition"/>
            </UTooltip>
            <UTooltip 
                text="Open Filters"
                :popper="{ offsetDistance: 12 }">
                <UButton
                        icon="material-symbols:filter-alt-outline"
                        size="sm"
                        color="black"
                        variant="soft" 
                        :padded="false"
                        class="bg-[#3A6D8C] hover:bg-gray-200 text-white hover:text-black p-1 transition"/>
            </UTooltip>
        </div>
    </div>
    <div class=" flex gap-2 h-fit items-center justify-center">
            <SelectMenu
                name=""
                :options="[]"
                value-attribute="id"
                option-attribute="name"
                id-attribute="id"
                placeholder="Select a subject"
                class="w-[250px]"/>
            <InputDate
                class="w-[250px]"/>
            <UInput
                icon="material-symbols:search"
                type="text"
                color="white"
                variant="outline"
                size="md"
                name="district"
                role="input"
                placeholder="Search here..."
                class="w-[250px]"/>
                <UTooltip 
                text="Create New Exam"
                :popper="{ offsetDistance: 12 }">
            </UTooltip>
        </div>
    <div>
        THIS IS HOME PAGE
    </div>
</template>

<script setup>
import { 
    SelectMenu,
    InputDate
} from '@/components/ui';
definePageMeta({
    colorMode: 'light'
});

const linksItem = [
  {
      label: 'Main Menu'
  },
  {
      label: 'All Exam',
  }
];
</script>