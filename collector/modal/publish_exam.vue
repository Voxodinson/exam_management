<template>
    <UModal 
        class="custom-modal p-3 rounded-md overflow-hidden"
        :model-value="open"
        :ui="{
            width: 'w-full sm:max-w-[50%]',
            overlay: {
                background: 'bg-gray-950/75'
            }
        }"
        prevent-close>
        <div
            class="px-2 pt-2 flex items-center justify-between border-b-[1px] border-gray-200 pb-1">
            <h3
                class="font-semibold capitalize text-[#3A6D8C]">
                Publish Exam
            </h3>
            <UIcon 
                name="material-symbols:close-rounded" 
                class="text-[1.2rem] hover:scale-110 transition-all ease-in-out duration-150 cursor-pointer"
                @click="(): void => {
                    emits('toggle', false);
                }"/>
        </div>    
        <form
            name=""
            method="POST"
            enctype="multipart/form-data"
            @submit.prevent="getData"
            class=" w-full max-h-[80vh] rounded-md overflow-hidden">
            <div 
                class="flex flex-col w-full gap-3 p-3">
                <UFormGroup
                    class="w-full"
                    label="Class"
                    name="class_id">
                    <SelectMenu
                        name="class_id"
                        :options="[]"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
                        placeholder="Please select class"
                        class="w-full"/>
                </UFormGroup>
                <UFormGroup
                    class="w-full"
                    label="Exam Time (Mins)"
                    name="exam_time">
                    <UInput
                        type="text"
                        color="white"
                        variant="outline"
                        size="md"
                        name="exam_time"
                        role="input"
                        class="w-full"
                        placeholder="Enter exam duration in (minutes)..."/>
                </UFormGroup>
            </div>
            <div class="flex gap-2 p-3 border-t-[1px] border-gray-200 mt-3 items-end justify-end">
                <UButton
                    type="button"
                    size="sm"
                    color="black"
                    label="Cancel"
                    variant="soft" 
                    :padded="false"
                    @click="() => {
                        emits('toggle', false);
                    }"
                    class="bg-red-500 px-4 py-2 text-white hover:bg-red-300  transition"/>
                <UButton
                    type="submit"
                    size="sm"
                    color="black"
                    label="Create Exam"
                    variant="soft" 
                    :padded="false"
                    class="bg-blue-400 px-4 py-2 text-white hover:bg-blue-300 transition"/>
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
    ResponseStatus
} from "@/models/type";
import { 
    SelectMenu
} from "@/components/ui";

/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();

const props = withDefaults(defineProps<{
    open: boolean,
    id: number | null
}>(),{
    open: false, 
    id: null
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

/**
 *End::Declare variable in this section 
 */ 

/**
 * Begin::Fetch data section
 */
 const getData = async (event: Event): Promise<void> => {
    const formData: any = context.getDataForm(event as SubmitEvent) as any;

    const result: ResponseStatus = await api.post(`exam/assign/${props.id}`, true, formData) as ResponseStatus;
    if(!result.error)
    {
        emits('toggle', false);
        (event.target as HTMLFormElement).reset();
    }

    emits('update:data');
}

/**
 * End::Fetch data section
 */

/**
 * Begin::Some logical section
 */

/**
 * End::Some logical section
 */
onMounted(async (): Promise<void> => {
})
</script>