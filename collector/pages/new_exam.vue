<template>
    <div 
        class="bg-white p-2 flex items-center h-[45px] px-4 border-b-[1px] border-gray-200">
        <UTooltip 
            text="Back To All Exam"
            :popper="{ offsetDistance: 12 }">
            <UButton
                icon="material-symbols-light:chevron-left-rounded"
                size="sm"
                color="black"
                label="Back"
                variant="soft" 
                :padded="false"
                @click="()=>{
                    emits('toggle', false);
                }"
                class="bg-[#3A6D8C] w-[70px] hover:bg-gray-200 text-white hover:text-black p-1 transition"/>
        </UTooltip>
    </div>
    <form
        name="exam"
        method="POST"
        enctype="multipart/form-data"
        @submit.prevent="getData"
        class="p-2 w-full">
        <div class="p-2 rounded-md bg-white">
            <div 
                class="w-full flex gap-2 rounded-md">
                <UFormGroup
                    class="w-[calc(99%/3)]"
                    label="Department"
                    name="department_id">
                    <SelectMenu
                        name="department_id"
                        :options="dataOptions.department"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
                        placeholder="Please select department"
                        class="w-full"/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(99%/3)] z-40"
                    label="Major"
                    name="major_id">
                    <SelectMenu
                        name="major_id"
                        :options="dataOptions.major"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
                        placeholder="Please select major"
                        class="w-full"/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(99%/3)]"
                    label="Marks ( Total - Pass Mark)"
                    name="">
                    <div 
                        class="w-full grid grid-cols-2 gap-2">
                        <UInput
                            type="text"
                            color="white"
                            variant="outline"
                            size="md"
                            name="total_mark"
                            role="input"
                            class="w-full"
                            placeholder="Enter total mark..."
                            v-model="calculateMark.total"
                            disabled/>
                        <UInput
                            type="text"
                            color="white"
                            variant="outline"
                            size="md"
                            name="passing_mark"
                            role="input"
                            class="w-full"
                            placeholder="Enter passing mark..."
                            @update:model-value="(value: number): void => {
                                calculateMark.passing = Number(value);
                            }"
                            :model-value="calculateMark.passing"/>
                    </div>
                </UFormGroup>
            </div>
            <div 
                class="w-full flex gap-2  mt-2 rounded-md">
                <UFormGroup
                    class="w-[calc(99%/3)]"
                    label="Exam"
                    name="name">
                    <UInput
                        type="text"
                        color="white"
                        variant="outline"
                        size="md"
                        name="name"
                        role="input"
                        class="w-full"
                        placeholder="Enter exam here..."/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(99%/3)] z-30"
                    label="Status"
                    name="name">
                    <SelectMenu
                        name=""
                        :options="[
                            {
                                label: 'Pending',
                                value: 'pending'
                            },
                            {
                                label: 'Publishing',
                                value: 'publishing'
                            }

                        ]"
                        value-attribute="value"
                        option-attribute="label"
                        id-attribute="value"
                        @update:model-value="(value: Items): void => {
                            if(value.value === 'publishing'){
                                isPublishing = value.value as string;
                            }else{
                                isPublishing = '';
                            }
                        }"
                        placeholder="Please select status"
                        class="w-full"/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(99%/3)]"
                    label="Exam Time (Mins)"
                    name="">
                    <UInput
                        type="text"
                        color="white"
                        variant="outline"
                        size="md"
                        name=""
                        role="input"
                        class="w-full"
                        placeholder="Enter exam duration in (minutes)..."/>
                </UFormGroup>
            </div>
            <UDivider 
                v-if="isPublishing === 'publishing'"
                label="Please select the class relevant to this exam." 
                class="w-full text-yellow-500 text-[.8rem] mt-6"/>
            <div 
                v-if="isPublishing === 'publishing'"
                class="w-full flex flex-col items-start mt-3 bg-yellow-100 justify-start border-[1px] border-yellow-400 border-dotted p-2 rounded-md">
                <UFormGroup
                    class="w-full z-20"
                    label="Class"
                    name="class_id">
                    <SelectMenu
                        name="class_id"
                        :options="dataOptions.class"
                        option-attribute="name"
                        value-attribute="id"
                        id-attribute="id"
                        placeholder="Please select class"
                        class="w-full"/>
                </UFormGroup>
                <span
                    class="text-[.8rem] mt-2">Note: After you select the status as "Publishing" make sure to assign it to the appropriate "Class". This exam will be <span class="text-yellow-500 italic uppercase">publishing</span>  after it is successfully created.</span>
            </div>
            <div class="mt-3 flex items-center z-10  sticky bg-white top-0 right-0 justify-between border-b-[1px] py-2 border-gray-200">
                <h3 class="text-[.9rem] font-semibold">
                    Questions
                </h3>
            </div>
            <div 
                v-if="!questions"
                class="w-full flex items-center justify-center text-gray-400 py-2 font-normal">
                No Questions...
            </div>
            <div
                v-for="(item, index) in questions"
                :key="index"
                class="mt-2 flex flex-col gap-3 bg-gray-100 rounded-md overflow-hidden p-2">
                <UFormGroup
                    class="w-full"
                    :label="`${item.type} (Question ${ index +1 })`"
                    name="">
                    <UTextarea 
                        color="white" 
                        placeholder="Enter question here..."
                        name="" 
                        role="input"
                        v-model="item.question"/>
                </UFormGroup>
                <div
                    class="w-full flex items-center  gap-3 justify-between">
                    <div 
                        class="flex items-center gap-3">
                        <h3
                            class="text-[.9rem] font-normal">
                            Chose Correct Answer &ensp; - 
                        </h3>
                        <div 
                            class="flex items-center gap-2">
                            <span
                                class="text-[.9rem]">
                                Score
                            </span>
                            <UInput
                                type="number"
                                color="white"
                                variant="outline"
                                size="sm"
                                name=""
                                role="input"
                                class="w-[100px]"
                                @update:model-value="(value: number) => {
                                    item.mark = Number(value);
                                    calculateMark.total = questions.reduce((sum: any, q: any) => sum + (q.mark || 0), 0);
                                    calculateMark.passing = Number(calculateMark.total) / Number(2);
                                }"  
                                :model-value="item.mark"/>
                        </div>
                    </div>
                    <div 
                        class="flex gap-3">
                        <UTooltip 
                            text="Delete Question"
                            :popper="{ offsetDistance: 12 }">
                            <UButton
                                icon="material-symbols:delete-outline"
                                size="sm"
                                color="black"
                                label="Delete Question"
                                variant="soft" 
                                :padded="false"
                                @click="()=>{
                                    deleteQuestion(index, item);
                                }"
                                class="text-red-500 hover:text-white hover:bg-red-300 p-1 transition"/>
                        </UTooltip>
                        <UTooltip 
                            text="Add New Answer"
                            :popper="{ offsetDistance: 12 }">
                            <UButton
                                icon="material-symbols:add-circle-outline-rounded"
                                size="sm"
                                color="black"
                                label="New Answer"
                                variant="soft" 
                                :padded="false"
                                @click="()=>{
                                    addNewAnswer(index);
                                }"
                                class="text-blue-400 hover:text-white hover:bg-blue-300 p-1 transition"/>
                        </UTooltip>
                    </div>
                </div>
                <div 
                    v-for="(ans, idx) in item.qcm_answers"
                    :key="idx"
                    class="flex items-center gap-2 ">
                    <UCheckbox 
                        v-if="item.type === 'Multiple Choice'"
                        :ui="{
                            base: 'w-5 h-5'
                        }"
                        @update:model-value="() => {
                            ans.is_correct = true as boolean;
                        }"
                        v-model="ans.is_correct"/>
                    <URadio
                        v-if="item.type === 'Cloed Question'"
                        @update:model-value="() => {
                            ans.is_correct = true as boolean;
                        }"
                        v-model="ans.is_correct"/>
                    <UInput
                        v-if="item.type != 'Answer Question'"
                        type="text"
                        color="white"
                        variant="outline"
                        size="sm"
                        name=""
                        role="input"
                        class="w-full"
                        placeholder=""
                        v-model="ans.name"/>
                    <UButton
                        icon="material-symbols:delete-outline"
                        size="sm"
                        color="black"
                        variant="soft" 
                        :padded="false"
                        @click="()=>{
                            deleteAnswer(index ,idx);
                        }"
                        class="text-red-500 hover:text-white hover:bg-red-300 p-1 transition"/>
                </div>
            </div>
            <div class="w-full flex flex-wrap rounded-md bg-gray-100 items-end justify-start border-[1px] border-dotted p-2 border-gray-200 mt-3">
                <div class="w-full block pb-1">
                    <h3
                        class="text-[.9rem] font-semibold">Add New Questions</h3>
                </div>
                <div class="flex gap-3">
                    <UTooltip 
                        text="Add New Mutiple Question"
                        :popper="{ offsetDistance: 12 }">
                        <UButton
                            icon="tabler:checkbox"
                            size="sm"
                            color="black"
                            variant="soft" 
                            :padded="false"
                            @click="()=>{
                                addNewQuestion('multiple_choice');
                            }"
                            class="text-blue-400 text-[2rem] w-[50px] h-[50px] flex items-center justify-center bg-blue-100 hover:text-white hover:bg-blue-300 p-1 transition"/>
                    </UTooltip>
                    <UTooltip 
                        text="Add New Closed Question"
                        :popper="{ offsetDistance: 12 }">
                        <UButton
                            icon="ic:sharp-radio-button-checked"
                            size="sm"
                            color="black"
                            variant="soft" 
                            :padded="false"
                            @click="()=>{
                                addNewQuestion('cloed_question')
                            }"
                            class="text-blue-400 text-[2rem] w-[50px] h-[50px] flex items-center justify-center bg-blue-100 hover:text-white hover:bg-blue-300 p-1 transition"/>
                    </UTooltip>
                </div>
            </div>
            <div class="flex gap-2 mt-3 pt-2 items-end justify-end w-full  border-t-[1px] border-gray-200 ">
                <UButton
                    type="button"
                    size="sm"
                    color="black"
                    label="Cancel"
                    variant="soft" 
                    :padded="false"
                    @click="() => {
                        emits('toggle', false);
                    }"
                    class="bg-red-500 px-4 py-2 text-white hover:bg-red-300  transition"/>
                <UButton
                    type="submit"
                    size="sm"
                    color="black"
                    label="Create Exam"
                    variant="soft" 
                    :padded="false"
                    class="bg-blue-400 px-4 py-2 text-white hover:bg-blue-300 transition"/>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import {
    GetDataContext,
    GetDataNormalForm
} from "@/composable/dataHandler";
import type {
    ResponseStatus,
    Items,
    Options
} from "@/models/type";
import { 
    SelectMenu
} from "@/components/ui";
import { 
    Confirm 
} from "@/utils/dialog";

