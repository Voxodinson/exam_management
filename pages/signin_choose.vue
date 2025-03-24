<template>
    <div
        class="w-full h-[100vh] bg-gray-200 flex items-center justify-center">
        <div 
            class="w-fit flex flex-col items-center gap-3">
            <div class="flex flex-col items-center justify-center">
                <h1 
                    class="text-[1.5rem] text-gray-600 font-bold">
                    Welcome to the 
                    <span
                        class="text-[#3A6D8C] text-[2rem] uppercase">
                        IDigital
                    </span>
                </h1>
                <p 
                    class="text-gray-400">
                    Please select the appropriate login option based on your role.
                </p>
            </div>
            <div 
                class="w-full flex justify-center items-center gap-3 pt-6 border-t-[1px] border-gray-200">
                <NuxtLink 
                    to="/signin"
                    class="px-10 py-1 rounded-md bg-[#3A6D8C] text-[.9rem] text-white">
                    Admin Login
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'login',
  colorMode: 'light'
});

useSeoMeta({
  title: 'Login'
});

</script>

<style lang="scss" scoped>

</style>