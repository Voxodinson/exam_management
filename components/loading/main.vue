<template>
    <div
        class="fixed top-0 left-0 flex items-center justify-center w-dvw h-dvh bg-gray-950/60 z-[99]">
        <span class="loader"></span>
    </div>
</template>

<style lang="css" scoped>
/* From Uiverse.io by Abrar-Hussain1 */ 
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

</style>