interface IAnswer {
    is_correct: boolean; 
    name: string;
    
}
interface IQuestion {
    question: string;
    type: string,
    mark: number; 
    qcm_answers: IAnswer[] | any;
}

/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();

const props = withDefaults(defineProps<{
    examId: number | null
}>(),{
    examId: null
});

/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variables object section
 */
const api: ContextAPI = new ContextAPI(new SimpleAPI());
const context: GetDataContext = new GetDataContext(new GetDataNormalForm());
/**
 * End::Declare variables object section
 */

/**
 *Begin::Declare variable in this section 
 */ 
const questions: Ref<IQuestion[]> = ref<IQuestion[]>([]);
const isPublishing: Ref<string> = ref<string>('');
const dataOptions: Ref<Options> = ref<Options>({});
const calculateMark: Ref<Items> = ref<Items>({
    total: 0,
    passing: 0
})
/**
 *End::Declare variable in this section 
 */ 

/**
 * Begin::Fetch data section
 */
 const getData = async (event: Event): Promise<void> => {
    const formData: any = context.getDataForm(event as SubmitEvent) as any;
    formData.questions = questions.value;
    console.log(formData)
    if(props.examId != null)
    {
        await api.update(`exam/${props.examId}`, true, formData) as ResponseStatus;
    }
    else
    {
        const result: ResponseStatus = await api.post('exam', true, formData) as ResponseStatus;
        if(!result.error)
        {
            emits('toggle', false);
            (event.target as HTMLFormElement).reset();
        }
    }
    emits('update:data');
}

