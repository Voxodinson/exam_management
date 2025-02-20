<template>
    <div class="flex items-center justify-between h-[50px] bg-[#3A6D8C] border-b-[1px] border-white">
        <img 
            src="../../assets/images/logo.png" 
            alt="logo"
            class="w-[50px] ml-28">
        <div class="flex h-full gap-3 py-3 items-center justify-center mr-4">
            <UTooltip 
                text="Create New Exam"
                :popper="{ offsetDistance: 16 }">
                <UButton
                    icon="material-symbols:add-circle-outline-rounded"
                    size="sm"
                    color="white"
                    label="New"
                    variant="soft" 
                    :padded="false"
                    @click="(): void => {
                        toggleCreateExamModal(Boolean(true));
                    }"
                    class=" hover:bg-gray-100 text-white hover:text-black p-1 transition"/>
            </UTooltip>
            <div class="h-full border-[1px] border-white"></div>
            <UTooltip 
                :text="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'"
                :popper="{ offsetDistance: 16 }">
                <UButton
                    :icon="isFullscreen ? 'ant-design:fullscreen-exit-outlined' : 'gridicons:fullscreen'"
                    size="sm"
                    color="white"
                    variant="soft" 
                    :padded="false"
                    @click="async (): Promise<void> => {
                        await toggleFullscreen();
                    }"
                    class="text-white hover:bg-gray-100 hover:text-black p-1 transition"/>
            </UTooltip>
            <UTooltip 
                text="Open Noted"
                :popper="{ offsetDistance: 16 }">
                <UButton
                    icon="material-symbols:event-note-outline"
                    size="sm"
                    color="white"
                    variant="soft" 
                    :padded="false"
                    @click="(): void => {
                        toggleOpenNoteModal(Boolean(true));
                    }"
                    class="text-white hover:bg-gray-100 hover:text-black p-1 transition"/>
            </UTooltip>
            <User/>
        </div>
    </div>
    
    <NewExamModal
        :open="isOpenCreateModal"
        @toggle="toggleCreateExamModal"/>
    <NotedModal
        :open="isOpenNoteModal"
        @toggle="toggleOpenNoteModal"/>
</template>

<script setup lang="ts">
import { 
    NewExamModal 
} from '@/collector/modal';
import { 
    NotedModal 
} from '@/modal';
import { 
    User 
} from '.';
/**
 * Begin::Declare variable section
 */
const isOpenCreateModal: Ref<boolean> = ref<boolean>(false);
const isOpenNoteModal: Ref<boolean> = ref<boolean>(false);
const isFullscreen: Ref<boolean> = ref<boolean>(false);
/**
 * Begin::Declare variable section
 */

/**
 * Begin::Some logical section
 */
const toggleCreateExamModal = (value: boolean): void => {
    isOpenCreateModal.value = value as boolean;
}

const toggleOpenNoteModal = (value: boolean) => {
    isOpenNoteModal.value = value as boolean;
}

const toggleFullscreen = async (): Promise<void> => {
    // @ts-ignore
    if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
    {
        handleExitFullscreen();
        isFullscreen.value = false;
    }
    else
    {
        await handleRequestFullscreen();
        isFullscreen.value = true;
    }
}

const handleRequestFullscreen = async (): Promise<void> => {
    const body: HTMLBodyElement = document.body as HTMLBodyElement;
    if(await body.requestFullscreen)
    {
        body.requestFullscreen();
    }
    // @ts-ignore
    else if(await body.mozRequestFullScreen)
    {
        // @ts-ignore
        body.mozRequestFullScreen();
    }
    // @ts-ignore
    else if(await body.webkitRequestFullscreen)
    {
        // @ts-ignore
        body.webkitRequestFullscreen();
    }
    // @ts-ignore
    else if(body.msRequestFullscreen)
    {
        // @ts-ignore
        body.msRequestFullscreen();
    }
}

const handleExitFullscreen = (): void => {
    if(document.exitFullscreen)
    {
        document.exitFullscreen();
    }
    // @ts-ignore
    else if(document.mozCancelFullScreen)
    {
        // @ts-ignore
        document.mozCancelFullScreen();
    }
    // @ts-ignore
    else if(document.webkitExitFullscreen)
    {
        // @ts-ignore
        document.webkitExitFullscreen();
    }
    // @ts-ignore
    else if(document.msExitFullscreen)
    {
        // @ts-ignore
        document.msExitFullscreen();
    }
}

const checkFullscreen = async (): Promise<void> => {
    // @ts-ignore
    if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
    {
        handleRequestFullscreen();
        isFullscreen.value = true;
    }
    else
    {
        isFullscreen.value = false;
    }
}
/**
 * Begin::Some logical section
 */

onMounted(async (): Promise<void> => {
    await checkFullscreen();
})
</script>