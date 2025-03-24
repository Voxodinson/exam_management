<template>
    <div
        class="bg-white p-2 flex items-center h-[45px] px-4 border-b-[1px] border-gray-200">
        <UTooltip 
            text="Back to shift list"
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
        class="bg-white rounded-md p-3 space-y-4">
        <div class="w-full flex gap-3 flex-wrap">
            <div class="w-[200px] h-[210px] border-[1px] border-gray-200 rounded-md overflow-hidden">
                <ChoosePhoto
                    name="photo"/>
            </div>
            <div class="w-[calc(98%-200px)] flex gap-3 flex-wrap">
                <UFormGroup
                    class="w-full"
                    label="Choose Role"
                    name="role_id">
                    <SelectMenu
                        name="role_id"
                        :options="[
                            {
                                id: 1,
                                name: 'Admin'
                            },
                            {
                                id: 2,
                                name: 'User'
                            }
                        ]"
                        option-attribute="name"
                        value-attribute="id"
                        id-attribute="id"
                        placeholder="Select role"/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(98%/2)]"
                    label="Username"
                    name="user_name">
                    <UInput
                        type="text"
                        color="white"
                        variant="outline"
                        size="md"
                        name="user_name"
                        role="input"
                        placeholder="enter username here..."/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(99%/2)]"
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
                <UDivider 
                    label="Login Information"
                    class="mt-3 text-green-400" />
                <UFormGroup
                    class="w-[calc(100%)]"
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
                    class="w-[calc(99%/2)]"
                    label="Password"
                    name="password">
                    <UInput
                        type="text"
                        color="white"
                        variant="outline"
                        size="md"
                        name="password"
                        role="input"
                        placeholder="enter password here..."/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(98%/2)]"
                    label="Confirm Password"
                    name="confirmation_password">
                    <UInput
                        type="text"
                        color="white"
                        variant="outline"
                        size="md"
                        name="confirmation_password"
                        role="input"
                        placeholder="enter confirm password here..."/>
                </UFormGroup>
            </div>        
        </div>
        <UFormGroup
            class="w-[99.5%]"
            label="Address"
            name="address">
            <UTextarea 
                color="white" 
                placeholder="Enter address..."
                name="address" />
        </UFormGroup>
        <div
            class="flex items-center justify-end">
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
import type { id } from "date-fns/locale";
/**
 * Begin::Set event trigger to parent component
 */
 const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();

const props = withDefaults(defineProps<{
    userId: number | null,
}>(),{
    userId: null,
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
    if(props.userId != null)
    {
        await api.update(`user/${props.userId}`, true, formData) as ResponseStatus;
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

// const fetchOption = async (): Promise<void> => {
//     const options: ResponseStatus = await api.get("setting/filter/user/list", false) as ResponseStatus;
//     if(!options.error)
//     {
//         dataOptions.value = options.data as unknown as Options;
//     }
// };
const setData = async (): Promise<void> => {
    const result: ResponseStatus = await api.get(`user/${props.userId}`, false) as ResponseStatus;
    console.log(result)
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
    // await fetchOption();
    if(props.userId != null)
    {
        await setData();
    }
})
</script>