const setData = async (): Promise<void> => {
    const result: any = await api.get(`exam/${props.examId}`,false) as any;
    console.log(result.data)
    if(!result.error)
    {
        const form: HTMLFormElement = document.forms.namedItem('exam') as HTMLFormElement;
        const questionsAttr = result.data.questions as any;

        // Push each question into the questions.value array
        if (questionsAttr && Array.isArray(questionsAttr)) {
            questions.value = [];
            questionsAttr.forEach((question: any) => {
                questions.value.push({
                    ...question
                });
            });
        }

        console.log('set:', questions.value)
        context.setData(form, result.data as Items);
    }
}

const fetchOption = async (): Promise<void> => {
    const options: ResponseStatus = await api.get("setting/filter/exam") as ResponseStatus;
    if(!options.error)
    {
        dataOptions.value = options.data as unknown as Options;
    }
};
/**
 * End::Fetch data section
 */

/**
 * Begin::Some logical section
 */
 const addNewQuestion = (type: string): void => {
    switch (type) {
        case 'multiple_choice':
            questions.value.push({
                type: 'Multiple Choice',
                question: '',
                mark: 0,
                qcm_answers: [
                    { 
                        name: '',
                        is_correct: false, 
                        name_kh: 'w',
                        description: 'we'
                    },
                    { 
                        name: '',
                        is_correct: false, 
                        name_kh: 'w',
                        description: 'we'
                    },
                    { 
                        name: '',
                        is_correct: false, 
                        name_kh: 'w',
                        description: 'we'
                    },
                    { 
                        name: '',
                        is_correct: false, 
                        name_kh: 'w',
                        description: 'we'
                    }
                ]
            });
            break;
        case 'cloed_question':
            questions.value.push({
                type: 'Cloed Question',
                question: '',
                mark: 0,
                qcm_answers: [
                    { 
                        name: '',
                        is_correct: false, 
                        name_kh: 'w',
                        description: 'we' 
                    },
                    { 
                        name: '',
                        is_correct: false, 
                        name_kh: 'w',
                        description: 'we' 
                    }
                ]
            });
            break;
        default:
            console.error('Unsupported question type');
    }
};

