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
        <div 
            class="w-full h-fit flex gap-3 pb-6 items-center justify-center p-2 bg-white rounded-md">
            <div 
                class=" flex flex-col gap-3 p-3 border-[1px] border-gray-200 bg-gray-50 items-center w-full justify-center h-fit rounded-md">
                <div class="w-[250px] h-[250px] rounded-full border-[1px] border-gray-200 overflow-hidden relative group">
                    <img 
                        :src="String(data.img_link_url) || UserImage" 
                        alt=""
                        class="w-full h-full object-cover">
                    <UIcon
                        name="streamline:interface-user-edit-actions-close-edit-geometric-human-pencil-person-single-up-user-write"
                        class="w-6 h-6 hover:scale-110 transition cursor-pointer absolute top-2 right-2 p-2 text-white group-hover:opacity-100 opacity-30"/>
                </div>
                <div class="w-full flex flex-col items-center justify-center">
                    <h3
                        class=" font-medium text-[1.2rem] text-gray-600">
                        {{ data.name_kh }} - {{ data.first_name }} {{ data.last_name }}
                    </h3>
                    <p
                        class="text-gray-400">
                        {{ data.department_name }} - {{ data.major_name }} - {{ data.class_name }} - {{ data.shift_name }}
                    </p>
                </div>
                <ul
                    class="w-full mt-3 *:w-full *:flex *:items-start *:px-2 flex flex-col gap-3 *:justify-between *:border-b-[1px] *:border-gray-200 ">
                    <li
                        class="w-full border-none bg-blue-100 rounded-md p-2">
                        <span
                            class="font-semibold capitalize">
                            Personal Information
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="material-symbols:grid-3x3-rounded"
                                class="w-6 h-6 text-gray-400"/>
                            Code :
                        </span>
                        <span>
                            {{ data.code }}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="mdi:gender-male"
                                class="w-6 h-6 text-gray-400"/>
                            Gender :
                        </span>
                        <span>
                            {{ data.gender === 'female' ? 'F - ស្រី' : 'M​​ ​- ប្រុស'}}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="mdi:earth"
                                class="w-6 h-6 text-gray-400"/>
                            Nationality :
                        </span>
                        <span>
                            {{ data.nationality}}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="uil:calender"
                                class="w-6 h-6 text-gray-400"/>
                            Date of Birth :
                        </span>
                        <span>
                            {{ data.dob }}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="material-symbols:contact-phone"
                                class="w-6 h-6 text-gray-400"/>
                            Contact :
                        </span>
                        <span>
                           <span>
                                {{ data.email }}
                           </span>
                           <span
                                class="block text-end">
                                {{ data.phone }}
                           </span>
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="gridicons:status"
                                class="w-6 h-6 text-gray-400"/>
                            Bio :
                        </span>
                        <span>
                            {{ data.address ? data.address : '- - - - - - - - - - - - - - -' }}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="material-symbols:location-on-outline"
                                class="w-6 h-6 text-gray-400"/>
                            Address :
                        </span>
                        <span>
                            {{ data.bio ? data.bio : '- - - - - - - - - - - - - - -' }}
                        </span>
                    </li>
                    <li
                        class="w-full border-none mt-3 bg-blue-100 rounded-md p-2">
                        <span
                            class="font-semibold capitalize">
                            School Information
                        </span>
                    </li>
                    <li
                        class="border-none">
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="ph:identification-card-light"
                                class="w-6 h-6 text-gray-400"/>
                            Study Information :
                        </span>
                        <span>
                            {{ data.department_name }} - {{ data.major_name }} - {{ data.class_name }} - {{ data.shift_name }}
                        </span>
                    </li>
                    <li
                        class="w-full border-none mt-3 bg-blue-100 rounded-md p-2">
                        <span
                            class="font-semibold capitalize">
                            System Information
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="material-symbols:account-circle-full"
                                class="w-6 h-6 text-gray-400"/>
                            Created By :
                        </span>
                        <span>
                            {{ data.created_by ? data.created_by : '- - - - - - - - - - - - - - -' }}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="material-symbols:alarm-on-outline"
                                class="w-6 h-6 text-gray-400"/>
                            Created At :
                        </span>
                        <span>
                            {{ data.created_at ? data.created_at : '- - - - - - - - - - - - - - -' }}
                        </span>
                    </li>
                    <li>
                        <span
                            class="font-meduim flex items-center gap-3">
                            <UIcon
                                name="material-symbols:edit-outline"
                                class="w-6 h-6 text-gray-400"/>
                            Updated At :
                        </span>
                        <span>
                            {{ data.updated_at ? data.updated_at : '- - - - - - - - - - - - - - -' }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script setup lang="ts">
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import type {
    ResponseStatus,
    Items
} from "@/models/type";
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
    student_id: number | null
}>(),{
    student_id: null
});
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variables object section
 */
const api: ContextAPI = new ContextAPI(new SimpleAPI());
/**
 * End::Declare variables object section
 */

/**
 *Begin:: Declare variable section  
 */ 
const data: Ref<Items> = ref<Items>({});
/**
 * End: Declare variable section
 */
/**
 * Begin::Fetch data section
 */
 const fetchData = async (): Promise<void> => {
    const result: ResponseStatus = await api.get(`student/${props.student_id}`, false) as ResponseStatus;
    if(!result.error)
    {
        data.value = result.data as Items;
    }
}
/**
 * End::Fetch data section
 */

onMounted(async (): Promise<void> => {
    if(props.student_id){
        await fetchData();
    }
})
</script>