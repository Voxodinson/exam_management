<template>
    <div
        class="bg-white p-2 flex items-center h-[45px] px-4 border-b-[1px] border-gray-200">
        <UTooltip 
            text="Back to major list"
            :popper="{ offsetDistance: 12 }">
            <UButton
                icon="material-symbols-light:chevron-left-rounded"
                size="sm"
                color="black"
                label="Back"
                variant="soft" 
                :padded="false"
                @click="()=>{
                    emits('toggle', false);
                }"
                class="bg-[#3A6D8C] w-[70px] hover:bg-gray-200 text-white hover:text-black p-1 transition"/>
        </UTooltip>
    </div>
    <div class="w-full p-2">
        <form
            name=""
            method="POST"
            enctype="multipart/form-data"
            @submit.prevent="getData"
            class=" w-full bg-white rounded-md p-2">
            <div 
                class="flex flex-wrap w-full gap-3 pb-4">
                <UFormGroup
                    class="w-full"
                    label="Exam"
                    name="">
                    <SelectMenu
                        name=""
                        :options="dataOptions.exam"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
                        placeholder="Please select exam"
                        @update:model-value="(value: any) => {
                            examId = Number(value.id);
                        }"
                        class="w-full"/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(99%/2)]"
                    label="Class"
                    name="class_id">
                    <SelectMenu
                        name="class_id"
                        :options="dataOptions.class"
                        value-attribute="id"
                        option-attribute="name"
                        id-attribute="id"
                        placeholder="Please select class"
                        class="w-full"/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(98.8%/2)]"
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
            <div class="flex gap-2 p-2 border-t-[1px] border-gray-200 items-end justify-end">
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
                    label="Publish Exam"
                    variant="soft" 
                    :padded="false"
                    class="bg-blue-400 px-4 py-2 text-white hover:bg-blue-300 transition"/>
            </div>
        </form>
    </div>
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
    Options
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
const examId: Ref<number | null> = ref<number | null>(null);
const dataOptions: Ref<Options> = ref<Options>({});
/**
 *End::Declare variable in this section 
 */ 

/**
 * Begin::Fetch data section
 */
 const getData = async (event: Event): Promise<void> => {
    const formData: any = context.getDataForm(event as SubmitEvent) as any;

    const result: ResponseStatus = await api.update(`exam/assign/${examId.value}`, true, formData) as ResponseStatus;
    if(!result.error)
    {
        emits('toggle', false);
        (event.target as HTMLFormElement).reset();
    }

    emits('update:data');
}

const fetchOption = async (): Promise<void> => {
    const options: ResponseStatus = await api.get("") as ResponseStatus;
    if(!options.error)
    {
        dataOptions.value = options.data as unknown as Options;
    }
};
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