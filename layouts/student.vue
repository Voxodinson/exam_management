<template>
    
    <div
        class="h-fit relative">
        <div 
            class=" w-full fixed top-0 z-30 transition"
            :class="{'-translate-y-full': !isVisible}">
            <StudentNavigation/>
        </div>
    </div>
    <div 
        class="w-full h-fit mt-[60px]">
        <NuxtPage />
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { StudentNavigation } from '@/components/layout';

const isVisible: Ref<boolean> = ref<boolean>(true);
let lastScrollY = 0;
/**
 * Begin::Some Logical section
 */
 const handleScroll = () => {
    const currentScrollY = window.scrollY;
    isVisible.value = currentScrollY < lastScrollY || currentScrollY < 10;
    lastScrollY = currentScrollY;
};
/**
 * End::Some Logical section
 */

onMounted(() => {
   window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>