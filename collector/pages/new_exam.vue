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
        name=""
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
                    name="">
                    <SelectMenu
                        name=""
                        :options="[]"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
                        placeholder="Please select department"
                        class="w-full"/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(99%/3)]"
                    label="Major"
                    name="">
                    <SelectMenu
                        name=""
                        :options="[]"
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
                            name=""
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
                            name=""
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
                    name="">
                    <UInput
                        type="text"
                        color="white"
                        variant="outline"
                        size="md"
                        name=""
                        role="input"
                        class="w-full"
                        placeholder="Enter exam here..."/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(99%/3)]"
                    label="Status"
                    name="">
                    <SelectMenu
                        name=""
                        :options="[]"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
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
            <div class="mt-3 border-b-[1px] border-gray-200">
                <h3>
                    Questions
                </h3>
            </div>
            <div 
                v-if="!questions.length"
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
                            v-if="item.type != 'Answer Question'"
                            class="text-[.9rem] font-normal">
                            Chose Correct Answer -
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
                                    deleteQuestion(index)
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
                    v-for="(ans, idx) in item.answer"
                    :key="idx"
                    class="flex items-center gap-2 ">
                    <UCheckbox
                        v-if="item.type === 'Multiple Choice'"
                        :ui="{
                            base: 'w-5 h-5'
                        }"
                        @update:model-value="()=>{
                            ans.checked = true as boolean;
                        }"/>
                    <URadio
                        v-if="item.type === 'Cloed Question'"
                        v-model="ans.checked"
                        :name="item.type" />
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
                        v-model="ans.answer"/>
                    <UTextarea 
                        v-else
                        color="white" 
                        placeholder="Enter question here..."
                        name="" 
                        role="input"
                        class="w-full"
                        v-model="item.question"/>
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
            <div class="w-full flex items-center gap-3 justify-end border-t-[1px] border-gray-200 mt-3 py-2">
                <UTooltip 
                    text="Add New Mutiple Question"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        icon="material-symbols:add-circle-outline-rounded"
                        size="sm"
                        color="black"
                        label="New Mutiple Question"
                        variant="soft" 
                        :padded="false"
                        @click="()=>{
                            addNewQuestion('multiple_choice');
                        }"
                        class="text-blue-400 hover:text-white hover:bg-blue-300 p-1 transition"/>
                </UTooltip>
                <UTooltip 
                    text="Add New Closed Question"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        icon="material-symbols:add-circle-outline-rounded"
                        size="sm"
                        color="black"
                        label="New Closed Question"
                        variant="soft" 
                        :padded="false"
                        @click="()=>{
                            addNewQuestion('cloed_question')
                        }"
                        class="text-blue-400 hover:text-white hover:bg-blue-300 p-1 transition"/>
                </UTooltip>
                <UTooltip 
                    text="Add New Question"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        icon="material-symbols:add-circle-outline-rounded"
                        size="sm"
                        color="black"
                        label="New Question"
                        variant="soft" 
                        :padded="false"
                        @click="()=>{
                            addNewQuestion('answer_question');
                        }"
                        class="text-blue-400 hover:text-white hover:bg-blue-300 p-1 transition"/>
                </UTooltip>
            </div>
            <div class="w-full flex items-center justify-end gap-2 border-t-[1px] border-gray-200 py-2">
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
                    class="bg-red-500 text-white hover:bg-red-300 p-1 transition"/>
                <UButton
                    type="submit"
                    size="sm"
                    color="black"
                    label="Create Exam"
                    variant="soft" 
                    :padded="false"
                    class="bg-blue-400 text-white hover:bg-blue-300 p-1 transition"/>
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
    Items
} from "@/models/type";
import { 
    SelectMenu,
    InputDate
} from "@/components/ui";
import { 
    Confirm 
} from "@/utils/dialog";

interface IAnswer {
    checked: boolean; 
    answer: string;
    
}
interface IQuestion {
    question: string;
    type: string,
    mark: number; 
    answer: IAnswer[] | any;
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
    formData.questions = questions.value
    console.log(formData)
    // if(props.examId != null)
    // {
    //     await api.post(``, true, formData) as ResponseStatus;
    // }
    // else
    // {
    //     const result: ResponseStatus = await api.post('', true, formData) as ResponseStatus;
    //     if(!result.error)
    //     {
    //         emits('toggle', false);
    //         (event.target as HTMLFormElement).reset();
    //     }
    // }
    // emits('update:data');
}

const setData = async (): Promise<void> => {
    const result: ResponseStatus = await api.get(`company`, false) as ResponseStatus;
    if(!result.error)
    {
        let timeout: NodeJS.Timeout = setTimeout((): void => {
            const form: HTMLFormElement = document.forms.namedItem('company') as HTMLFormElement;
            context.setDataWithFile(form, result.data as Items);
            clearTimeout(timeout);
        },0);
    }
}
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
                answer: [
                    { 
                        checked: false, 
                        answer: '' 
                    },
                    { 
                        checked: false, 
                        answer: '' 
                    },
                    { 
                        checked: false, 
                        answer: '' 
                    },
                    { 
                        checked: false, 
                        answer: '' 
                    }
                ]
            });
            break;
        case 'cloed_question':
            questions.value.push({
                type: 'Cloed Question',
                question: '',
                mark: 0,
                answer: [
                    { 
                        checked: false, 
                        answer: '' 
                    },
                    { 
                        checked: false, 
                        answer: '' 
                    }
                ]
            });
            break;
        case 'answer_question':
            questions.value.push({
                type: 'Answer Question',
                question: '',
                mark: 0,
                answer: ''
            });
            break;
        default:
            console.error('Unsupported question type');
    }
};

const deleteQuestion = (idx: number): void => {
    if (idx >= 0 && idx < questions.value.length) {
        const question = questions.value[idx];
        if (question.answer.length > 0) {
            Confirm('Are you sure to delete this question?', () => {
                questions.value.splice(idx, 1);
            });
        }else{
            questions.value.splice(idx, 1);
        }
    }
};
const addNewAnswer = (idx: number): void => {
    if (questions.value[idx]) {
        questions.value[idx].answer.push({
            checked: false,
            answer: ''
        });
    }
};

const deleteAnswer = (questionIdx: number, idx: number): void => {
    const question = questions.value[questionIdx];
    if (question && question.answer) {
        if (question.answer.length > 0 && question.answer[idx].answer != '' || question.answer[idx].checked != false) {
            Confirm('Are you sure to delete this answer?', () => {
                question.answer.splice(idx, 1);
            });
        } else {
            question.answer.splice(idx, 1);
        }
    }
};

/**
 * End::Some logical section
 */
onMounted(async (): Promise<void> => {
})
</script>