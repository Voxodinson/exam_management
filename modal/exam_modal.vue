<template>
    <UModal 
        class="custom-modal p-3 overflow-hidden"
        :model-value="open"
        :ui="{
            width: 'w-full sm:max-w-[70%]',
            overlay: {
                background: 'bg-gray-950/75'
            }
        }"
        prevent-close>
        <div
            class="px-2 pt-2 flex items-center justify-between border-b-[1px] border-gray-200 pb-1">
            <h3
                class="font-semibold capitalize">
                Exam Info
            </h3>
            <UIcon 
                name="material-symbols:close-rounded" 
                class="text-[1.2rem] hover:scale-110 transition-all ease-in-out duration-150 cursor-pointer"
                @click="(): void => {
                    emits('toggle', false);
                }"/>
        </div>
        <div class="w-full h-fit max-h-[80vh] overflow-auto">
            <div class="h-fit p-3">
                <ul
                    class="*:w-full *:flex *:items-start *:px-2 flex flex-col gap-3 *:justify-between *:border-b-[1px] *:border-gray-200 ">
                    <li
                        class="w-full border-none bg-blue-100 rounded-md p-2">
                        <span
                            class="font-semibold capitalize">
                            Exam Information
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="material-symbols:code-blocks-outline-rounded"
                                class="w-6 h-6 text-yellow-400"/>
                            Exam ID :
                        </span>
                        <span>
                            {{ datas.exam_code}}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="icon-park-twotone:writing-fluently"
                                class="w-6 h-6 text-blue-400"/>
                            Exam Subject :
                        </span>
                        <span
                            class=" capitalize">
                            {{ datas.subject }}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                :name="datas.status == 'publish' ? 'material-symbols:check-circle-outline-rounded' : 'ph:x-circle-duotone'"
                                class="w-6 h-6"
                                :class="datas.status == 'publish' ? 'text-green-500' : 'text-red-500'"/>
                            Status :
                        </span>
                        <span
                            class="px-4 rounded-md text-white text-[.8rem] py-0.5 mb-1 uppercase"
                            :class="datas.status === 'publish' ? 'bg-blue-400' : 'bg-red-500'">
                            {{ datas.status }}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="material-symbols:account-circle"
                                class="w-6 h-6 text-blue-400"/>
                             Create By :
                        </span>
                        <span
                            class=" capitalize">
                            {{ datas.created_by }}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="material-symbols:check-rounded"
                                class="w-6 h-6 text-green-500"/>
                             Create At :
                        </span>
                        <span>
                            {{ datas.created_at }}
                        </span>
                    </li>
                    <li
                        @click="() => {
                            toggleViewQuestion();
                        }"
                        class="w-full border-none hover:bg-blue-50 cursor-pointer bg-blue-100 rounded-md p-2">
                        <span
                            class="font-semibold capitalize">
                            Question & Answer ( <span class="text-blue-400">{{ datas.questions.length }}</span> )
                        </span>
                        <UIcon
                            :name="viewQuestion ? 'line-md:chevron-right-circle-twotone' : 'line-md:chevron-down-circle-twotone'"
                            class="w-6 h-6 text-gray-400"/>
                    </li>
                </ul>
                <div 
                    v-if="viewQuestion"
                    v-for="(question, idx) in datas.questions"
                    class="w-full flex-col gap-2 mt-3 p-3 bg-gray-100 rounded-md">
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
                <div
                    v-if="!viewQuestion" 
                    class="w-full flex items-center justify-center border-t-[1px] border-gray-200 mt-3 py-1">
                    <p
                        class="text-[.8rem] text-gray-400">Question & Answer will be display down here...</p>
                </div>
            </div>
        </div>
    </UModal>
    
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
    answer: IAnswer[];
}

/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
}>();

const props = withDefaults(defineProps<{
    open: boolean
}>(),{
    open: false
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
const data: Ref<object> = ref<object>({});
const viewQuestion: Ref<boolean> = ref<boolean>(false);
const datas = {
    "start_time": "7:30AM 10-12-2025",
    "end_time": "9:00AM 10-12-2025",
    "exam":"Final",
    "exam_code":"EXAM-001",
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
    "created_at": "10-05-2003",
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
 };
/**
 *End::Declare variable in this section 
 */ 

/**
 * Begin::Fetch data section
 */


/**
 * End::Fetch data section
 */
const toggleViewQuestion = (): void => {
    viewQuestion.value = !viewQuestion.value as boolean;
}
/**
 * Begin::Some logical section
 */


/**
 * End::Some logical section
 */
onMounted(async (): Promise<void> => {
})
</script>