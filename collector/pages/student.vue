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
        name="student"
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
                        name="department_id">
                        <SelectMenu
                            name="department_id"
                            :options="dataOptions.department"
                            option-attribute="name"
                            value-attribute="id"
                            id-attribute="id"
                            placeholder="Please select department"
                            required/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Major"
                        name="major_id">
                        <SelectMenu
                            name="major_id"
                            :options="dataOptions.major"
                            option-attribute="name"
                            value-attribute="id"
                            id-attribute="id"
                            placeholder="Please select major"
                            required/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Nationality"
                        name="nationality">
                        <SelectMenu
                            name="nationality"
                            :options="countries"
                            option-attribute="value"
                            value-attribute="value"
                            id-attribute="id"
                            placeholder="Please select nationality"
                            required/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="First Name"
                        name="first_name">
                        <UInput
                            type="text"
                            color="white"
                            variant="outline"
                            size="md"
                            name="first_name"
                            role="input"
                            placeholder="enter student first name here..."/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Last Name"
                        name="last_name">
                        <UInput
                            type="text"
                            color="white"
                            variant="outline"
                            size="md"
                            name="last_name"
                            role="input"
                            placeholder="enter student last name here..."/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Student Name (KH)"
                        name="name_kh">
                        <UInput
                            type="text"
                            color="white"
                            variant="outline"
                            size="md"
                            name="name_kh"
                            role="input"
                            placeholder="enter student name here..."/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(97%/3)]"
                        label="Date of Birth"
                        name="dob">
                        <UInput
                            type="text"
                            color="white"
                            variant="outline"
                            size="md"
                            name="dob"
                            role="input"
                            placeholder="enter email here..."/>
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
                        class="w-[calc(97%/3)]"
                        label="Choose Gender"
                        name="">
                        <URadioGroup
                            class="mt-3"
                            :ui="{
                                fieldset: 'w-full h-full items-center flex gap-6'
                            }"
                            v-model="selectGender"
                            :options="[
                                {
                                    value: 'male',
                                    label: 'Male'
                                }, 
                                {
                                    value: 'female',
                                    label: 'Female'
                                }
                            ]"/>
                    </UFormGroup>
                </div>      
                <UFormGroup
                    class="w-full"
                    label="Study Infomation (Class / Years / Shift)"
                    name="">
                    <div 
                        class="w-full flex gap-3">
                        <SelectMenu
                            name="class_id"
                            :options="dataOptions.class"
                            option-attribute="name"
                            value-attribute="id"
                            id-attribute="id"
                            placeholder="Please select class"
                            required
                            class="w-[calc(97%/3)]"/>
                        <SelectMenu
                            name="year_id"
                            :options="[
                                {
                                    id: 1,
                                    year: '1'
                                },
                                {
                                    id: 2,
                                    year: '2'
                                },
                                {
                                    id: 3,
                                    year: '3'
                                },
                                {
                                    id: 4,
                                    year: '5'
                                },
                            ]"
                            option-attribute="year"
                            value-attribute="year"
                            id-attribute="id"
                            placeholder="Year"
                            required
                            class="w-[calc(97%/3)]"/>
                        <SelectMenu
                            name="shift_id"
                            :options="dataOptions.shift"
                            option-attribute="name"
                            value-attribute="id"
                            placeholder="Shift"
                            id-attribute="id"
                            class="w-[calc(97%/3)]"/>
                    </div>
                </UFormGroup>  
                <UFormGroup
                    class="w-[99.5%] mt-3"
                    label="Address"
                    name="address">
                    <UTextarea 
                        color="white" 
                        placeholder="Enter address..."
                        name="address"
                        role="input"/>
                </UFormGroup>
                <div 
                    class="w-full pt-2 font-semibold">
                    <UDivider label="Login Account" />
                </div>
                <div 
                    class="w-full flex flex-wrap gap-2 p-2 rounded-md bg-gray-100">
                    <UFormGroup
                        class="w-[calc(99%/2)]"
                        label="Username / Gmail"
                        name="user_name">
                        <UInput
                            type="text"
                            color="white"
                            variant="outline"
                            size="md"
                            name="email"
                            role="input"
                            placeholder="enter username / gmail here..."/>
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
                            placeholder="enter email here..."/>
                    </UFormGroup>
                </div>
            </div>
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
 *Begin::Declare variable section  
 */ 
