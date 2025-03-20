<template>
    <div
        class="h-[100vh] w-full">
        <img
            :src="BackgroundLogin"
            alt="Logo"
            class="object-cover w-full h-full opacity-90"
            loading="lazy" />
    </div>
    <div class="w-full h-[100vh] overflow-auto absolute top-0 right-0 flex items-center justify-center"> 
        <div class="w-1/2">
            <form
                name="user"
                method="POST"
                enctype="multipart/form-data"
                @submit.prevent="getData"
                class="bg-white w-full border-[1px] relative border-gray-[1px] rounded-md p-3 space-y-4">
                <img 
                    :src="Technology" 
                    alt=""
                    class="w-[500px] h-[500px] opacity-20 absolute bottom-[10px] right-[10px]">
                <div class="w-full flex items-center justify-center flex-col gap-3 flex-wrap">
                    <div class="w-[200px] h-[200px] rounded-full overflow-hidden border-[1px] border-gray-200">
                        <ChoosePhoto
                            name="photo"/>
                    </div>
                    <div class="w-full flex gap-3 flex-wrap">
                        <UFormGroup
                            class="w-[calc(98%/2)]"
                            label="Department"
                            name="department_id">
                            <SelectMenu
                                name="department_id"
                                :options="[]"
                                option-attribute="name"
                                value-attribute="id"
                                id-attribute="id"
                                placeholder="Select department"/>
                        </UFormGroup>
                        <UFormGroup
                            class="w-[calc(98%/2)]"
                            label="Major"
                            name="major_id">
                            <SelectMenu
                                name="major_id"
                                :options="[]"
                                option-attribute="name"
                                value-attribute="id"
                                id-attribute="id"
                                placeholder="Select major"/>
                        </UFormGroup>
                        <UFormGroup
                            class="w-full"
                            label="Class"
                            name="class_id">
                            <SelectMenu
                                name="class_id"
                                :options="[]"
                                option-attribute="name"
                                value-attribute="id"
                                id-attribute="id"
                                placeholder="Select class"/>
                        </UFormGroup>
                        <UFormGroup
                            class="w-full"
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
                            class="w-full"
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
                            class="w-full"
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
                            class="w-full"
                            label="Password"
                            name="">
                            <UInput
                                type="text"
                                color="white"
                                variant="outline"
                                size="md"
                                name=""
                                role="input"
                                placeholder="enter password here..."/>
                        </UFormGroup>
                        <UFormGroup
                            class="w-full"
                            label="Confirm Password"
                            name="">
                            <UInput
                                type="text"
                                color="white"
                                variant="outline"
                                size="md"
                                name=""
                                role="input"
                                placeholder="enter confirm password here..."/>
                        </UFormGroup>
                    </div>        
                </div>
                <div
                    class="flex items-center justify-end">
                    <UButton
                        type="submit"
                        size="md"
                        color="black"
                        label="Register Now"
                        variant="soft" 
                        :padded="false"
                        class="bg-blue-400 text-white hover:bg-blue-300 py- px-4 transition"/>
                </div>
            </form>
        </div>
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
    Options,
    Items
} from "@/models/type";
import { 
    BackgroundLogin,
    Technology 
} from "@/assets/images";
import { 
    SelectMenu,
    ChoosePhoto
} from "@/components/ui";

definePageMeta({
    layout: 'login',
    colorMode: 'light'
});

useSeoMeta({
  title: 'Login'
});
/**
 * Begin::Set event trigger to parent component
 */

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
        const result: ResponseStatus = await api.post('student', true, formData) as ResponseStatus;
    if(!result.error)
    {
        (event.target as HTMLFormElement).reset();
    }
}

const fetchOption = async (): Promise<void> => {
    const options: ResponseStatus = await api.get("setting/filter/user/list", false) as ResponseStatus;
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
})
</script>