const deleteQuestion = (idx: number, item: any): void => {
    if (idx >= 0 && idx < questions.value.length) {
        const question = questions.value[idx];
        if (question.qcm_answers.length > 0) {
            Confirm('Are you sure to delete this question?', () => {
                questions.value.splice(idx, 1);
                recalculateScore(item);
            });
        }else{
            questions.value.splice(idx, 1);
        }
    }
};

const recalculateScore = (item: any) => {
    calculateMark.value.total = Number(calculateMark.value.total) - Number(item.mark)
    calculateMark.value.passing = Number(calculateMark.value.total) / Number(2);
}

const addNewAnswer = (idx: number): void => {
    if (questions.value[idx]) {
        questions.value[idx].qcm_answers.push({
            is_correct: false,
            name: ''
        });
    }
};

const deleteAnswer = (questionIdx: number, idx: number): void => {
    const question = questions.value[questionIdx];
    if (question && question.qcm_answers) {
        if (question.qcm_answers.length > 0 && question.qcm_answers[idx].name != '' || question.qcm_answers[idx].checked != false) {
            Confirm('Are you sure to delete this answer?', () => {
                question.qcm_answers.splice(idx, 1);
            });
        } else {
            question.qcm_answers.splice(idx, 1);
        }
    }
};

/**
 * End::Some logical section
 */
onMounted(async (): Promise<void> => {
    await fetchOption();
    if(props.examId){
        await setData();
    }
})
</script>