<template>
    <template
        v-if="!isCustom && Array.from(columns)[0]">
        <table
            class="w-full overflow-hidden border-[1px] border-gray-200 rounded-md">
            <thead>
                <tr>
                    <th
                        v-for="(column, idx) in columns"
                        :key="idx"
                        class="px-2.5 py-1.5 text-start text-sm">
                        <span class="uppercase  text-[.9rem] font-semibold">
                            {{column.title}}
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody
                class="divide-y divide-gray-200">
                <tr
                    v-for="(item, idx) in data.data"
                    :key="idx"
                    :data-id="item.id || ''">
                    <td
                        v-for="(column, idx) in columns"
                        :key="idx"
                        class="px-2.5 py-1.5"
                        :class="column?.class">
                        <template
                            v-if="typeof column.key === 'function'">
                            <component
                                :is="column.key(item, idx)"/>
                        </template>
                        <template
                            v-else>
                            <span
                                :name="column.key"
                                :title="column.key ? item[column.key] : ''"
                                class="max-w-sm line-clamp-3">{{ column.key ? item[column.key] : '' }}</span>
                        </template>
                    </td>
                </tr>
                <tr
                    v-if="!Array.from(data?.data || [])[0]">
                    <td
                        colspan="100%"
                        class="text-center py-2 font-semibold text-lg  border-gray-200 border-[1px] text-gray-400">
                        <div 
                            v-if="data.total === Number(0)"
                            class="w-full flex gap-3 flex-col items-center mt-10 justify-center">
                            <img 
                                :src="NoDataFound" 
                                alt="no data image"
                                class="w-[50px] opacity-30">
                            <span
                                class="text-gray-400 text-[.8rem]">
                                Ops...! Data not available
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </template>
    <template
        v-else-if="isCustom && Array.from(columns)[0]">
        <table
            class="w-full overflow-hidden border-[1px] border-gray-200 rounded-md ">
            <thead>
                <tr>
                    <th
                        v-for="(column, idx) in columns"
                        :key="idx"
                        class="px-2.5 py-1.5 bg-[#3A6D8C] text-white text-start text-[.8rem] uppercase font-normal">{{ column.title || '' }}
                    </th>
                </tr>
            </thead>
            <tbody
                class="divide-y divide-gray-200 ">
                <template
                    v-for="(item, idx) in data.data">
                    <slot
                        :data="item"
                        :index="idx"></slot>
                </template>
                <tr
                    v-if="!Array.from(data?.data || [])[0]">
                    <td
                        colspan="100%"
                        class="text-center py-2 font-semibold text-lg  border-gray-200 border-[1px] text-gray-400">
                        <div 
                            v-if="data.total === Number(0)"
                            class="w-full flex gap-3 flex-col items-center mt-10 justify-center">
                            <img 
                                :src="NoDataFound" 
                                alt="no data image"
                                class="w-[50px] opacity-30">
                            <span
                                class="text-gray-400 text-[.8rem]">
                                Ops...! Data not available
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </template>
    <template
        v-else>
        <template
            v-if="!Array.from(columns)[0]">
            <div
                class="w-full overflow-auto"
                v-for="(item, idx) in data.data"
                :key="idx">
                <slot
                    :data="item"
                    :index="idx"></slot>
            </div>
        </template>
        <p
            v-else
            class="text-center py-2 font-semibold text-lg text-gray-400">No Data!!!</p>
    </template>
    <div
        class="flex justify-between items-center mt-3 mb-2">
        <p
            class="text-sm p-2 m-0">Showing 0 to {{ data.per_page || '0' }} of {{ data.total || '0' }} entries</p>
        <UPagination
            v-if="(data.total_page || 0) > 1"
            size="sm"
            v-model="page"
            :total="data.total || 0"
            show-first
            show-last
            class="px-3"
            @update:model-value="(value: number) => {
                emits('update:data', value);
            }"
            :to="(page_no: number) => ({
                query: {
                    page_no
                }
            })"/>
    </div>
</template>

<script setup lang="ts">
import type {
    Column,
    DataChild
} from '@/models/type';
import {
    NoDataFound 
} from '@/assets/images';
defineProps({
    columns: {
        type: Array as PropType<Column[]>,
        default: () => ([]),
        required: false
    },
    data: {
        type: Object as PropType<DataChild | any>,
        default: () => ({
            data: {}
        }),
        required: false
    },
    isCustom: {
        type: Boolean,
        default: false,
        required: false
    }
});

/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits(['update:data']);
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variable section
 */
const page: Ref<number> = ref<number>(1);
/**
 * End::Declare variable section
 */
</script>