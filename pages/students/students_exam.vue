<template>
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
                    Total Tasks: 
                    <span
                        class="text-blue-500 text-[1rem]">
                        3
                    </span>
                </span>
            </div>
            <div 
                class="w-full flex flex-col gap-3 items-start justify-start">
                <div 
                    class="w-full dark:bg-white h-fit p-3 flex flex-col rounded-md border-[1px] mt-3 border-gray-200 overflow-hidden">
                    <div 
                        class="flex items-center justify-between">
                        <div 
                            class="w-fit h-fit">
                            <h3
                                class="font-semibold capitalize text-[1.2rem] text-gray-600">
                                Web Development Final Exam
                            </h3>
                            <span
                                class="text-blue-500 text-[.8rem] capitalize">
                                Computer science / M6 - 306 - 25Gen
                            </span>
                        </div>
                        <NuxtLink
                            to="/students/student_exam/exam" 
                            class="px-4 py-2 rounded-full bg-blue-500 text-white text-[.8rem]">
                            Start Exam Now
                        </NuxtLink>
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

<script setup>
definePageMeta({
  layout: 'student',
  colorMode: 'light'
});

useSeoMeta({
  title: 'Login'
});
</script>