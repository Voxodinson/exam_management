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
                            Exam :
                        </span>
                        <span
                            class=" capitalize">
                            {{ data.name}}
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
                            {{ data.major_id }}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                :name="data.status == 'publishing' ? 'material-symbols:check-circle-outline-rounded' : 'ph:x-circle-duotone'"
                                class="w-6 h-6"
                                :class="data.status == 'publishing' ? 'text-green-500' : 'text-red-500'"/>
                            Status :
                        </span>
                        <span
                            class="px-4 rounded-md text-white text-[.8rem] py-0.5 mb-1 uppercase"
                            :class="data.status === 'publishing' ? 'bg-blue-400' : 'bg-red-500'">
                            {{ data.status }}
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
                            {{ data.create_uid }}
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
                            {{ data.created_at }}
                        </span>
                    </li>
                    <li
                        @click="() => {
                            toggleViewQuestion();
                        }"
                        class="w-full border-none hover:bg-blue-50 cursor-pointer bg-blue-100 rounded-md p-2">
                        <span
                            class="font-semibold capitalize">
                            Question & Answer
                        </span>
                        <UIcon
                            :name="viewQuestion ? 'line-md:chevron-right-circle-twotone' : 'line-md:chevron-down-circle-twotone'"
                            class="w-6 h-6 text-gray-400"/>
                    </li>
                </ul>
                <div 
                    v-if="viewQuestion"
                    v-for="(question, idx) in data.questions"
                    class="w-full flex-col gap-2 mt-3 p-3 bg-gray-100 rounded-md">
                    <div 
                        class="w-full">
                        <p
                            class="w-full flex justify-between items-center">
                            <span>{{ idx+1 }}. {{ question.question }} - <span>{{ question.mark || 0 }} pt</span></span>
                            <span class=" capitalize text-[.9rem] text-blue-400">
                                {{ question.question_type }}
                            </span>
                        </p>
                        <div 
                            class="px-4 flex flex-col gap-3">
                            <p
                                v-for="(answer, idx) in question.qcm_answers">
                                {{ idx+1 }}. {{ answer.name }}
                            </p>
                        </div>
                        <div 
                            class="border-t-[1px] border-gray-200 pt-2 mt-2">
                            <p
                                class="flex gap-3">
                                Correct Answer is: 
                                <span
                                    class="text-blue-400"
                                    v-for="ans in question.qcm_answers">
                                    <span
                                        v-if="ans.is_correct">{{ ans.name }}</span>
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
    ResponseStatus
} from "@/models/type";
import { 
    watch 
} from 'vue';


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
    examId: number | null
}>(),{
    open: false,
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
const data: Ref<any> = ref<any>({});
const viewQuestion: Ref<boolean> = ref<boolean>(false);
/**
 *End::Declare variable in this section 
 */ 

/**
 * Begin::Fetch data section
 */
 const fetchData = async (): Promise<void> => {
    const result: ResponseStatus = await api.get(`exam/${props.examId}`) as ResponseStatus;
    if(!result.error)
    {
        data.value = result.data as any;
        console.log(data.value)
    }
}

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

watch(
    () => [props.open, props.examId], async ([newOpen, newExamId]) => {
        if (newOpen || newExamId) {
            await fetchData();
        }
    },
    { immediate: true }
);
</script>