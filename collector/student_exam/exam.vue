<template>
    <div
        class="w-full h-fit flex flex-col items-center relative justify-center">
      	<div 
            class="w-[60%] flex flex-col gap-3 py-6">
            <div 
                class="w-full flex items-center justify-between">
                <UButton
                    variants="none"
                    size="md" 
                    color="white"
                    @click="() => {
                        emits('toggle', false);
                    }">
                    <UIcon
                        name="material-symbols-light:arrow-back-ios-new-rounded"
                        class="w-4 h-4"/>
                    Back
                </UButton>
                <UBreadcrumb 
                    :links="linksItem"
                    divider="/"
                    :ui="{
                        base: 'font-semibold text-[.8rem]',
                        inactive: 'hover:text-blue-200',
                        active: 'text-blue-400',}"/>
            </div>
            <div 
                class="w-full h-fit p-3 mt-3 border-[1px] border-gray-200 rounded-md shadow-md bg-opacity-70 relative overflow-hidden">
                <img 
                    :src="Technology" 
                    alt="image"
                    class="absolute w-[200px] h-[200px] -top-8 right-0 opacity-20">
                <div 
                    class="w-full flex flex-col gap-1 h-fit">
                    <h3
                        class="font-semibold capitalize text-[1.5rem] text-gray-600">
                        Web Development Final Exam
                    </h3>
                    <span
                        class="text-blue-500 capitalize">
                        Computer science / M6 - 306 - 25Gen
                    </span>
                    <span
                        class="text-gray-500 capitalize block">
                        {{ data.exam_time }} - (Time Left: 87min)
                    </span>
                </div>
            </div>
            <div 
                class="w-full h-fit bg-white shadow-md rounded-md border-[1px] border-gray-200 mt-3">
                <form
                    name="exam"
                    method="POST"
                    enctype="multipart/form-data"
                    @submit.prevent="getData"
                    class="p-3 w-full flex flex-col gap-3 ">
                    <div 
                        v-for="(ques, idx) in data.questions"
                        :key="idx"
                        class="w-full p-3 rounded-md bg-gray-100">
                        <div 
                            class="w-full flex gap-2">
                            <span
                                class="font-semibold">{{ idx+1 }}. </span>
                            <p
                                class="text-gray-600 font-medium">
                                {{ ques.question }}
                            </p>
                        </div>
                        <div 
                            class="w-full mt-3 pl-5 flex flex-col gap-3">
                            <div
                                v-for="(ans, idx) in ques.answers"
                                :key="idx"
                                class="flex gap-3 items-center">
                                <UCheckbox
                                    v-if="ques.question_type === 'multiple_choice'"
                                    :ui="{
                                        base: 'w-5 h-5'
                                    }"
                                    @update:model-value="()=>{
                                        ans.checked = true as boolean;
                                    }"/>
                                <URadio
                                    v-if="ques.question_type === 'closed_question'"
                                    v-model="ans.is_correct"
                                    :name="ques.question_type" />
                                
                                <div 
                                    class="w-full p-3 rounded-md bg-white border-[1px] border-gray-200">
                                    <p>{{ ans.answer }}</p>
                                </div>
                            </div>
                            <UTextarea 
                                v-if="ques.question_type === 'answer_the_question'"
                                color="white" 
                                placeholder="Enter your answer here..."
                                name="" 
                                role="input"
                                resize
                                class="w-full"/>
                        </div>
                    </div>
                    <div 
                        class="w-full rounded-md bg-[#3A6D8C] flex items-center justify-end p-3">
                        <UButton
                            type="submit"
                            size="md"
                            color="black"
                            label="Submit Now"
                            variant="soft" 
                            :padded="false"
                            class="bg-white p-2 cursor-pointer transition"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import {
    GetDataContext,
    GetDataNormalForm
} from "@/composable/dataHandler";
import type {
    ResponseStatus
} from "@/models/type";
import { 
    Technology
} from '@/assets/images';
import { 
    useRouter 
} from 'vue-router';
import { 
    Confirm 
} from '@/utils/dialog';
/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();

const props = withDefaults(defineProps<{
    examId: number | null,
    open: boolean | null
}>(),{
    examId: null,
    open: null
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
 * Begin::Declare variable section
 */
const data: Ref<any> = ref<any>({});
const linksItem = [
    {
        label: 'Students'
    },
    {
        label: 'Student Exam',
    },
    {
        label: 'Exam'
    }
];
const questions: any = [
    {
        "question": "Who built Angkor Wat?",
        "question_type": "multiple_choice",
        "point": 10,
        "answers": [
            {
                "is_correct": false,
                "answer": "Jayavarman II"
            },
            {
                "is_correct": true,
                "answer": "Suryavarman II"
            },
            {
                "is_correct": false,
                "answer": " Indravarman I"
            },
            {
                "is_correct": false,
                "answer": "Jayavarman VII"
            }
        ]
    },
    {
        "question": "What is 2 + 2?",
        "question_type": "closed_question",
        "point": 10,
        "answers": [
            {
                "is_correct": true,
                "answer": 4
            },
            {
                "is_correct": false,
                "answer": 100
            }
        ]
    },
    {
        "question": "Explain about what is Fullstack developer?",
        "question_type": "answer_the_question",
        "point": 10,
    },
    {
        "question": "Who built Angkor Wat?",
        "question_type": "multiple_choice",
        "point": 10,
        "answers": [
            {
                "is_correct": false,
                "answer": "Jayavarman II"
            },
            {
                "is_correct": true,
                "answer": "Suryavarman II"
            },
            {
                "is_correct": false,
                "answer": " Indravarman I"
            },
            {
                "is_correct": false,
                "answer": "Jayavarman VII"
            }
        ]
    },
    {
        "question": "What is 2 + 2?",
        "question_type": "closed_question",
        "point": 10,
        "answers": [
            {
                "is_correct": true,
                "answer": 4
            },
            {
                "is_correct": false,
                "answer": 100
            }
        ]
    },
    {
        "question": "Explain about what is Fullstack developer?",
        "question_type": "answer_the_question",
        "point": 10,
    },
]
/**
 * End::Declare variable section
 */
const fetchData = async (): Promise<void> => {
    const result: any = await api.get(`exam/student/${props.examId}`, false) as any;
    if(!result.error)
    {
        data.value = result.data as object;
        console.log(data.value)
    }
}

const getData = async (event: Event): Promise<void> => {
    const formData: object = context.getDataForm(event as SubmitEvent) as object;
    console.log(formData)
    const result: ResponseStatus = await api.post(`exam/student/${ props.examId }`, true, formData) as ResponseStatus;

    if(!result.error)
    {
        (event.target as HTMLFormElement).reset();
    }

    emits('update:data');
} 

/**
 * Begin::Some logical
 */

/**
 * End::Some Logical
 */
onMounted(async (): Promise<void> => {
    if(props.examId){
        await fetchData();
    }
})
</script>