<template>
    <div
        class="bg-white p-2 flex items-center h-[45px] px-4 border-b-[1px] border-gray-200">
        <UTooltip 
            text="Back to department list"
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
    <form 
        name="department"
        method="POST"
        enctype="multipart/form-data"
        @submit.prevent="getData"
        class="p-2 rounded-md">
        <div class="p-2 bg-white flex gap-3 flex-wrap rounded-md">
            <UFormGroup
                class="w-[calc(99%/2)]"
                label="Department Name"
                name="name">
                <UInput
                    type="text"
                    color="white"
                    variant="outline"
                    size="md"
                    name="name"
                    role="input"
                    minlength="3"
                    maxlength="100"
                    placeholder="enter department name as English language here..."/>
            </UFormGroup>
            <UFormGroup
                class="w-[calc(98.7%/2)]"
                label="Department Name (KH)"
                name="name_kh">
                <UInput
                    type="text"
                    color="white"
                    variant="outline"
                    size="md"
                    name="name_kh"
                    role="input"
                    placeholder="enter department name as Khmer language here..."/>
            </UFormGroup>
            <UFormGroup
                class="w-[calc(99%/2)]"
                label="Department Phone"
                name="phone_number">
                <UInput
                    type="text"
                    color="white"
                    variant="outline"
                    size="md"
                    name="phone_number"
                    role="input"
                    minlength="3"
                    maxlength="100"
                    placeholder="enter department contact phone here..."/>
            </UFormGroup>
            <UFormGroup
                class="w-[calc(98.7%/2)]"
                label="Department Email"
                name="email">
                <UInput
                    type="text"
                    color="white"
                    variant="outline"
                    size="md"
                    name="email"
                    role="input"
                    placeholder="enter department contact email here..."/>
            </UFormGroup>
            <UFormGroup
                class="w-[calc(99%/2)]"
                label="Description"
                name="description">
                <UTextarea 
                    type="text"
                    color="white" 
                    placeholder="Enter description here..."
                    name="description" 
                    role="input"
                    class="w-full"/>
            </UFormGroup>
            <UFormGroup
                class="w-[calc(98%/2)]"
                label="Addess"
                name="location">
                <UTextarea 
                    type="text"
                    color="white" 
                    placeholder="Enter address here..."
                    name="location" 
                    role="input"
                    class="w-full"/>
            </UFormGroup>
            <div
                class="w-full gap-3 flex items-center justify-end">
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
                    class="bg-red-500 text-white hover:bg-red-300 p-1 transition"/>
                <UButton
                    type="submit"
                    size="sm"
                    color="black"
                    label="Create Department"
                    variant="soft" 
                    :padded="false"
                    class="bg-blue-400 text-white hover:bg-blue-300 p-1 transition"/>
            </div>
        </div>
    </form>
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
    departmentId: number | null
}>(),{
    departmentId: null
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
 * Begin::Fetch data section
 */
const getData = async (event: Event): Promise<void> => {
    const formData: object = context.getDataForm(event as SubmitEvent) as object;
    if(props.departmentId != null)
    {
        await api.update(`department/${props.departmentId}`, true, formData) as ResponseStatus;
        emits('toggle', false);
    }
    else
    {
        const result: ResponseStatus = await api.post('department', true, formData) as ResponseStatus;
        if(!result.error)
        {
            emits('toggle', false);
            (event.target as HTMLFormElement).reset();
        }
    }
    emits('update:data');
}

const setData = async (): Promise<void> => {
    const result: ResponseStatus = await api.get(`department/${props.departmentId}`, false) as ResponseStatus;
    if(!result.error)
    {
        let timeout: NodeJS.Timeout = setTimeout((): void => {
            const form: HTMLFormElement = document.forms.namedItem('department') as HTMLFormElement;
            context.setData(form, result.data as Items);
            clearTimeout(timeout);
        },0);
    }
}

/**
 * End::Fetch data section
 */

onMounted(async (): Promise<void> => {
    if(props.departmentId){
        await setData();
    }
})
</script>