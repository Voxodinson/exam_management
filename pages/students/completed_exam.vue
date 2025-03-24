<template>
    <div
        class="w-full h-fit flex items-center justify-center">
        <div 
            class="w-[60%]  flex flex-col gap-3 p-3 py-6">
            <div 
                v-for="(exam, idx) in data.data"
                :key="idx"
                class="flex flex-col border-[1px] relative border-gray-200 rounded-md p-3 overflow-hidden">
                <h3
                    class="font-semibold capitalize text-[1.2rem] text-gray-600">
                    {{ exam.exam.name }}
                </h3>
                <span
                    class="text-blue-500 text-[.8rem] capitalize">
                    {{ exam.student.first_name }} - {{  exam.student.last_name }}
                </span>
                
                <span 
                    class="text-gray-500 text-[1.5rem] mt-3">
                    {{ exam.score }}/{{ exam.exam.total_mark}}
                    <span
                        class="text-[.8rem] text-blue-400"> {{ exam.percentage }}%</span>
                </span>
                <span
                    class="text-gray-500 border-t-[1px] border-gray-200 pt-3 text-[.8rem] mt-3 capitalize">
                    Exam Time: {{ exam.exam.exam_time }} &ensp; - &ensp;
                    Submited: {{ exam.submitted_at }}
                </span>
                <img 
                    :src="Check" 
                    alt="icon"
                    v-if="exam.score > Number(exam.exam.pass_mark)"
                    class="w-[220px] absolute -top-6 opacity-20 -z-10 right-0">
                <img 
                    :src="Failed" 
                    alt="icon"
                    v-if="exam.score < Number(exam.exam.pass_mark)"
                    class="w-[220px] absolute -top-6 opacity-20 -z-10 right-0">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { 
    Check,
    Failed 
} from '@/assets/images';
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import type {
    Options,
    ResponseStatus
} from "@/models/type";

definePageMeta({
    layout: 'student',
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
/**
 * End::Declare variable section
 */ 

/**
 * Begin::Some logical in this component
 */

/**
 * End::Some logical in this component
 */

/**
 * Begin::Fetch data section
 */
 const fetchData = async (current_page: number = 1,per_page: number = 10): Promise<void> => {
    const result: ResponseStatus = await api.get(`exam/studentExam/test/1`, false) as ResponseStatus;
    if(!result.error)
    {
        data.value = result as object;
        console.log(data.value)
    }
}

const fetchOption = async (): Promise<void> => {
    const options: ResponseStatus = await api.get("") as ResponseStatus;
    if(!options.error)
    {
        dataOptions.value = options.data as unknown as Options;
    }
};
/**
 * End::Fetch data section
 */


onMounted(async (): Promise<void> => {
    await fetchData();
});
</script>