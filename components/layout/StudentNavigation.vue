<template>
    <div
        class="w-full h-[60px] flex items-center justify-center bg-[#3A6D8C]">
        <div 
            class="w-[90%] h-full flex items-center justify-between">
            <div 
                class="w-[60px] h-[60px] flex items-center justify-center">
                <img 
                    :src="Logo" 
                    alt="logo"
                    class="">
            </div>
            <ul
                class="flex items-center justify-start *:text-[0.9rem] gap-1 capitalize font-medium *:text-gray-50">
                <li>
                    <NuxtLink 
                        to="/students/students_exam" 
                        class="py-2 px-4 rounded-full transition flex items-center justify-center gap-2"
                        active-class="bg-white bg-opacity-80 text-[#3A6D8C]">
                        <UIcon 
                            name="material-symbols:task-alt-rounded" 
                            class="w-5 h-5" />
                        Your Tasks
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink 
                        to="/students/completed_exam" 
                        class="py-2 px-4 rounded-full transition flex items-center justify-center gap-2"
                        active-class="bg-white bg-opacity-80 text-[#3A6D8C]">
                        <UIcon 
                            name="ic:round-history" 
                            class="w-5 h-5" />
                        Completed
                    </NuxtLink>
                </li>
            </ul>
            <User/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { 
    Logo 
} from '@/assets/images';
import { 
    User 
} from '.';
</script>