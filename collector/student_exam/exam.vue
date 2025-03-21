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
                        {{ data.name }}
                    </h3>
                    <span
                        class="text-blue-500 capitalize">
                        {{ data.department_name || "------"}} / {{ data.class_name || "------"}} / {{data.class_code  || "------"}}
                    </span>
                    <span
                        class="text-gray-500 capitalize block">
                        {{ data.exam_time }}
                    </span>
                </div>
            </div>
            <div 
                class="w-full h-fit p-3 gap-3 flex flex-col bg-white shadow-md rounded-md border-[1px] border-gray-200 mt-3">
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
                            v-for="(ans, idx) in ques.qcm_answers"
                            :key="idx"
                            class="flex gap-3 items-center">
                            <UCheckbox
                                :ui="{ base: 'w-5 h-5' }"
                                @update:model-value="(checked) => {
                                    if (ans.id && ans.question_id) {
                                        handleCheckboxUpdate(ans, checked);
                                    }
                                }"
                            />
                            <div 
                                class="w-full p-3 rounded-md bg-white border-[1px] border-gray-200">
                                <p>{{ ans.name }}</p>
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
                        size="md"
                        color="black"
                        label="Submit Now"
                        variant="soft" 
                        :padded="false"
                        @click="() => {
                            Confirm('You are about to submit the answers', async (): Promise<void> => {
                                await studentSubmit();
                            })
                        }"
                        class="bg-white p-2 cursor-pointer transition"/>
                </div>
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
import { 
    Technology
} from '@/assets/images';
import type { 
    ResponseStatus 
} from "@/models/type";
import { 
    Confirm 
} from "@/utils/dialog";
interface Answer {
    question_id: number | null;
    selected_answer_id: number | null;
}

interface StudentAnswer {
    answers: Answer[];
}

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
/**
 * End::Declare variables object section
 */



/**
 * Begin::Declare variable section
 */
const data: Ref<any> = ref<any>({});
const studentAnswer: Ref<StudentAnswer> = ref<StudentAnswer>({
    "answers": []
});

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

const studentSubmit = async (): Promise<void> => {
    const url: string = `exam/student/submit/${props.examId}`
    const result: ResponseStatus = await api.post(url, true, studentAnswer.value) as ResponseStatus;
    console.log(studentAnswer.value)
    if(!result.error){ 
        emits('update:data');
        emits('toggle', false);
    }
}

/**
 * Begin::Some logical
 */

 const handleCheckboxUpdate = (answer: any, checked: boolean) => {
    const index = studentAnswer.value.answers.findIndex(
        (item) => item.selected_answer_id === Number(answer.id)
    );

    if (checked) {
        // Add item if checked and not already in the array
        if (index === -1) {
            studentAnswer.value.answers.push({
                question_id: Number(answer.question_id),
                selected_answer_id: Number(answer.id)
            });
        }
    } else {
        // Remove item if unchecked
        if (index !== -1) {
            studentAnswer.value.answers.splice(index, 1);
        }
    }

    console.log(studentAnswer.value.answers);
};

/**
 * End::Some Logical
 */
onMounted(async (): Promise<void> => {
    if(props.examId){
        await fetchData();
    }
})
</script>