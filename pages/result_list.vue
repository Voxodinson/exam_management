<template>
    <template v-if="openCreate">
        
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
                    class="w-[400px]"/>
                <UTooltip 
                    :text="isOpenFilter ? 'Close Filters' : 'Open Filters'"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        :icon="isOpenFilter ? 'material-symbols:close-rounded' : 'material-symbols:filter-alt-outline'"
                        size="md"
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
                            placeholder="Select a exam"
                            class="w-[250px]"/>
                        <SelectMenu
                            name=""
                            :options="[]"
                            value-attribute="id"
                            option-attribute="name"
                            id-attribute="id"
                            placeholder="Select a department"
                            class="w-[250px]"/>
                        <SelectMenu
                            name=""
                            :options="[]"
                            value-attribute="id"
                            option-attribute="name"
                            id-attribute="id"
                            placeholder="Select a class"
                            class="w-[250px]"/>
                        <SelectMenu
                            name=""
                            :options="[]"
                            value-attribute="id"
                            option-attribute="name"
                            id-attribute="id"
                            placeholder="Select a shift"
                            class="w-[250px]"/>
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
                    :data="[]"
                    is-custom
                    v-slot="{ data }"
                    @update:data="async (current_page: number): Promise<void> => {
                        
                    }">
                    <tr 
                        class="*:px-2.5 *:py-1.5 hover:bg-gray-100 cursor-pointer">
                        <td
                            class="w-[150px]">
                            <span>
                                {{ data.stu_id }}
                            </span>
                        </td>
                        <td>
                        </td>
                        <td>
                            <span>{{ data.fullname }}</span>
                        </td>
                        <td>
                            <span>{{ data.dob }}</span>
                        </td>
                        <td>
                            <span>{{ data.gender }}</span>
                        </td>
                        <td>
                            <span>{{ data.nationality }}</span>
                        </td>
                        <td>
                            <span
                                class="text-[.9rem]">
                                {{ data.class }} 
                                - <span v-if="data.year">Y{{ data.year }}</span>
                                <span v-else>-</span>
                                - {{ data.shift }}
                            </span>
                        </td>
                        <td class="w-[230px]">
                            <div class="*:text-[.9rem]">
                                <span>
                                    {{ data.phone }}
                                </span>
                                <span 
                                    class="block">
                                    {{ data.gmail }}
                                </span>
                            </div>
                        </td>
                        <td>
                            
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
    InputDateRange,
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
    Delete 
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
    status_id: '',
    warehouse_id: ''
});
const openCreate: Ref<boolean> = ref<boolean>(false);
const majorId: Ref<number | null> = ref<number | null>(null);
const linksItem = [
    {
        label: 'School Mangements'
    },
    {
        label: 'Department',
        to: 'department'
    }
];
const columns: Ref<Column[]> = ref<Column[]>([
    {
        title:'Action',
    },
    {
        title: 'PO Number'
    },
    {
        title: "Purchase Date"
    },
    {
        title: "Supplier"
    },
    {
        title: 'Total Amount($)'
    },
    {
        title: 'Total Amount Due($)'
    },
    {
        title:'Tax Amount($)'
    },
    {
        title:'Tax($)'
    },
    {
        title:'Status'
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
 const fetchData = async (current_page: number = 1, search: string = ''): Promise<void> => {
    const per_page: number = 10;
    let url: string = `purchase?per_page=${per_page}&page_no=${current_page}`;
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
        await fetchData(1, value);
    }, 250);
}

const filterData = async (current_page: number = 1): Promise<void> => {
    const per_page: number = 10;
    const url: string = `package?per_page=${per_page}&page_no=${current_page}&status_id=${filters.value.status_id}&warehouse_id=${filters.value.warehouse_id}`;
    const result: ResponseStatus = await api.get(url, false) as ResponseStatus;
    if(!result.error)
    {
        data.value = result as object;
    }
}
/**
 * End::Fetch data section
 */
 watch((): boolean => openCreate.value, async (value: boolean): Promise<void> => {
    if(!value)
    {
        majorId.value = null;
    }
});

onMounted(async (): Promise<void> => {
    // await fetchData();
});
</script>