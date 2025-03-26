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
                    :data="dataResult"
                    is-custom
                    v-slot="{ data }">
                    <tr 
                        class="*:px-2.5 *:py-1.5 hover:bg-gray-100 cursor-pointer">
                        <td>
                            <span class="block text-[.9rem]">
                                Dept: <span class="text-blue-400">{{ data.department_name }}</span>
                            </span>
                            <span class="block text-[.9rem]">
                                Class: <span class="text-blue-400">{{ data.class_name }}</span>
                            </span>
                            <span class="block text-[.9rem]">
                                Major: <span class="text-blue-400">{{ data.major_name }}</span>
                            </span>
                        </td>
                        <td>
                            <span>
                                {{ data.exam_name }}
                            </span>
                        </td>
                        <td>
                            <span
                                class="flex items-center gap-3 w-[100px] justify-between px-4 rounded-md border-[1px] border-gray-200">
                                {{ data.total_students }} 
                                <UIcon 
                                    :name="data.total_students <= 1 ? 'material-symbols:person' : 'ic:baseline-groups'" 
                                    class="w-5 h-5 text-blue-400"/>
                            </span>
                        </td>
                        <td>
                            <span class="block text-[.9rem]">
                                Exam Time: <span class="text-blue-400">{{ Math.floor(data.exam_time) }}</span>
                            </span>
                            <span class="block text-[.9rem]">
                                Total Score: <span class="text-blue-400">{{ Math.floor(data.total_mark) }}</span>
                            </span>
                            <span class="block text-[.9rem]">
                                Pass_mark: <span class="text-blue-400">{{ Math.floor(data.pass_mark) }}</span>
                            </span>
                        </td>
                        <td>
                            <span class="block text-[.9rem]">
                                All Scores: <span class="text-blue-400">{{ data.total_score_class }}</span>
                            </span>
                            <span class="block text-[.9rem]">
                                Students Score: <span class="text-blue-400">{{ data.total_score_student }}</span>
                            </span>
                            <span class="block text-[.9rem]">
                                Percentage: <span class="text-blue-400">{{ data.percentage }}%</span>
                            </span>
                        </td>
                        <td>
                            <div 
                                class="uppercase w-[140px] rounded-full py-1 px-2 border-[1px] text-[.8rem] flex items-center justify-between gap-3"
                                :class="[
                                    data.status == 1 ? 'bg-green-400 text-white' : '',
                                    data.status == 2 ? 'bg-blue-400 text-white' : '',
                                    data.status == 3 ? 'bg-yellow-400 text-white' : '',
                                    data.status == 4 ? 'bg-red-400 text-white' : '',
                                ]">
                                {{ data.message }}
                                <UIcon 
                                    name="ic:sharp-circle" 
                                    class="w-3 h-3 animate-ping text-white"/>
                        </div>
                        </td>
                        <td>
                            <UDropdown 
                                :items="[
                                    [{
                                        label: 'View Information',
                                        iconClass: 'text-blue-400',
                                        class: 'text-blue-400',
                                        icon: 'material-symbols:folder-eye-outline',
                                        click: () => {
                                            examId = Number(data.exam_id);
                                            if(examId != null){
                                                toggleClassResultModal(true);
                                            }
                                        }
                                    }]
                                ]" 
                                :popper="{ placement: 'bottom-start' }">
                                <UButton 
                                    color="white"
                                    trailing-icon="mdi:dots-vertical" />
                            </UDropdown>
                        </td>
                    </tr>
                </Table>
            </div>
        </div>
    </div>
    <NewExamModal
        @update:data="fetchData"
        :open="isOpenCreateModal"
        @toggle="toggleCreateModal"/>
    <ExamInfoModal 
        :exam-id="examId"
        :open="isOpenExamInfoModal"
        @toggle="toggleInfoModal"/>
    <ClassResultInfo
        :exam-id="examId"
        :open="openResultModal"
        @toggle="toggleClassResultModal"/>
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
    ClassResultInfo 
} from "@/modal";
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
const data: Ref<any> = ref<any>({});
const dataResult: Ref<object> = ref<object>({});
const isOpenCreateModal: Ref<boolean> = ref<boolean>(false);
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const filters: Ref<Items> = ref<Items>({
    status_id: '',
    warehouse_id: ''
});
const isOpenExamInfoModal: Ref<boolean> = ref<boolean>(false);
const examId: Ref<number | null> = ref<number | null>(null);
const openResultModal: Ref<boolean> = ref<boolean>(false);
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
        title:'Department / Class / shift',
    },
    {
        title: "exam"
    },
    {
        title: 'Total Students Submited'
    },
    {
        title: 'Exam Summary'
    },
    {
        title: 'Total Summary'
    },
    {
        'title': 'Status'
    },
    {
        title:'Action'
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
const toggleClassResultModal = (value: boolean) => {
    openResultModal.value = value as boolean;
}
/**
 * End::Some logical in this component
 */

/**
 * Begin::Fetch data section
 */
const fetchData = async (): Promise<void> => {
    let url: string = `exam`;
    const result: ResponseStatus = await api.get(url, false) as ResponseStatus;
    if(!result.error)
    {
        data.value = result.data as object;
    }
}

const fetchDataResult = async (): Promise<void> => {
    let url: string = `exam/student/results/exams`;
    const result: ResponseStatus = await api.get(url) as ResponseStatus;
    if(!result.error)
    {
        dataResult.value = result as object;
        console.log(dataResult.value)
    }
}
watch((): boolean => isOpenExamInfoModal.value || openResultModal.value, async (value: boolean): Promise<void> => {
    if(!value)
    {
        examId.value = null;
    }
});
/**
 * End::Fetch data section
 */
onMounted(async (): Promise<void> => {
    await fetchData();
    await fetchDataResult();
});
</script>