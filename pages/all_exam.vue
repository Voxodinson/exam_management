<template>
    <template 
        v-if="openCreate">
        <NewExam
            :exam-id="examId"
            @update:data="fetchData"
            @toggle="toggleCreate"/>
    </template>
    <template 
        v-else>
        <div class="flex items-center justify-between h-[45px] px-4 bg-white border-b-[1px] border-gray-200">
            <UBreadcrumb 
                :links="linksItem"
                divider="/"
                    :ui="{
                        base: 'font-semibold text-[.8rem]',
                        inactive: 'hover:text-blue-200',
                        active: 'text-blue-400',}"/>
            <div class=" flex gap-2 items-center justify-center h-full">
                <UInput
                    icon="material-symbols:search"
                    type="text"
                    color="white"
                    variant="outline"
                    size="sm"
                    name="district"
                    role="input"
                    placeholder="Search here..."
                    class="w-[250px]"/>
                <UTooltip 
                    text="Create New Exam"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        icon="material-symbols:add-circle-outline-rounded"
                        size="md"
                        color="black"
                        label="New Exam"
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
                        size="md"
                        color="black"
                        variant="soft" 
                        :padded="false"
                        @click="()=>{
                            toggle();
                        }"
                        class="bg-[#3A6D8C] hover:bg-gray-200 text-white hover:text-black p-1.5 transition"/>
                </UTooltip>
            </div>
        </div>
        <div class="w-full p-2">
            <div 
                v-if="isOpenFilter"
                class="flex gap-2 mb-2 justify-between p-2 rounded-md bg-white">
                <div 
                    class="flex gap-2">
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
                </div>
            </div>
            <div class="w-full bg-white rounded-md overflow-hidden">
                <Table
                    :columns="columns"
                    :data="datas"
                    is-custom
                    v-slot="{ data }"
                    @update:data="async (current_page: number): Promise<void> => {
                        
                    }">
                    <tr 
                        class="*:px-2.5 *:py-1.5 hover:bg-gray-100 cursor-pointer">
                        <td
                            class="w-[150px]">
                            <span>
                                {{ data.id }}
                            </span>
                        </td>
                        <td>
                            <span>{{ data.exam }}</span>
                        </td>
                        <td>
                            <span>{{ data.due_date }}</span>
                        </td>
                        <td>
                            <span>{{ data.created_at }}</span>
                        </td>
                        <td>
                            <span>{{ data.status }}</span>
                        </td>
                        <td>
                            <UDropdown 
                                :items="[
                                    [
                                        {
                                            class: 'text-green-500',
                                            iconClass: 'text-green-500',
                                            label: 'Publish Exam',
                                            icon: 'material-symbols:arrow-upload-progress-rounded',
                                            click: () => {}
                                        },
                                        {
                                            class: 'text-yellow-500',
                                            iconClass: 'text-yellow-500',
                                            label: 'Edit',
                                            icon: 'i-heroicons-pencil-square-20-solid',
                                            click: () => {}
                                        }
                                    ], 
                                    [
                                    {
                                            class: 'text-blue-500',
                                            iconClass: 'text-blue-500',
                                            label: 'View Exam Information',
                                            icon: 'material-symbols:folder-eye-outline',
                                            click: () => {}
                                        }
                                    ],
                                    [
                                        {
                                            class: 'text-red-500',
                                            iconClass: 'text-red-500',
                                            label: 'Delete',
                                            icon: 'i-heroicons-trash-20-solid',
                                            click: () => {}
                                        }
                                    ]
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
    <ExamInfoModal 
        :open="isOpenExamInfoModal"
        @toggle="toggleInfoModal"/>
</template>

<script setup lang="ts">
import { 
    Table,
    SelectMenu,
    InputDate
} from '@/components/ui';
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import type {
    Column,
    Items,
    Options,
    ResponseStatus,
} from "@/models/type";
import { 
    NewExam 
} from '@/collector/pages';
import { 
    ExamInfoModal 
} from '@/modal';
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
const isOpenFilter: Ref<boolean> = ref<boolean>(true);
const openCreate: Ref<boolean> = ref<boolean>(false);
const examId: Ref<number | null> = ref<number | null>(null);
const isOpenExamInfoModal: Ref<boolean> = ref<boolean>(false);
const linksItem = [
  {
      label: 'Main Menu'
  },
  {
      label: 'All Exam',
  }
];
const columns: Ref<Column[]> = ref<Column[]>([
    {
        title:'ID',
    },
    {
        title:'Exam',
    },
    {
        title: 'Created At'
    },
    {
        title: "Due Date"
    },
    {
        title: "status"
    },
    {
        title: 'Action'
    }
 ]);
 const datas = {
    status: 'ok',
    data: [
        {   
            "id":"EXAM-100503",
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "id":"EXAM-100503",
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "id":"EXAM-100503",
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "id":"EXAM-100503",
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "id":"EXAM-100503",
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "id":"EXAM-100503",
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "id":"EXAM-100503",
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "id":"EXAM-100503",
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        }
    ],
    page_no: 1,
    per_page: 10,
    total: 10,
    total_page: 10
 };
/**
 * End::Declare variable section
 */ 

/**
 * Begin::Some logical in this component
 */
const toggle = (): void => {
    isOpenFilter.value = !isOpenFilter.value as boolean;
}
const toggleCreate = (value: boolean): void => {
    openCreate.value = value as boolean;
}
const toggleInfoModal = (value: boolean) => {
    isOpenExamInfoModal.value = value as boolean;
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