const countries: Ref<Items[]> = ref<Items[]>([
    { id: 1, value: 'Afghanistan' },
    { id: 2, value: 'Albania' },
    { id: 3, value: 'Algeria' },
    { id: 4, value: 'Andorra' },
    { id: 5, value: 'Angola' },
    { id: 6, value: 'Argentina' },
    { id: 7, value: 'Armenia' },
    { id: 8, value: 'Australia' },
    { id: 9, value: 'Austria' },
    { id: 10, value: 'Azerbaijan' },
    { id: 11, value: 'Bahamas' },
    { id: 12, value: 'Bahrain' },
    { id: 13, value: 'Bangladesh' },
    { id: 14, value: 'Barbados' },
    { id: 15, value: 'Belarus' },
    { id: 16, value: 'Belgium' },
    { id: 17, value: 'Belize' },
    { id: 18, value: 'Benin' },
    { id: 19, value: 'Bhutan' },
    { id: 20, value: 'Bolivia' },
    { id: 21, value: 'Bosnia and Herzegovina' },
    { id: 22, value: 'Botswana' },
    { id: 23, value: 'Brazil' },
    { id: 24, value: 'Brunei' },
    { id: 25, value: 'Bulgaria' },
    { id: 26, value: 'Burkina Faso' },
    { id: 27, value: 'Burundi' },
    { id: 28, value: 'Cambodia' },
    { id: 29, value: 'Cameroon' },
    { id: 30, value: 'Canada' },
    { id: 31, value: 'Cape Verde' },
    { id: 32, value: 'Central African Republic' },
    { id: 33, value: 'Chad' },
    { id: 34, value: 'Chile' },
    { id: 35, value: 'China' },
    { id: 36, value: 'Colombia' },
    { id: 37, value: 'Comoros' },
    { id: 38, value: 'Congo' },
    { id: 39, value: 'Costa Rica' },
    { id: 40, value: 'Croatia' },
    { id: 41, value: 'Cuba' },
    { id: 42, value: 'Cyprus' },
    { id: 43, value: 'Czech Republic' },
    { id: 44, value: 'Denmark' },
    { id: 45, value: 'Djibouti' },
    { id: 46, value: 'Dominica' },
    { id: 47, value: 'Dominican Republic' },
    { id: 48, value: 'Ecuador' },
    { id: 49, value: 'Egypt' },
    { id: 50, value: 'El Salvador' },
    { id: 51, value: 'Equatorial Guinea' },
    { id: 52, value: 'Eritrea' },
    { id: 53, value: 'Estonia' },
    { id: 54, value: 'Eswatini' },
    { id: 55, value: 'Ethiopia' },
    { id: 56, value: 'Fiji' },
    { id: 57, value: 'Finland' },
    { id: 58, value: 'France' },
    { id: 59, value: 'Gabon' },
    { id: 60, value: 'Gambia' },
    { id: 61, value: 'Georgia' },
    { id: 62, value: 'Germany' },
    { id: 63, value: 'Ghana' },
    { id: 64, value: 'Greece' },
    { id: 65, value: 'Guatemala' },
    { id: 66, value: 'Guinea' },
    { id: 67, value: 'Haiti' },
    { id: 68, value: 'Honduras' },
    { id: 69, value: 'Hungary' },
    { id: 70, value: 'Iceland' },
    { id: 71, value: 'India' },
    { id: 72, value: 'Indonesia' },
    { id: 73, value: 'Iran' },
    { id: 74, value: 'Iraq' },
    { id: 75, value: 'Ireland' },
    { id: 76, value: 'Israel' },
    { id: 77, value: 'Italy' },
    { id: 78, value: 'Jamaica' },
    { id: 79, value: 'Japan' },
    { id: 80, value: 'Jordan' },
    { id: 81, value: 'Kazakhstan' },
    { id: 82, value: 'Kenya' },
    { id: 83, value: 'Kuwait' },
    { id: 84, value: 'Kyrgyzstan' },
    { id: 85, value: 'Laos' },
    { id: 86, value: 'Latvia' },
    { id: 87, value: 'Lebanon' },
    { id: 88, value: 'Lesotho' },
    { id: 89, value: 'Liberia' },
    { id: 90, value: 'Libya' },
    { id: 91, value: 'Lithuania' },
    { id: 92, value: 'Luxembourg' },
    { id: 93, value: 'Madagascar' },
    { id: 94, value: 'Malawi' },
    { id: 95, value: 'Malaysia' },
    { id: 96, value: 'Maldives' },
    { id: 97, value: 'Mali' },
    { id: 98, value: 'Malta' },
    { id: 99, value: 'Mexico' },
    { id: 100, value: 'Mongolia' },
    { id: 101, value: 'Morocco' },
    { id: 102, value: 'Myanmar' },
    { id: 103, value: 'Namibia' },
    { id: 104, value: 'Nepal' },
    { id: 105, value: 'Netherlands' },
    { id: 106, value: 'New Zealand' },
    { id: 107, value: 'Nicaragua' },
    { id: 108, value: 'Niger' },
    { id: 109, value: 'Nigeria' },
    { id: 110, value: 'North Korea' },
    { id: 111, value: 'Norway' },
    { id: 112, value: 'Oman' },
    { id: 113, value: 'Pakistan' },
    { id: 114, value: 'Palestine' },
    { id: 115, value: 'Panama' },
    { id: 116, value: 'Peru' },
    { id: 117, value: 'Philippines' },
    { id: 118, value: 'Poland' },
    { id: 119, value: 'Portugal' },
    { id: 120, value: 'Qatar' },
    { id: 121, value: 'Romania' },
    { id: 122, value: 'Russia' },
    { id: 123, value: 'Saudi Arabia' },
    { id: 124, value: 'South Africa' },
    { id: 125, value: 'South Korea' },
    { id: 126, value: 'Spain' },
    { id: 127, value: 'Sri Lanka' },
    { id: 128, value: 'Sudan' },
    { id: 129, value: 'Sweden' },
    { id: 130, value: 'Switzerland' },
    { id: 131, value: 'Thailand' },
    { id: 132, value: 'Turkey' },
    { id: 133, value: 'Ukraine' },
    { id: 134, value: 'United Arab Emirates' },
    { id: 135, value: 'United Kingdom' },
    { id: 136, value: 'United States' },
    { id: 137, value: 'Vietnam' },
    { id: 138, value: 'Zambia' },
    { id: 139, value: 'Zimbabwe' }
]);

