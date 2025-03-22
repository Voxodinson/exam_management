<template>
    <template v-if="isOpenStudentExam">
        <StudentExam
            :exam-id="examId"
            :open="isOpenStudentExam"
            @toggle="toggleStudentExam"
            @update:data="fetchData"/>
    </template>
    <template v-else>
        <div
            class="w-full h-fit flex flex-col items-center justify-center">
            <div 
                class="w-[60%] flex flex-col gap-3 py-6">
                <div 
                    class="w-full h-fit bg-opacity-70 relative overflow-hidden pb-3 border-b-[1px] border-gray-200">
                    <h3
                        class="text-[1.2rem] font-semibold capitalize text-gray-600 dark:text-white">All Tasks / Published</h3>
                    <span
                        class="text-gray-500 dark:text-white text-[.9rem] font-semibold">
                        Total Exam: 
                        <span
                            class="text-blue-500 text-[1rem]">
                            {{ data.total }}
                        </span>
                    </span>
                </div>
                <div 
                    v-if="data.total === Number(0)"
                    class="w-full flex gap-3 flex-col items-center mt-10 justify-center">
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
                    class="w-full flex flex-col gap-3 items-start justify-start">
                    <div 
                        v-for="(exam, idx) in data.data"
                        :key="idx"
                        class="w-full dark:bg-white h-fit p-3 flex flex-col rounded-md border-[1px] mt-3 border-gray-200 overflow-hidden">
                        <div 
                            class="flex items-center justify-between">
                            <div 
                                class="w-fit h-fit">
                                <h3
                                    class="font-semibold capitalize text-[1.2rem] text-gray-600">
                                    {{ exam.name }}
                                </h3>
                                <span
                                    class="text-blue-500 text-[.8rem] capitalize">
                                    {{ exam.department_name || "------"}} / {{ exam.major_name || "------"}} / {{exam.class_name  || "------"}}
                                </span>
                            </div>
                            <UButton
                                class="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white text-[.8rem]"
                                @click="() => {
                                    if(exam.id){
                                        examId = Number(exam.id);
                                    }
                                    toggleStudentExam(Boolean(true));
                                }">
                                Start Exam Now
                            </UButton>
                        </div>
                        <div
                            class="text-gray-400 mt-3 pt-3 text-[.8rem] border-t-[1px] border-gray-200">
                            <span>
                                Start: 
                                <span class="text-blue-500">22-Feb-2025 01:00:00</span>
                            </span> - 
                            <span>End: 
                                <span class="text-blue-500">22-Feb-2025 03:0:00</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script lang="ts" setup>
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import {
     NoDataFound 
} from "@/assets/images";
import { 
    StudentExam 
} from "@/collector/student_exam";

definePageMeta({
  layout: 'student',
  colorMode: 'light'
});

useSeoMeta({
  title: 'Login'
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
const isOpenStudentExam: Ref<boolean | null> = ref<boolean | null>(null);
const examId: Ref<number | null> = ref<number | null>(null);
/**
 * End::Declare variable section
 */ 
/**
 * Begin::Fetch data section
 */
 const fetchData = async (): Promise<void> => {
    const result: any = await api.get('exam/publish', false) as any;
    if(!result.error)
    {
        data.value = result as object;
        console.log(data.value)
    }
}

/**
 * End::Fetch data section
 */

/**
 * Begin::Some logical section
 */
const toggleStudentExam = (value: boolean) => {
    isOpenStudentExam.value = value as boolean;
}
/**
 * End::Some logical section
 */
onMounted(async (): Promise<void> => {
    await fetchData();
})
</script>