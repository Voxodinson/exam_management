<template>
    <template v-if="openCreate">
        <PublishExam
            :publish-id="publishId"
            @toggle="toggleCreate"
            @update:data="fetchData"/>
    </template>
    <template v-else>
        <div 
            class="flex items-center justify-between h-[45px] px-4 bg-white border-b-[1px] border-gray-200">
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
                        size="sm"
                        color="black"
                        label="Publish Exam"
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
                            toggle();
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
                    <UInput
                        icon="material-symbols:search"
                        type="text"
                        color="white"
                        variant="outline"
                        size="md"
                        name="district"
                        role="input"
                        placeholder="Search name here..."
                        class="w-[400px]"/>
                    <SelectMenu
                        name=""
                        :options="[]"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
                        placeholder="Select a department"
                        class="w-[250px]"
                        @update:model-value="async (value: Items): Promise<void> => {
                            if(value?.id){
                                filters.deprtment_id = Number(value.id);
                            }
                            else{
                                filters.deprtment_id = '';
                            }
                            await fetchData(Number($route.query.page_no) || 1);
                        }"
                        :model-value="filters.deprtment_id"/>
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
                class="w-full flex flex-col gap-3 rounded-md overflow-hidden">
                <div
                    v-for="(exam, idx) in datas.data"
                    :key="idx"
                    class="w-full rounded-md h-fit p-2 border-[1px] bg-white border-gray-200">
                    <div 
                        class="w-full bg-[#3A6D8C] bg-opacity-10 p-2 rounded-md flex items-center justify-between  border-b-[1px] border-gray-200">
                        <div 
                            class="w-fit">
                            <h3
                                class="text-[1rem] font-semibold">
                                {{ exam.exam }} Exam
                            </h3>
                            <span
                                class="text-[.8rem] text-gray-400">
                                {{ exam.subject }} - {{ exam.grade }}
                            </span>
                        </div>
                        <div 
                            class="flex items-center gap-3 py-1 px-4 border-[1px] border-gray-200 bg-white shadow-sm *:text-[.9rem] rounded-full">
                            <span>
                                (
                                <span class="text-blue-400">
                                    {{ exam.duration_minutes}}
                                </span> 
                                ) from {{ exam.start_time }}&ensp; - &ensp;{{ exam.end_time }}
                            </span>
                        </div>
                        <div
                            :class="exam.isActive ? 'bg-blue-400' : 'bg-red-400'"
                            class="flex items-center py-1 pl-2 pr-1 shadow-md rounded-full capitalize gap-3">
                            <span
                                class="text-white text-[.9rem] pt-0.5">
                                {{ exam.isActive ? 'Publish' : 'Private'}}
                            </span>
                            <UToggle 
                                size="lg"
                                v-model="exam.isActive"
                                @click="async (): Promise<void> => {
                                    Confirm(`${exam.isActive ? 'Are you sure to unpublish exam..?' : 'Are you sure to publish exam..?'}`, async (): Promise<void> => {
                                        const result = await api.update(``, true, {}) as ResponseStatus;
                                        if(result){
                                            await fetchData();
                                        }
                                    });
                                }"/>
                        </div>
                    </div>
                    <div 
                        class="w-full grid grid-cols-4 pt-2">
                        <div 
                            class="*:text-[.9rem] border-r-[1px] flex justify-center flex-col border-gray-200">
                            <span>
                                Total marks: &ensp; {{ exam.total_marks }} pts
                            </span>
                            <span
                                class="block">
                                Passing marks: &ensp;
                                <span
                                    class="text-blue-400">
                                    {{ exam.passing_marks }} pts
                                </span>
                            </span>
                        </div>
                        <div 
                            class="*:text-[.9rem] border-r-[1px] border-gray-200 flex items-center justify-center">
                            <span class="text-center">
                                Created by:
                                <span
                                    class="text-blue-400">
                                    {{ exam.created_by }}
                                </span>
                            </span>
                        </div>
                        <div 
                            class="*:text-[.9rem] border-r-[1px] border-gray-200 flex items-center flex-col gap-2 justify-center">
                            <span class="text-center">
                                Total question:
                                <span
                                    class="text-blue-400">
                                    {{ exam.questions.length }}
                                </span>
                            </span>
                            <UButton
                                :label="isShowQuestion[idx] ? 'Close question' : 'Show question'"
                                color="white"
                                size="xs"
                                @click="(): void => {
                                    toggleShowQuestion(idx);
                                }"
                                class="border-none border-[1px] text-[.8rem] hover:bg-gray-200 hover:border-gray-200"/>
                        </div>
                        <div 
                            class="*:text-[.9rem] flex items-center flex-col justify-center">
                            <span
                                class="">
                                Department / Class / Room
                            </span>
                            <span
                                class="text-blue-400 capitalize">
                                {{ exam.department }}
                                -
                                <span
                                    class="text-blue-400">
                                    {{ exam.class }}
                                </span>
                                -
                                <span
                                    class="text-blue-400">
                                    {{ exam.room }}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div
                        v-if="isShowQuestion[idx]" 
                        class="w-full bg-gray-100 mt-3 flex flex-col gap-3 rounded-md p-3">
                        <div class="w-full flex items-center justify-between">
                            <h3
                                class="text-[1rem] font-semibold">
                                {{ exam.subject }} - {{ exam.exam }} (All Questions)
                            </h3>
                            <UIcon
                                name="material-symbols-light:close"
                                class="w-6 h-6 hover:scale-110 transition cursor-pointer"
                                @click="(): void => {
                                    toggleShowQuestion(idx);
                                }"/>
                        </div>
                        <div 
                            v-for="(question, idx) in exam.questions"
                            class="w-full flex-col gap-2 bg-white p-3 rounded-md">
                            <div 
                                class="w-full">
                                <p
                                    class="w-full flex justify-between items-center">
                                    {{ idx+1 }}. {{ question.question }} 
                                    <span class=" capitalize text-[.9rem] text-blue-400">
                                        {{ question.question_type }}
                                    </span>
                                </p>
                                <div 
                                    class="px-4 flex flex-col gap-3">
                                    <p
                                        v-for="(answer, idx) in question.answers">
                                        {{ idx+1 }}. {{ answer.option_id }} = {{ answer.text }}
                                    </p>
                                </div>
                                <div 
                                    class="border-t-[1px] border-gray-200 pt-2 mt-2">
                                    <p
                                        v-if="question.question_type != 'Q&A' && question.question_type != 'multiple choice'">
                                        Correct Answer is: 
                                        <span 
                                            class="text-blue-400">
                                            {{ question.correct }}
                                        </span>
                                    </p>
                                    <p
                                        v-if="Array.isArray(question.correct)"
                                        class="flex gap-3">
                                        Correct Answer is: 
                                        <span
                                            class="text-blue-400"
                                            v-for="ans in question.correct">
                                            {{ ans }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
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
import { 
    SelectMenu 
} from "@/components/ui";
import { 
    Confirm 
} from "@/utils/dialog";
import { 
    PublishExam
} from "@/collector/pages";
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
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const publishId: Ref<number | null> = ref<number | null>(null);
const filters: Ref<Items> = ref<Items>({
    department_id: '',
});
const isOpenFilter: Ref<boolean> = ref<boolean>(true);
const openCreate: Ref<boolean> = ref<boolean>(false);
const isShowQuestion = ref<{ [key: number]: boolean }>({});
const linksItem = [
  {
      label: 'Exam Mangement'
  },
  {
      label: 'Publish Exam',
  }
];
const datas = {
    status: 'ok',
    data: [
        {
            "start_time": "7:30AM 10-12-2025",
            "end_time": "9:00AM 10-12-2025",
            "exam":"Final",
            "subject":"Web Development",
            "grade":"Year 4",
            "status":"publish",
            "isActive": true,
            "duration_minutes":"120 Minutes",
            "total_marks": 100,
            "passing_marks": 50,
            "show": false,
            "class":"M3",
            "department":"Information Technology",
            "room":"406",
            "created_by": "admin",
            "questions": [
                {
                    "question_id": "Q1",
                    "question": "What is 2 + 2?",
                    "question_type":"checkbox",
                    "marks": 5,
                    "answers": [
                        { "option_id": "A", "text": "3" },
                        { "option_id": "B", "text": "4" },
                        { "option_id": "C", "text": "5" },
                        { "option_id": "D", "text": "6" }
                    ],
                    "correct": "B"
                },
                {
                    "question_id": "Q3",
                    "question": "Which of the following are prime numbers?",
                    "marks": 5,
                    "question_type":"multiple choice",
                    "answers": [
                        { "option_id": "A", "text": "2" },
                        { "option_id": "B", "text": "4" },
                        { "option_id": "C", "text": "5" },
                        { "option_id": "D", "text": "9" }
                    ],
                    "correct": ["A", "C"]
                },
                {
                    "question_id": "Q3",
                    "question": "When angkor was build? Exaplain and find example how they build?",
                    "marks": 25,
                    "question_type":"Q&A"
                },
            ]
        },
        {
            "start_time": "7:30AM 10-12-2025",
            "end_time": "9:00AM 10-12-2025",
            "exam":"Final",
            "subject":"Web Development",
            "grade":"Year 4",
            "status":"private",
            "duration_minutes":"120 Minutes",
            "total_marks": 100,
            "passing_marks": 50,
            "isActive": false,
            "class":"M3",
            "department":"Information Technology",
            "room":"406",
            "created_by": "admin",
            "questions": [
                {
                    "question_id": "Q1",
                    "question": "What is 2 + 2?",
                    "question_type":"checkbox",
                    "marks": 5,
                    "answers": [
                        { "option_id": "A", "text": "3" },
                        { "option_id": "B", "text": "4" },
                        { "option_id": "C", "text": "5" },
                        { "option_id": "D", "text": "6" }
                    ],
                    "correct": "B"
                },
                {
                    "question_id": "Q3",
                    "question": "Which of the following are prime numbers?",
                    "marks": 5,
                    "question_type":"multiple choice",
                    "answers": [
                        { "option_id": "A", "text": "2" },
                        { "option_id": "B", "text": "4" },
                        { "option_id": "C", "text": "5" },
                        { "option_id": "D", "text": "9" }
                    ],
                    "correct": ["A", "C"]
                },
                {
                    "question_id": "Q3",
                    "question": "When angkor was build? Exaplain and find example how they build?",
                    "marks": 25,
                    "question_type":"Q&A"
                },
            ]
        },
        {
            "start_time": "7:30AM 10-12-2025",
            "end_time": "9:00AM 10-12-2025",
            "exam":"Final",
            "subject":"Web Development",
            "grade":"Year 4",
            "status":"publish",
            "duration_minutes":"120 Minutes",
            "total_marks": 100,
            "passing_marks": 50,
            "isActive": true,
            "class":"M3",
            "department":"Information Technology",
            "room":"406",
            "created_by": "admin",
            "questions": [
                {
                    "question_id": "Q1",
                    "question": "What is 2 + 2?",
                    "question_type":"checkbox",
                    "marks": 5,
                    "answers": [
                        { "option_id": "A", "text": "3" },
                        { "option_id": "B", "text": "4" },
                        { "option_id": "C", "text": "5" },
                        { "option_id": "D", "text": "6" }
                    ],
                    "correct": "B"
                },
                {
                    "question_id": "Q3",
                    "question": "Which of the following are prime numbers?",
                    "marks": 5,
                    "question_type":"multiple choice",
                    "answers": [
                        { "option_id": "A", "text": "2" },
                        { "option_id": "B", "text": "4" },
                        { "option_id": "C", "text": "5" },
                        { "option_id": "D", "text": "9" }
                    ],
                    "correct": ["A", "C"]
                },
                {
                    "question_id": "Q3",
                    "question": "When angkor was build? Exaplain and find example how they build?",
                    "marks": 25,
                    "question_type":"Q&A"
                },
            ]
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
const toggleShowQuestion = (idx: number): void => {
    isShowQuestion.value[idx] = !isShowQuestion.value[idx];
};
/**
 * End::Some logical in this component
 */

/**
 * Begin::Fetch data section
 */
 const fetchData = async (current_page: number = 1, search: string = ''): Promise<void> => {
    const per_page: number = 10;
    let url: string = `purchase?per_page=${per_page}&page_no=${current_page}&department=${filters.value.deprtment_id}`;
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