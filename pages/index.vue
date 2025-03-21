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
        </div>
    </div>
    <div class="w-full p-2">
        <div
            class="w-full h-[130px]  overflow-auto flex gap-2 p-2 rounded-md bg-white">
            <div class="w-fit flex gap-3">
                <div 
                    @click="() => {
                        toggleCreateModal(Boolean(true));
                    }"
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
                    class="h-full w-fit flex gap-2"
                    v-for="(exam, idx) in data"
                    :key="idx"
                    @click="() => {
                        examId = Number(exam.id);
                        if(examId){
                            toggleInfoModal(true);
                        }
                    }">
                    <div 
                        class="h-full bg-white border-[1px] border-gray-200 w-[250px] rounded-md flex items-center justify-center p-2 text-wrap text-center hover:bg-gray-200 transition cursor-pointer">
                        {{ exam.name }}
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex gap-3 bg-white rounded-md p-3 mt-3">
            <div class="w-full h-fit rounded-md">
                <div 
                    class="flex pb-2 items-center justify-start">
                    <UIcon 
                        name="material-symbols:arrow-right-rounded"
                        class="w-6 h-6 text-[1rem] text-gray-600"/>
                    <h3 
                        class="text-gray-600 text-[.8rem]">Exam - Web Developer</h3>
                </div>
                <Table
                    :columns="columns"
                    :data="data"
                    is-custom
                    v-slot="{ data, index }"
                    @update:data="async (current_page: number): Promise<void> => {
                        
                    }">
                    <tr 
                        class="*:px-2.5 *:py-1.5 hover:bg-gray-100 cursor-pointer">
                        <td>
                            <span>{{ index +1 }}</span>
                        </td>
                        <td>
                            <div 
                                class="w-[60px] h-[60px] overflow-hidden rounded-full border-[1px] border-gray-200">
                                <img 
                                    :src="data.img_link_url || UserImage" 
                                    alt=""
                                    class="w-full h-full object-cover hover:scale-110 transition">
                            </div>
                        </td>
                        <td>
                            <span class="text-blue-500">{{ data.code }}</span>
                        </td>
                        <td>
                            <span>{{ data.first_name }} {{ data.last_name }}</span>
                        </td>
                        <td>
                            <span
                                class="text-[.9rem]">
                                {{ data.department_name }} - {{ data.class_name }} - {{ data.major_name }}
                            </span>
                        </td>
                        <td>
                            <span class="text-blue-500">{{ data.point || 100}} pt</span>
                        </td>
                    </tr>
                </Table>
            </div>
        </div>
    </div>
    <NewExamModal
        :open="isOpenCreateModal"
        @toggle="toggleCreateModal"/>
    <ExamInfoModal 
        :exam-id="examId"
        :open="isOpenExamInfoModal"
        @toggle="toggleInfoModal"/>
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
    Column
} from "@/models/type";
import { 
    Table 
} from "@/components/ui";
import { 
    NewExamModal 
} from "@/collector/modal";
import { 
    UserImage 
} from "@/assets/images";
import { 
    ExamInfoModal 
} from "@/modal";
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
const data: Ref<any> = ref<any>({});
const isOpenCreateModal: Ref<boolean> = ref<boolean>(false);
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const filters: Ref<Items> = ref<Items>({
    status_id: '',
    warehouse_id: ''
});
const isOpenExamInfoModal: Ref<boolean> = ref<boolean>(false);
const examId: Ref<number | null> = ref<number | null>(null);
const linksItem = [
    {
        label: 'Main Menu'
    },
    {
        label: 'Home',
    }
];
const columns: Ref<Column[]> = ref<Column[]>([
    {
        title: 'no'        
    },
    {
        title: 'Profile'
    },
    {
        title: 'Code'
    },
    {
        title:'Name',
    },
    {
        title:'Department / Class / Major',
    },
    {
        title:'Total Point',
    }
 ])
/**
 * End::Declare variable section
 */ 

/**
 * Begin::Some logical in this component
 */
const toggleCreateModal = (value: boolean) => {
    isOpenCreateModal.value = value as boolean;
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
 const fetchData = async (current_page: number = 1,per_page: number = 10, search: string = ''): Promise<void> => {
    let url: string = `exam?per_page=${per_page}&page_no=${current_page}`;
    const result: ResponseStatus = await api.get(url, false) as ResponseStatus;
    if(!result.error)
    {
        data.value = result.data as object;
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
        await fetchData(1,10, value);
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
    await fetchData();
});
</script>