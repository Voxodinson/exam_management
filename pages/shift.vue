<template>
    <template v-if="openCreate">
        <ShiftTime
            :shift-id="shiftId"
            @toggle="toggleCreate"
            @update:data="fetchData"/>
    </template>
    <template
        v-else>
        <div 
            class="flex items-center justify-between h-[45px] px-4 bg-white border-b-[1px] border-gray-200">
            <UBreadcrumb 
                :links="linksItem"
                divider="/"
                :ui="{
                    base: 'font-semibold text-[.8rem]',
                    inactive: 'hover:text-blue-200',
                    active: 'text-blue-400',}"/>
            <div 
                class=" flex gap-2 items-center justify-center h-full">
                <UTooltip 
                    text="Create New Exam"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        icon="material-symbols:add-circle-outline-rounded"
                        size="sm"
                        color="black"
                        label="New Shift"
                        variant="soft" 
                        :padded="false"
                        @click="()=>{
                            toggleCreate(true);
                        }"
                        class="bg-[#3A6D8C] hover:bg-gray-200 text-white hover:text-black p-1.5 transition"/>
                </UTooltip>
            </div>
        </div>
        <div 
            class="w-full p-2 ">
            <div 
                class="w-full bg-white rounded-md overflow-hidden">
                <Table
                    :columns="columns"
                    :data="data"
                    is-custom
                    v-slot="{ data }"
                    @update:data="async (current_page: number): Promise<void> => {
                        
                    }">
                    <tr 
                        class="*:px-2.5 *:py-1.5 hover:bg-gray-100 cursor-pointer">
                        <td>
                            <span>{{ data.name }}</span>
                        </td>
                        <td>
                            <span>
                                {{ data.start_time || '--:--' }}  -  {{ data.end_time || '--:--' }}
                            </span>
                        </td>
                        <td
                            class="w-[200px]">
                            <span
                                class="text-[.8rem]">
                                {{ data.description || '-----' }}
                            </span>
                        </td>
                        <td>
                            <div
                                class="w-[150px] leading-5">
                                {{ data.created_at.toString().split(' ')[0] || '-----' }} <br>
                                <span
                                    class="text-[.8rem] text-blue-400">
                                    {{ data.created_at.toString().split(' ')[1] || '-----' }}
                                </span>
                            </div>
                        </td>
                        <td>
                            <UDropdown 
                                :items="[
                                    [{
                                        label: 'Edit',
                                        iconClass: 'text-green-500',
                                        class: 'text-green-500',
                                        icon: 'i-heroicons-pencil-square-20-solid',
                                        click: () => {
                                            shiftId = data.id as number;
                                            toggleCreate(true);
                                        }
                                    }], 
                                    [{
                                        label: `Delete ${data.name}`,
                                        icon: 'i-heroicons-trash-20-solid',
                                        iconClass: 'text-red-500',
                                        class: 'text-red-500',
                                        click: async (): Promise<void> => {
                                            Confirm(`Do you want to delete ${data.name} shift?`, async (): Promise<void> => {
                                                const result = await api.delete(`shift/time/${data.id}`, true, {}) as ResponseStatus;
                                                if (!result.error) {
                                                    await fetchData();
                                                }
                                            });
                                        }
                                    }]
                                ]" 
                                :popper="{ placement: 'bottom-start' }">
                                <UButton 
                                    color="white"
                                    trailing-icon="i-heroicons-chevron-down-20-solid" />
                            </UDropdown>
                        </td>
                    </tr>
                </Table>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { 
    Table
} from '@/components/ui';
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import type {
    Column,
    Options,
    ResponseStatus
} from "@/models/type";
import { 
    ShiftTime
} from '@/collector/pages';
import {
    Confirm
} from '@/utils/dialog';
definePageMeta({
    colorMode: 'light'
});

/**
 * Begin::Declare variable object section
 */
 const api: ContextAPI = new ContextAPI(new SimpleAPI());
/**
 * End::Declare variable object section
 */

/**
 * Begin::Declare variable section
 */
const dataOptions: Ref<Options> = ref<Options>({});
const data: Ref<object> = ref<object>({});
const openCreate: Ref<boolean> = ref<boolean>(false);
const shiftId: Ref<number | null> = ref<number | null>(null);
const linksItem = [
    {
        label: 'School Mangements'
    },
    {
        label: 'Shift Lists',
        to: '/shift'
    }
];
const columns: Ref<Column[]> = ref<Column[]>([
    {
        title:'Shift',
    },
    {
        title: 'Shift (Start - End)'
    },
    {
        title: "description"
    },
    {
        title: 'Create At'
    },
    {
        title: 'Action'
    }
 ])

/**
 * End::Declare variable section
 */ 

/**
 * Begin::Some logical in this component
 */
const toggleCreate = (value: boolean) => {
    openCreate.value = value as boolean;
}
/**
 * End::Some logical in this component
 */

/**
 * Begin::Fetch data section
 */
 const fetchData = async (current_page: number = 1,per_page: number = 10): Promise<void> => {
    const result: ResponseStatus = await api.get(`shift/time?current_page=${current_page}&per_page=${per_page}`, false) as ResponseStatus;
    if(!result.error)
    {
        data.value = result as object;
    }
}

const fetchOption = async (): Promise<void> => {
    const options: ResponseStatus = await api.get("") as ResponseStatus;
    if(!options.error)
    {
        dataOptions.value = options.data as unknown as Options;
    }
};
/**
 * End::Fetch data section
 */
 watch((): boolean => openCreate.value, async (value: boolean): Promise<void> => {
    if(!value)
    {
        shiftId.value = null;
    }
});

onMounted(async (): Promise<void> => {
    await fetchData();
});
</script>