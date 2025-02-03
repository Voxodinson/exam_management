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
    <form
        name="user"
        method="POST"
        enctype="multipart/form-data"
        @submit.prevent="getData"
        class="rounded-md p-2 space-y-4">
        <div 
            class="w-full p-2 rounded-md bg-white">
            <div class="w-full flex gap-3 flex-wrap">
                <div class="w-[200px] h-[210px] border-[1px] border-gray-200 rounded-md overflow-hidden">
                    <ChoosePhoto
                        name="photo"/>
                </div>
                <div class="w-[calc(98%-200px)] flex gap-3 flex-wrap">
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Department"
                        name="role_id">
                        <SelectMenu
                            name="role_id"
                            :options="dataOptions.roles"
                            option-attribute="name"
                            value-attribute="id"
                            placeholder="Please select department"
                            required/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Major"
                        name="">
                        <SelectMenu
                            name=""
                            :options="[]"
                            option-attribute="name"
                            value-attribute="id"
                            placeholder="Please select major"
                            required/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Nationality"
                        name="">
                        <SelectMenu
                            name=""
                            :options="[]"
                            option-attribute="name"
                            value-attribute="id"
                            placeholder="Please select nationality"
                            required/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Student Name (EN)"
                        name="user_name">
                        <UInput
                            type="text"
                            color="white"
                            variant="outline"
                            size="md"
                            name="user_name"
                            role="input"
                            placeholder="enter student name here..."/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Student Name (KH)"
                        name="user_name">
                        <UInput
                            type="text"
                            color="white"
                            variant="outline"
                            size="md"
                            name="user_name"
                            role="input"
                            placeholder="enter student name here..."/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Phone"
                        name="phone">
                        <UInput
                            type="text"
                            color="white"
                            variant="outline"
                            size="md"
                            name="phone"
                            role="input"
                            placeholder="enter phone here..."/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Email"
                        name="email">
                        <UInput
                            type="text"
                            color="white"
                            variant="outline"
                            size="md"
                            name="email"
                            role="input"
                            placeholder="enter email here..."/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(99%-33%)]"
                        label="Study Infomation (Class / Years / Shift)"
                        name="">
                        <div 
                            class="w-full flex gap-3">
                            <UInput
                                type="text"
                                color="white"
                                variant="outline"
                                size="md"
                                name=""
                                role="input"
                                placeholder="Class"
                                class="w-[calc(97%/3)]"/>
                            <SelectMenu
                                name=""
                                :options="[]"
                                option-attribute="name"
                                value-attribute="id"
                                placeholder="Major"
                                required
                                class="w-[calc(97%/3)]"/>
                            <SelectMenu
                                name=""
                                :options="[]"
                                option-attribute="name"
                                value-attribute="id"
                                placeholder="Shift"
                                required
                                class="w-[calc(97%/3)]"/>
                        </div>
                    </UFormGroup>
                </div>        
            </div>
            <UFormGroup
                class="w-[99.5%] mt-3"
                label="Address"
                name="address">
                <UTextarea 
                    color="white" 
                    placeholder="Enter address..."
                    name="address" />
            </UFormGroup>
            <div
                class="flex items-center justify-end mt-3">
                <div
                    class="flex items-center gap-x-2">
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
                        label="Create User"
                        variant="soft" 
                        :padded="false"
                        class="bg-blue-400 text-white hover:bg-blue-300 p-1 transition"/>
                </div>
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
    Options,
    Items
} from "@/models/type";
import { 
    SelectMenu,
    ChoosePhoto
} from "@/components/ui";

/**
 * Begin::Set event trigger to parent component
 */
 const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();

const props = withDefaults(defineProps<{
    studentId: number | null,
}>(),{
    studentId: null,
});
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variables object section
 */
const dataOptions: Ref<Options> = ref<Options>({});
const api: ContextAPI = new ContextAPI(new SimpleAPI());
const context: GetDataContext = new GetDataContext(new GetDataNormalForm());
/**
 * End::Declare variables object section
 */

/**
 * Begin::Fetch data section
 */
 const getData = async (event: Event): Promise<void> => {
    const formData: object = context.getDataFormFileBase64(event as SubmitEvent) as object;
    console.log(formData)
    if(props.studentId != null)
    {
        await api.update(`user/${props.studentId}`, true, formData) as ResponseStatus;
    }
    else
    {
        const result: ResponseStatus = await api.post('user', true, formData) as ResponseStatus;
        if(!result.error)
        {
            emits('toggle', false);
            (event.target as HTMLFormElement).reset();
        }
    }
    emits('update:data');
}

const fetchOption = async (): Promise<void> => {
    const options: ResponseStatus = await api.get("setting/filter/user/list", false) as ResponseStatus;
    if(!options.error)
    {
        dataOptions.value = options.data as unknown as Options;
    }
};
const setData = async (): Promise<void> => {
    const result: ResponseStatus = await api.get(`user/${props.studentId}`, false) as ResponseStatus;
    if(!result.error)
    {
        let timeout: NodeJS.Timeout = setTimeout((): void => {
            const form: HTMLFormElement = document.forms.namedItem('user') as HTMLFormElement;
            context.setDataWithFile(form, result.data as Items);
            console.log(result.data)
            clearTimeout(timeout);
        },0);
    }
 }
/**
 * End::Fetch data section
 */
onMounted(async (): Promise<void> => {
    await fetchOption();
    if(props.studentId)
    {
        // await setData();
    }
})
</script>