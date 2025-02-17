<template>
    <UModal 
        class="custom-modal p-3 overflow-hidden"
        :model-value="open"
        :ui="{
            container:'w-full h-[100vh] flex sm:items-start',
            width: 'w-full sm:max-w-[70%]',
            overlay: {
                background: 'bg-gray-950/75'
            }
        }"
        prevent-close>
        <div
            class="px-2 pt-2 flex items-center justify-between border-b-[1px] border-gray-200 pb-1">
            <h3
                class="font-semibold capitalize text-[#3A6D8C]">
                Team Note
            </h3>
            <UIcon 
                name="material-symbols:close-rounded" 
                class="text-[1.2rem] hover:scale-110 transition-all ease-in-out duration-150 cursor-pointer"
                @click="(): void => {
                    emits('toggle', false);
                }"/>
        </div>
        <div class="w-full h-fit max-h-[70vh] overflow-auto ">
            <div 
                class="flex flex-col p-3 gap-3 ">
                <div 
                    v-for="i in 10"
                    class="w-full flex gap-3">
                    <div
                        class="w-[60px] h-[60px] overflow-hidden rounded-full border-[1px] border-gray-200">
                        <img 
                            :src="UserImage" 
                            alt=""
                            class="w-full h-full object-cover hover:scale-110 transition">
                    </div>
                    <div class="w-[calc(100%-100px)]">
                        <span
                            class=" font-meduim">Vox Odinson</span>
                        <div 
                            class="w-full rounded-md shadow-sm border-[1px] border-gray-200 p-3 ">
                            <span
                                class="border-b-[1px] border-gray-200 pb-1 block text-[.8rem]">To : &ensp;<span class="text-blue-400">Vox Odinson 2</span></span>
                            <p
                                class="text-gray-600 text-wrap mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam veniam mollitia id omnis ea dignissimos numquam dolorum ducimus modi nulla dolore, minima hic, magnam a, obcaecati nobis repellendus. Architecto, labore?</p>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full flex flex-row-reverse gap-3 mt-3">
                    <div
                        class="w-[60px] h-[60px] overflow-hidden rounded-full border-[1px] border-gray-200">
                        <img 
                            :src="UserImage" 
                            alt=""
                            class="w-full h-full object-cover hover:scale-110 transition">
                    </div>
                    <div class="w-[calc(100%-100px)] flex flex-col items-end">
                        <span
                            class=" font-meduim text-end">Vox Odinson</span>
                        <div 
                            class="w-full rounded-md shadow-sm border-[1px] border-gray-200 p-3 ">
                            <span
                                class="border-b-[1px] border-gray-200 pb-1 text-[.8rem] flex ">To : &ensp;<span class="text-blue-400">Vox Odinson 2</span></span>
                            <p
                                class="text-gray-600 text-wrap mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam veniam mollitia id omnis ea dignissimos numquam dolorum ducimus modi nulla dolore, minima hic, magnam a, obcaecati nobis repellendus. Architecto, labore?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <form 
            name="brand"
            method="POST"
            enctype="multipart/form-data"
            @submit.prevent=""
            class="p-3 h-fit bg-opacity-50 border-t-[1px] border-gray-200">
            <div 
                v-if="sentToSelected[0]"
                class="flex flex-wrap text-[.8rem] p-2 rounded-md bg-gray-100 mb-3">
                <span>Sent To : </span>
                &ensp;
                <span
                    v-for="(person, idx) in sentToSelected"
                    :key="idx">
                    <span class="text-blue-500"> {{ person }} </span>,&ensp;
                </span>
            </div>
            <div class="w-full flex gap-3 items-center">
                <UIcon
                    :name="openSendTo ? 'meteor-icons:xmark' : 'streamline:mail-send-forward-email-email-send-message-envelope-actions-action-forward-arrow'"
                    @click="() => {
                        toggleSendTo();
                    }"
                    class="text-[#3A6D8C] hover:scale-110 transition boder-none w-6 h-6 text-[2rem]"/>
                <USelectMenu
                    v-if="openSendTo"
                    v-model="sentToSelected"
                    :popper="{ placement: 'top-start'}"
                    clear-search-on-close
                    class="border-[1px] w-[400px] border-blue-400 bg-gray-50 rounded-full p-1 "
                    placeholder="Select a person"
                    searchable
                    variant="none"
                    multiple
                    :options=" ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']"
                    searchable-placeholder="Search a person..."/>
                <UInput 
                    color="white" 
                    variant="none"
                    placeholder="Enter description here..."
                    name="description" 
                    role="input"
                    class="w-full border-[1px] border-blue-400 bg-gray-100 py-1 rounded-full overflow-hidden"/>
                <UButton
                    type="submit"
                    size="sm"
                    color="black"
                    label="Send"
                    icon="iconoir:send-solid"
                    variant="soft" 
                    :padded="false"
                    class="bg-[#3A6D8C] h-fit text-white hover:bg-opacity-80 p-2 rounded-full px-3 transition"/>
            </div>
        </form>
    </UModal>
</template>

<script setup lang="ts">
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import {
    GetDataContext,
    GetDataNormalForm
} from "@/composable/dataHandler";
import type {
    ResponseStatus,
    Items
} from "@/models/type";
import { 
    SelectMenu,
    InputDate
} from "@/components/ui";
import { 
    Confirm 
} from "@/utils/dialog";
import { 
    UserImage 
} from "@/assets/images";
/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
}>();

const props = withDefaults(defineProps<{
    open: boolean
}>(),{
    open: false
});
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variables object section
 */
const api: ContextAPI = new ContextAPI(new SimpleAPI());
const context: GetDataContext = new GetDataContext(new GetDataNormalForm());
/**
 * End::Declare variables object section
 */

/**
 *Begin::Declare variable in this section 
 */ 
const data: Ref<object> = ref<object>({});
const openSendTo: Ref<boolean> = ref<boolean>(false);
const sentToSelected: Ref<any> = ref<any>([]);
/**
 *End::Declare variable in this section 
 */ 

/**
 * Begin::Fetch data section
 */


/**
 * End::Fetch data section
 */

/**
 * Begin::Some logical section
 */
const toggleSendTo = (): void => {
    openSendTo.value = !openSendTo.value as boolean;
}
/**
 * End::Some logical section
 */
onMounted(async (): Promise<void> => {
})
</script>