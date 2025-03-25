<template>
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
                class="w-[400px]"
                @input="async (event: Event): Promise<void> => {
                    const value: string = (event?.target as HTMLInputElement)?.value;
                    await searchData(value);
                }"/>
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
                        :options="dataOptions.exam"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
                        placeholder="Select a exam"
                        class="w-[250px]"
                        @update:model-value="async (value: Items): Promise<void> => {
                            if(value?.id){
                                filters.exam_id = Number(value.id);
                            }
                            else{
                                filters.exam_id = '';
                            }
                            await fetchData(Number($route.query.page_no) || 1);
                        }"
                        :model-value="filters.exam_id"/>
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
                                filters.department_id = '';
                            }
                            await fetchData(Number($route.query.page_no) || 1);
                        }"
                        :model-value="filters.department_id"/>
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
                        :model-value="filters.class_id"/>
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
                            Exam Time: <span class="text-blue-400">{{ data.exam_time }}</span>
                        </span>
                        <span class="block text-[.9rem]">
                            Total Score: <span class="text-blue-400">{{ data.total_mark }}</span>
                        </span>
                        <span class="block text-[.9rem]">
                            Pass_mark: <span class="text-blue-400">{{ data.pass_mark }}</span>
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
    <ClassResultInfo
        :exam-id="examId"
        :open="openResultModal"
        @toggle="toggleClassResultModal"/>
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
    ClassResultInfo 
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
const isOpenFilter: Ref<boolean> = ref<boolean>(true);
const filters: Ref<Items> = ref<Items>({
    exam_id: '',
    department_id: '',
    class_id: '',
    major_id: '',
});
const openResultModal: Ref<boolean> = ref<boolean>(false);
const examId: Ref<number | null> = ref<number | null>(null);
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
const toggleClassResultModal = (value: boolean) => {
    openResultModal.value = value as boolean;
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
    let url: string = `exam/student/results/exams?per_page=${per_page}&page_no=${current_page}&exam_id=${filters.value.exam_id}&department_id=${filters.value.department_id}&class_id=${filters.value.class_id}&major_id=${filters.value.major_id}`;
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
    const options: ResponseStatus = await api.get("setting/option/exam/result") as ResponseStatus;
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
    }, 200);
}

/**
 * End::Fetch data section
 */

watch((): boolean => openResultModal.value, async (value: boolean): Promise<void> => {
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