/**
 * End::Declare variable section
 */
/**
 * Begin::Declare variables object section
 */
const dataOptions: Ref<Options> = ref<Options>({});
const api: ContextAPI = new ContextAPI(new SimpleAPI());
const context: GetDataContext = new GetDataContext(new GetDataNormalForm());
const selectGender: Ref<string> = ref<string>('');
/**
 * End::Declare variables object section
 */

/**
 * Begin::Fetch data section
 */
 const getData = async (event: Event): Promise<void> => {
    const formData: any = context.getDataFormFileBase64(event as SubmitEvent) as any;
    console.log(formData);
    formData.gender = selectGender.value as string;
    if(props.studentId != null)
    {
        await api.update(`student/${props.studentId}`, true, formData) as ResponseStatus;
    }
    else
    {
        const result: ResponseStatus = await api.post('student', true, formData) as ResponseStatus;
        if(!result.error)
        {
            emits('toggle', false);
            (event.target as HTMLFormElement).reset();
        }
    }
    emits('update:data');
}

const fetchOption = async (): Promise<void> => {
    const options: ResponseStatus = await api.get("setting/filter/student", false) as ResponseStatus;
    if(!options.error)
    {
        dataOptions.value = options.data as unknown as Options;
    }
    console.log(dataOptions.value);
};
const setData = async (): Promise<void> => {
    const result: ResponseStatus = await api.get(`student/${props.studentId}`, false) as ResponseStatus;
    if(!result.error)
    {
        let timeout: NodeJS.Timeout = setTimeout((): void => {
            const form: HTMLFormElement = document.forms.namedItem('student') as HTMLFormElement;
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
        await setData();
    }
})
</script>