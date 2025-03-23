<template>
    <template v-if="openCreate">
        <Department
            :department-id="departmentId"
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
                        label="New Department"
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
                        <td
                            class="w-fit">
                            <span>
                                {{ data.name || '-----' }}
                            </span>
                        </td>
                        <td>
                            <span>{{ data.name_kh || '-----' }}</span>
                        </td>
                        <td
                            class="">
                            <div class="w-fit flex flex-col">
                                <span class="w-fit text-nowrap text-[.8rem]">
                                    Email: {{ data.email }}
                                </span>
                                <span class="text-[.8rem]">
                                    Phone: {{ data.phone_number }}
                                </span>
                            </div>
                        </td>
                        <td
                            class="]">
                            <span
                                class="text-[.8rem]">
                                {{ data.description || '-----'}}
                            </span>
                        </td>
                        <td
                            class="">
                            <span
                                class="text-[.8rem]">
                                {{ data.description || '-----'}}
                            </span>
                        </td>
                        <td>
                            <span>{{ data.created_by || '-----'}}</span>
                        </td>
                        <td>
                            <div
                                class="ml-2 w-[150px] leading-4">
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
                                            departmentId = data.id as number;
                                            toggleCreate(true);
                                        }
                                    }], 
                                    [{
                                        label: `Delete ${data.name}`,
                                        icon: 'i-heroicons-trash-20-solid',
                                        iconClass: 'text-red-500',
                                        class: 'text-red-500',
                                        click: async (): Promise<void> => {
                                            Confirm(`Do you want to delete ${data.name} department?`, async (): Promise<void> => {
                                                const result = await api.delete(`department/${data.id}`, true, {}) as ResponseStatus;
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
    Department 
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
const isOpenFilter: Ref<boolean> = ref<boolean>(false);
const filters: Ref<Items> = ref<Items>({
    department_id: '',
});
const openCreate: Ref<boolean> = ref<boolean>(false);
const departmentId: Ref<number | null> = ref<number | null>(null);
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
        title:'Department name',
    },
    {
        title: 'department name'
    },
    {
        title: 'Contact Info'
    },
    {
        title: "description"
    },
    {
        title: 'Location'
    },
    {
        title: "create by"
    },
    {
        title: 'create at'
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
    let url: string = `department?per_page=${per_page}&page_no=${current_page}&department_id=${filters.value.department_id}`;
    if(search)
    {
        url += `&search=${search}`;
    }
    const result: ResponseStatus = await api.get(url, false) as ResponseStatus;
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
        departmentId.value = null;
    }
});

onMounted(async (): Promise<void> => {
    await fetchData();
});
</script>