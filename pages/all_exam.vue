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
                    class="w-[250px]"
                    @input="async (event: Event): Promise<void> => {
                        const value: string = (event?.target as HTMLInputElement)?.value;
                        await searchData(value);
                    }"/>
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
                    class="flex w-fit flex-wrap gap-2">
                    <SelectMenu
                        name=""
                        :options="dataOptions.department"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
                        placeholder="Select a department"
                        class="w-[250px]"
                        @update:model-value="async (value: Items): Promise<void> => {
                            if(value?.id){
                                filters.department_id = Number(value.id);
                            }
                            else{
                                filters.deprtment_id = '';
                            }
                            await fetchData(Number($route.query.page_no) || 1);
                        }"
                        :model-value="filters.deprtment_id"/>
                    <SelectMenu
                        name=""
                        :options="dataOptions.class"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
                        placeholder="Select a class"
                        class="w-[250px]"
                        @update:model-value="async (value: Items): Promise<void> => {
                            if(value?.id){
                                filters.class_id = Number(value.id);
                            }
                            else{
                                filters.class_id = '';
                            }
                            await fetchData(Number($route.query.page_no) || 1);
                        }"
                        :model-value="filters.major_id"/>
                    <SelectMenu
                        name=""
                        :options="dataOptions.major"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
                        placeholder="Select a major"
                        class="w-[250px]"
                        @update:model-value="async (value: Items): Promise<void> => {
                            if(value?.id){
                                filters.major_id = Number(value.id);
                            }
                            else{
                                filters.major_id = '';
                            }
                            await fetchData(Number($route.query.page_no) || 1);
                        }"
                        :model-value="filters.shift_id"/>
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
            </div>
            <div class="w-full bg-white rounded-md overflow-hidden">
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
                            <span
                                class=" capitalize">{{ data.name }}</span>
                        </td>
                        <td>
                            <span
                                class=" capitalize">{{ data.department_name }}</span> -
                            <span
                                class=" capitalize">{{ data.major_name }}</span> -
                            <span
                                class=" capitalize">{{ data.class_name }}</span>
                        </td>
                        <td>
                            <div
                                class="w-[150px] leading-4">
                                {{ data.created_at.toString().split(' ')[0] || '-----' }} <br>
                                <span
                                    class="text-[.8rem] text-blue-400">
                                    {{ data.created_at.toString().split(' ')[1] || '-----' }}
                                </span>
                            </div>
                        </td>
                        <td>
                            <span
                                :class="{
                                    ' text-white border-blue-200 bg-blue-400': data.status === 'publishing',
                                    'text-white bg-yellow-400 border-yellow-400': data.status === 'pending',
                                }"
                                class="uppercase w-[120px] rounded-full py-0.5 px-2 border-[1px] text-[.8rem] flex items-center justify-between gap-3">
                                {{ data.status }}
                                <UIcon 
                                    name="ic:sharp-circle" 
                                    class="w-3 h-3 animate-ping text-white"/>
                            </span>
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
                                            click: () => {
                                                if(data.id){
                                                    examId = data.id as number;
                                                    togglePublishExam(Boolean(true));
                                                }
                                            }
                                        },
                                        {
                                            class: 'text-yellow-500',
                                            iconClass: 'text-yellow-500',
                                            label: 'Edit',
                                            icon: 'i-heroicons-pencil-square-20-solid',
                                            click: () => {
                                                if(data.id){
                                                    examId = data.id as number;
                                                    toggleCreate(Boolean(true));
                                                }
                                            }
                                        }
                                    ], 
                                    [
                                        {
                                            class: 'text-blue-500',
                                            iconClass: 'text-blue-500',
                                            label: 'View Exam Information',
                                            icon: 'material-symbols:folder-eye-outline',
                                            click: () => {
                                                if(data.id){
                                                    examId = data.id as number;
                                                    toggleInfoModal(Boolean(true));
                                                }
                                            }
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
        :exam-id="examId"
        :open="isOpenExamInfoModal"
        @toggle="toggleInfoModal"/>
    <PublishExam
        :id="examId"
        :open="isOpenPublishExam"
        @update:data="fetchData"
        @toggle="togglePublishExam"/>
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
    ResponseStatus,
} from "@/models/type";
import { 
    NewExam 
} from '@/collector/pages';
import { 
    ExamInfoModal 
} from '@/modal';
import { 
    PublishExam 
} from '@/collector/modal';
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
    exam_id: '',
    department_id: '',
    class_id: '',
    major_id: '',
});
const isOpenFilter: Ref<boolean> = ref<boolean>(true);
const isOpenPublishExam: Ref<boolean> = ref<boolean>(false);
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
        title:'Exam',
    },
    {
        title:'Information',
    },
    {
        title: 'Created At'
    },
    {
        title: "status"
    },
    {
        title: 'Action'
    }
]);
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
const togglePublishExam = (value: boolean) => {
    isOpenPublishExam.value = value;
}
/**
 * End::Some logical in this component
 */

/**
 * Begin::Fetch data section
 */
const fetchData = async (current_page: number = 1, per_page: number = 10, search: string = ''): Promise<void> => {
    let url: string = `exam?per_page=${per_page}&page_no=${current_page}&exam_id=${filters.value.exam_id}&department_id=${filters.value.department_id}&class_id=${filters.value.class_id}&shift_id=${filters.value.shift_id}`;
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
    const options: ResponseStatus = await api.get("setting/filter/exam") as ResponseStatus;
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
watch((): boolean => 
    openCreate.value || 
    isOpenExamInfoModal.value || 
    isOpenPublishExam.value,  
    async (value: boolean): Promise<void> => {
        if(!value)
        {
            examId.value = null;
        }
});


onMounted(async (): Promise<void> => {
    await fetchData();
    await fetchOption();
});
</script>