<template>
    <div
        class="w-full h-fit flex flex-col items-center justify-center">
      	<div 
            class="w-[60%] flex flex-col gap-3 py-6">
            <div 
                class="w-full flex items-center justify-between">
                <UButton
                    variants="none"
                    size="md" 
                    color="white"
                    @click="backPrevious()">
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
                        Duration: 90min - (Time Left: 87min)
                    </span>
                </div>
            </div>
            <div 
                class="w-full h-[100vh] bg-white shadow-md rounded-md border-[1px] border-gray-200 mt-3">
                <form
                    name=""
                    method="POST"
                    enctype="multipart/form-data"
                    @submit.prevent=""
                    class="p-2 w-full flex flex-col gap-3 ">
                    <div 
                        class="w-full p-3">
                        <div 
                            class="w-full flex gap-2">
                            <span
                                class="font-semibold">1. </span>
                            <p
                                class="text-gray-600 font-medium">
                                Who built Angkor Wat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ipsa, error laudantium nesciunt velit voluptates est quod delectus. Officiis tempora doloribus tenetur sint quos et ab saepe veritatis quis inventore, ea ad ex magnam perferendis odio excepturi quaerat nulla voluptates iusto quia illo porro non soluta earum. Aut eligendi molestiae ab, dolores eius et tenetur laborum unde commodi beatae cumque, dolore omnis, vitae a labore quas officiis laudantium aliquam! Dolor voluptates veritatis et accusantium distinctio aliquid minus iusto suscipit voluptate? Similique ut velit, saepe id eius nobis dolore aliquam laboriosam voluptatibus optio incidunt dolores enim facere, architecto libero repudiandae beatae.</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { 
    Technology
} from '@/assets/images';
import { 
    useRouter 
} from 'vue-router';
definePageMeta({
  layout: 'student',
  colorMode: 'light'
});

/**
 * Begin::Declare variable section
 */
const router = useRouter();
const linksItem = [
    {
        label: 'Students'
    },
    {
        label: 'Student Exam',
    },
    {
        label: 'Exam',
        to: '/students/student_exam/exam'
    }
];
/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical
 */
const backPrevious = (): void => {
    if (window.history.length > 1) {
        router.back();
    } else {
        router.push('/');
    }
};
/**
 * End::Some Logical
 */
</script>