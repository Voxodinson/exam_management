<template>
    <div
        class="w-full h-fit flex items-center justify-center">
        <div 
            class="w-[60%] flex flex-col gap-3 p-3 py-6">
            <div 
                v-if="data.data?.length === 0"
                class="flex gap-3 flex-col items-center mt-10 justify-center">
                <img 
                    :src="NoDataFound" 
                    alt="no data image"
                    class="w-[50px] opacity-30">
                <span
                    class="text-gray-400 text-[.8rem]">
                    Ops...! Publish exam not available
                </span>
            </div>
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
                    {{ exam.score }}/{{ Math.floor(exam.exam.total_mark)}}
                    <span
                        class="text-[.8rem] text-blue-400"> {{ exam.percentage }}%</span>
                </span>
                <span
                    class="text-gray-500 border-t-[1px] border-gray-200 pt-3 text-[.8rem] mt-3 capitalize">
                    Exam Time: {{ exam.exam.exam_time }} &ensp; - &ensp;
                    Time Spent: {{ exam.total_time_spent }} &ensp; - &ensp;
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
    ResponseStatus
} from "@/models/type";
import { 
    NoDataFound 
} from '@/assets/images';
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
 const fetchData = async (): Promise<void> => {
    let authId = localStorage.getItem('auth_id');
    const result: ResponseStatus = await api.get(`exam/studentExam/test/${authId}`, false) as ResponseStatus;
    if(!result.error)
    {
        data.value = result as object;
        console.log(authId)
    }
}
/**
 * End::Fetch data section
 */


onMounted(async (): Promise<void> => {
    await fetchData();
});
</script>