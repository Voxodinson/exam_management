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
                    :icon="isOpenFilter ? 'material-symbols:close-rounded' : 'material-symbols:filter-alt-outline'"
                    size="sm"
                    color="black"
                    variant="soft" 
                    :padded="false"
                    @click="()=>{
                        toggle();
                    }"
                    class="bg-[#3A6D8C] hover:bg-gray-200 text-white hover:text-black p-1 transition"/>
            </UTooltip>
        </div>
    </div>
    <div class="w-full p-2">
        <div
            class="w-full h-[130px]  overflow-auto flex gap-2 p-2 rounded-md bg-white">
            <div class="w-fit flex gap-3">
                <div 
                    class="w-[250px] rounded-md border-gray-200 border-[1px] cursor-pointer bg-[#3A6D8C] flex items-center justify-center gap-2 group">
                    <UIcon
                        name="material-symbols:add-circle-outline-rounded"
                        class="w-8 h-8 text-white group-hover:scale-110 transition"/>
                    <span
                        class="text-white">
                        New Exam
                    </span>
                </div>
                <div 
                    v-for="i in 10"
                    class="h-full w-fit flex gap-2">
                    <div 
                        class="h-full bg-white border-[1px] border-gray-200 w-[250px] rounded-md flex items-center justify-center p-2 text-wrap text-center hover:bg-gray-200 transition cursor-pointer">
                        IT Y3 Final Exam
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import type {
    Items,
    Options,
    ResponseStatus,
} from "@/models/type";
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
const filters: Ref<Items> = ref<Items>({
    status_id: '',
    warehouse_id: ''
});
const isOpenFilter: Ref<boolean> = ref<boolean>(false);
const linksItem = [
  {
      label: 'Main Menu'
  },
  {
      label: 'Home',
  }
];

/**
 * End::Declare variable section
 */ 

/**
 * Begin::Some logical in this component
 */
 const toggle = (): void => {
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

onMounted(async (): Promise<void> => {
});
</script>