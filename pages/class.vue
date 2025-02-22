<template>
    <template v-if="openCreate">
        <Class
            :class-id="classId"
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
                <UInput
                    icon="material-symbols:search"
                    type="text"
                    color="white"
                    variant="outline"
                    size="sm"
                    name="district"
                    role="input"
                    placeholder="Search name here..."
                    class="w-[300px]"
                    @input="async (event: Event): Promise<void> => {
                        const value: string = (event?.target as HTMLInputElement)?.value;
                        await searchData(value);
                    }"/>
                <UTooltip 
                    text="Create New Exam"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        icon="material-symbols:add-circle-outline-rounded"
                        size="sm"
                        color="black"
                        label="New Class"
                        variant="soft" 
                        :padded="false"
                        @click="()=>{
                            toggleCreate(true);
                        }"
                        class="bg-[#3A6D8C] hover:bg-gray-200 text-white hover:text-black p-1.5 transition"/>
                </UTooltip>
                <UTooltip 
                    :text="isOpenFilter ? 'Close Filters' : 'Open Filters'"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        :icon="isOpenFilter ? 'material-symbols:close-rounded' : 'material-symbols:filter-alt-outline'"
                        size="sm"
                        color="black"
                        variant="soft" 
                        :padded="false"
                        @click="()=>{
                            toggleFilter();
                        }"
                        class="bg-[#3A6D8C] hover:bg-gray-200 text-white hover:text-black p-1.5 transition"/>
                </UTooltip>
            </div>
        </div>
        <div 
            class="w-full p-2 ">
            <div 
                v-if="isOpenFilter"
                class="w-full flex gap-2 justify-between bg-white rounded-md p-2 mb-2" >
                    <div 
                        class="flex w-fit flex-wrap gap-2">
                        <SelectMenu
                            name=""
                            :options="[]"
                            value-attribute="id"
                            option-attribute="name"
                            id-attribute="id"
                            placeholder="Select a department"
                            class="w-[230px]"
                            @update:model-value="async (value: Items): Promise<void> => {
                                if(value?.id){
                                    filters.department_id = Number(value.id);
                                }
                                else{
                                    filters.department_id = '';
                                }
                                await fetchData(Number($route.query.page_no) || 1);
                            }"
                            :model-value="filters.warehouse_id"/>
                        <SelectMenu
                            name=""
                            :options="[]"
                            value-attribute="id"
                            option-attribute="name"
                            id-attribute="id"
                            placeholder="Select a major"
                            class="w-[230px]"
                            @update:model-value="async (value: Items): Promise<void> => {
                                if(value?.id){
                                    filters.major_id = Number(value.id);
                                }
                                else{
                                    filters.major_id = '';
                                }
                                await fetchData(Number($route.query.page_no) || 1);
                            }"
                            :model-value="filters.major_id"/>
                        <UTooltip 
                            text="Sort by Letter"
                            :popper="{ offsetDistance: 12 }">
                            <UButton
                                icon="solar:round-sort-vertical-broken"
                                size="sm"
                                color="black"
                                variant="soft" 
                                :padded="false"
                                @click="()=>{
                                }"
                                class="bg-white hover:bg-gray-200 text-black p-2 transition"/>
                        </UTooltip>
                    </div>
                
                    <UTooltip 
                        text="Cleare Filter"
                        :popper="{ offsetDistance: 12 }">
                        <UButton
                            icon="pajamas:clear-all"
                            size="sm"
                            color="black"
                            variant="soft" 
                            :padded="false"
                            @click="()=>{
                            }"
                            class="bg-white hover:bg-gray-200 text-red-500 px-2 transition"/>
                    </UTooltip>
            </div>
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
                            <span>{{ data.name_kh }}</span>
                        </td>
                        <td
                            class="w-[200px]">
                            <span
                                class="text-[.8rem]">
                                {{ data.description }}
                            </span>
                        </td>
                        <td>
                            <span>{{ data.created_at }}</span>
                        </td>
                        <td>
                            <span>{{ data.created_by }}</span>
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
                                            classId = data.id as number;
                                            toggleCreate(true);
                                        }
                                    }], 
                                    [{
                                        label: `Delete ${data.name}`,
                                        icon: 'i-heroicons-trash-20-solid',
                                        iconClass: 'text-red-500',
                                        class: 'text-red-500',
                                        click: async (): Promise<void> => {
                                            Confirm(`Do you want to delete ${data.name} class?`, async (): Promise<void> => {
                                                const result = await api.delete(`class/${data.id}`, true, {}) as ResponseStatus;
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
    Table,
    SelectMenu
} from '@/components/ui';
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import type {
    Column,
    Items,
    Options,
    ResponseStatus
} from "@/models/type";
import { 
    Class 
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
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const isOpenFilter: Ref<boolean> = ref<boolean>(true);
const filters: Ref<Items> = ref<Items>({
    department_id: '',
    major_id: ''
});
const openCreate: Ref<boolean> = ref<boolean>(false);
const classId: Ref<number | null> = ref<number | null>(null);
const linksItem = [
    {
        label: 'School Mangements'
    },
    {
        label: 'Class List',
        to: '/class'
    }
];
const columns: Ref<Column[]> = ref<Column[]>([
    {
        title:'Name (EN)',
    },
    {
        title: 'Name (KH)'
    },
    {
        title: "description"
    },
    {
        title: 'Create By'
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
const toggleFilter = (): void => {
    isOpenFilter.value = !isOpenFilter.value as boolean;
}
/**
 * End::Some logical in this component
 */

/**
 * Begin::Fetch data section
 */
 const fetchData = async (current_page: number = 1, per_page: number = 10, search: string = ''): Promise<void> => {
    let url: string = `class?per_page=${per_page}&page_no=${current_page}&department_id=${filters.value.department_id}$major_id${filters.value.major_id}`;
    if(search)
    {
        url += `&search=${search}`;
    }
    const result: ResponseStatus = await api.get(url) as ResponseStatus;
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

const searchData = async (value: string): Promise<void> => {
    if(timeout.value)
    {
        clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(async (): Promise<void> => {
        await fetchData(1, 10, value);
    }, 250);
}
/**
 * End::Fetch data section
 */
 watch((): boolean => openCreate.value, async (value: boolean): Promise<void> => {
    if(!value)
    {
        classId.value = null;
    }
});

onMounted(async (): Promise<void> => {
    await fetchData();
});
</script>