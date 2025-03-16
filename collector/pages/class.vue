<template>
    <div
        class="bg-white p-2 flex items-center h-[45px] px-4 border-b-[1px] border-gray-200">
        <UTooltip 
            text="Back to class list"
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
        name="class"
        method="POST"
        enctype="multipart/form-data"
        @submit.prevent="getData"
        class="p-2 rounded-md">
        <div class="p-2 bg-white flex gap-3 flex-wrap rounded-md">
            <UFormGroup
                class="w-[calc(98%/3)]"
                label="Department"
                name="department_id">
                <SelectMenu
                    name="department_id"
                    :options="dataOptions.department"
                    value-attribute="id"
                    option-attribute="name"
                    id-attribute="id"
                    placeholder="please select department"
                    class="w-full"/>
            </UFormGroup>
            <UFormGroup
                class="w-[calc(98%/3)]"
                label="Major"
                name="major_id">
                <SelectMenu
                    name="major_id"
                    :options="dataOptions.major"
                    value-attribute="id"
                    option-attribute="name"
                    id-attribute="id"
                    placeholder="please select major"
                    class="w-full"/>
            </UFormGroup>
            <UFormGroup
                class="w-[calc(97%/3)]"
                label="Shift Time"
                name="">
                <SelectMenu
                    name=""
                    :options="[]"
                    value-attribute="id"
                    option-attribute="name"
                    id-attribute="id"
                    placeholder="please select shift for class"
                    class="w-full"/>
            </UFormGroup>
            <UFormGroup
                class="w-[calc(98%/3)]"
                label="Class Name (EN)"
                name="name">
                <UInput
                    type="text"
                    color="white"
                    variant="outline"
                    size="md"
                    name="name"
                    role="input"
                    minlength="2"
                    maxlength="50"
                    placeholder="enter class code here..."/>
            </UFormGroup>
            <UFormGroup
                class="w-[calc(98%/3)]"
                label="Class Name (KH)"
                name="name_kh">
                <UInput
                    type="text"
                    color="white"
                    variant="outline"
                    size="md"
                    name="name_kh"
                    role="input"
                    minlength="2"
                    maxlength="50"
                    placeholder="enter class code here..."/>
            </UFormGroup>
            <UFormGroup
                class="w-[calc(97%/3)]"
                label="Class Code"
                name="room">
                <UInput
                    type="text"
                    color="white"
                    variant="outline"
                    size="md"
                    name="room"
                    role="input"
                    minlength="2"
                    maxlength="50"
                    placeholder="enter class code here..."/>
            </UFormGroup>
            <UFormGroup
                class="w-full"
                label="Description"
                name="description">
                <UTextarea 
                    color="white" 
                    placeholder="Enter description here..."
                    name="description" 
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
                    label="Create Class"
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
    Items,
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
    classId: number | null
}>(),{
    classId: null
});
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variables object section
 */
const api: ContextAPI = new ContextAPI(new SimpleAPI());
const context: GetDataContext = new GetDataContext(new GetDataNormalForm());
const dataOptions: Ref<Options> = ref<Options>({});
/**
 * End::Declare variables object section
 */

/**
 * Begin::Fetch data section
 */
const getData = async (event: Event): Promise<void> => {
    const formData: object = context.getDataForm(event as SubmitEvent) as object;
    if(props.classId != null)
    {
        await api.update(`class/${props.classId}`, true, formData) as ResponseStatus;
    }
    else
    {
        const result: ResponseStatus = await api.post('class', true, formData) as ResponseStatus;

        if(!result.error)
        {
            emits('toggle', false);
            (event.target as HTMLFormElement).reset();
        }
    }
    emits('update:data');
}

const setData = async (): Promise<void> => {
    const result: ResponseStatus = await api.get(`class/${props.classId}`, false) as ResponseStatus;
    if(!result.error)
    {
        let timeout: NodeJS.Timeout = setTimeout((): void => {
            const form: HTMLFormElement = document.forms.namedItem('class') as HTMLFormElement;
            context.setData(form, result.data as Items);
            clearTimeout(timeout);
        },0);
    }
}

const fetchOption = async (): Promise<void> => {
    const options: ResponseStatus = await api.get("setting/option/class") as ResponseStatus;
    if(!options.error)
    {
        dataOptions.value = options.data as unknown as Options;
    }
};
/**
 * End::Fetch data section
 */

onMounted(async (): Promise<void> => {
    await fetchOption();
    if(props.classId){
        await setData();
    }
})
</script>