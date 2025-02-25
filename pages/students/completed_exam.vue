<template>
    <div
        class="w-full h-fit flex items-center justify-center">
        <div 
            class="w-[60%]  flex flex-col gap-3 p-3 py-6">
            <div 
                v-for="i in 10"
                class="flex flex-col border-[1px] relative border-gray-200 rounded-md p-3 overflow-hidden">
                <h3
                    class="font-semibold capitalize text-[1.2rem] text-gray-600">
                    Web Development Final Exam
                </h3>
                <span
                    class="text-blue-500 text-[.8rem] capitalize">
                    Computer science / M6 - 306 - 25Gen
                </span>
                
                <span 
                    class="text-gray-500 text-[1.5rem] mt-3">
                    90/100
                </span>
                <span
                    class="text-gray-500 border-t-[1px] border-gray-200 pt-3 text-[.8rem] mt-3 capitalize">
                    Submited Date: 2025-02-13 14:33:10
                </span>
                <img 
                    :src="Check" 
                    alt="icon"
                    class="w-[220px] absolute -top-6 opacity-20 -z-10 right-0">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { 
    Check ,
    Technology
} from '@/assets/images';
definePageMeta({
  layout: 'student',
  colorMode: 'light'
});

</script>