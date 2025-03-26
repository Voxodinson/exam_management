<template>
    <template v-if="openCreate">
        <Student
            :student-id="studentId"
            @toggle="toggleCreate"
            @update:data="fetchData"/>
    </template>
    <template v-else-if="openDetails"> 
        <StudentInfomation
            :student_id="studentId"
            @toggle="toggleStudentInfo"/>
    </template>
    <template v-else>
        <div 
            class="flex items-center justify-between h-[45px] px-4 bg-white border-b-[1px] border-gray-200">
            <UBreadcrumb 
                :links="linksItem"
                divider="/"
                :ui="{
                    base: 'font-semibold text-[.8rem]',
                    inactive: 'hover:text-blue-200',
                    active: 'text-blue-400',}"/>
            <div 
                class=" flex gap-2 items-center justify-center h-full">
                <UInput
                    icon="material-symbols:search"
                    type="text"
                    color="white"
                    variant="outline"
                    size="sm"
                    name="district"
                    role="input"
                    placeholder="Search name here..."
                    class="w-[400px]"
                    @input="async (event: Event): Promise<void> => {
                        const value: string = (event?.target as HTMLInputElement)?.value;
                        await searchData(value);
                    }"/>
                <UTooltip 
                    text="Create new student"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        icon="material-symbols:add-circle-outline-rounded"
                        size="sm"
                        color="black"
                        label="New Student"
                        variant="soft" 
                        :padded="false"
                        @click="()=>{
                            toggleCreate(true);
                        }"
                        class="bg-[#3A6D8C] hover:bg-gray-200 text-white hover:text-black p-1.5 transition"/>
                </UTooltip>
                <UTooltip 
                    :text="isOpenFilter ? 'Close Filters' : 'Open Filters'"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        :icon="isOpenFilter ? 'material-symbols:close-rounded' : 'material-symbols:filter-alt-outline'"
                        size="sm"
                        color="black"
                        variant="soft" 
                        :padded="false"
                        @click="()=>{
                            toggle();
                        }"
                        class="bg-[#3A6D8C] hover:bg-gray-200 text-white hover:text-black p-1.5 transition"/>
                </UTooltip>
            </div>
        </div>
        <div 
            class="w-full p-2 ">
            <div 
                v-if="isOpenFilter"
                class="w-full flex flex-col gap-2 bg-white rounded-md p-2 mb-2" >
                <div 
                    class="w-full flex justify-between flex-wrap gap-3">
                    <div 
                        class="flex w-full flex-wrap gap-2">
                        <UFormGroup
                            class="w-[calc(98%/4)]"
                            label="Departments"
                            name="">
                            <SelectMenu
                                name=""
                                :options="dataOptions.department"
                                value-attribute="id"
                                option-attribute="name"
                                id-attribute="id"
                                placeholder="Select a department"
                                class="w-full"
                                @update:model-value="async (value: Items): Promise<void> => {
                                    if(value?.id){
                                        filters.deprtment_id = Number(value.id);
                                    }
                                    else{
                                        filters.deprtment_id = '';
                                    }
                                    await fetchData(Number($route.query.page_no) || 1);
                                }"
                                :model-value="filters.deprtment_id"/>
                        </UFormGroup>
                        <UFormGroup
                            class="w-[calc(98%/4)]"
                            label="Class"
                            name="">
                            <SelectMenu
                                name=""
                                :options="dataOptions.class"
                                value-attribute="id"
                                option-attribute="name"
                                id-attribute="id"
                                placeholder="Select a class"
                                class="w-full"
                                @update:model-value="async (value: Items): Promise<void> => {
                                    if(value?.id){
                                        filters.class_id = Number(value.id);
                                    }
                                    else{
                                        filters.class_id = '';
                                    }
                                    await fetchData(Number($route.query.page_no) || 1);
                                }"
                                :model-value="filters.class_id"/>
                        </UFormGroup>  
                        <UFormGroup
                            class="w-[calc(98%/4)]"
                            label="Shift Time"
                            name="">
                            <SelectMenu
                                name=""
                                :options="dataOptions.shift"
                                value-attribute="id"
                                option-attribute="name"
                                id-attribute="id"
                                placeholder="Select a shift"
                                class="w-full"
                                @update:model-value="async (value: Items): Promise<void> => {
                                    if(value?.id){
                                        filters.shift_id = Number(value.id);
                                    }
                                    else{
                                        filters.shift_id = '';
                                    }
                                    await fetchData(Number($route.query.page_no) || 1);
                                }"
                                :model-value="filters.shift_id"/>
                        </UFormGroup>  
                        <UFormGroup
                            class="w-[calc(97.5%/4)]"
                            label="Nationality"
                            name="">
                            <SelectMenu
                                name=""
                                :options="dataOptions.nationality"
                                value-attribute="id"
                                option-attribute="name"
                                id-attribute="id"
                                placeholder="Select a nationality"
                                class="w-full"
                                @update:model-value="async (value: Items): Promise<void> => {
                                    if(value?.id){
                                        filters.nationality = Number(value.value);
                                    }
                                    else{
                                        filters.nationality = '';
                                    }
                                    await fetchData(Number($route.query.page_no) || 1);
                                }"
                                :model-value="filters.nationality"/>
                        </UFormGroup>  
                    </div>
                </div>
            </div>
            <div 
                class="w-full overflow-x-auto bg-white rounded-md overflow-hidden">
                <Table
                    :columns="columns"
                    :data="data"
                    is-custom
                    v-slot="{ data }"
                    @update:data="async (current_page: number): Promise<void> => {
                        
                    }">
                    <tr
                        class="*:px-2.5 *:py-1.5 hover:bg-gray-100 cursor-pointer">
                        <td>
                            <div 
                                @click="(): void => {
                                    studentId = data.id as number;
                                    if(studentId){
                                        toggleStudentInfo(true);
                                    }
                                }"
                                class="w-[60px] h-[60px] overflow-hidden rounded-full border-[1px] border-gray-200">
                                <img 
                                    :src="data.img_link_url || UserImage" 
                                    alt=""
                                    class="w-full h-full object-cover hover:scale-110 transition">
                            </div>
                        </td>
                        <td
                            class="w-[150px]">
                            <span>
                                {{ data.code }}
                            </span>
                        </td>
                        <td>
                            <span>{{ data.first_name || '-----' }} {{ data.last_name || '-----' }}</span>
                        </td>
                        <td>
                            <span>{{ data.name_kh || '-----' }}</span>
                        </td>
                        <td>
                            <span>{{ data.dob || '-----' }}</span>
                        </td>
                        <td>
                            <span>
                                {{ data.gender === 'female' ? 'F (ស្រី)' : 'M​​ ​(ប្រុស)'}}
                            </span>
                        </td>
                        <td>
                            <span>{{ data.nationality || '-----' }}</span>
                        </td>
                        <td>
                            <UDropdown 
                                :items="[
                                    [
                                        {
                                            label: 'Edit Student',
                                            iconClass: 'text-green-500',
                                            class: 'text-green-500',
                                            icon: 'streamline:interface-user-edit-actions-close-edit-geometric-human-pencil-person-single-up-user-write',
                                            click: () => {
                                                studentId = data.id as number;
                                                if(studentId){
                                                    toggleCreate(true);
                                                }
                                            }
                                        }
                                    ],
                                    [
                                        {
                                            label: 'Views Student Info',
                                            iconClass: 'text-blue-500',
                                            class: 'text-blue-500',
                                            icon: 'material-symbols:folder-eye-outline',
                                            click: () => {
                                                studentId = data.id as number;
                                                if(studentId){
                                                    toggleStudentInfo(true);
                                                }
                                            }
                                        }
                                    ], 
                                    [
                                        {
                                            label: `Delete ${data.name}`,
                                            icon: 'i-heroicons-trash-20-solid',
                                            iconClass: 'text-red-500',
                                            class: 'text-red-500',
                                            click: async (): Promise<void> => {
                                                Confirm(`Do you want to student ${data.name} name?`, async (): Promise<void> => {
                                                    const result = await api.delete(`student/${data.id}`, true, {}) as ResponseStatus;
                                                    if (!result.error) {
                                                        await fetchData();
                                                    }
                                                });

                                            }
                                        }
                                    ]
                                ]" 
                                :popper="{ placement: 'bottom-start' }">
                                <UButton 
                                    color="white"
                                    trailing-icon="i-heroicons-chevron-down-20-solid" />
                            </UDropdown>
                        </td>
                    </tr>
                </Table>
            </div>
        </div>
    </template>
</template>
  
<script lang="ts" setup>
import { 
    Table,
    SelectMenu
} from '@/components/ui';
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import type {
    Column,
    Items,
    Options,
    ResponseStatus,
} from "@/models/type";
import { 
    UserImage 
} from '@/assets/images';
import { 
    Student
} from '@/collector/pages';
import { 
    Confirm 
} from '@/utils/dialog';
import { 
    StudentInfomation 
} from '@/sections';
definePageMeta({
    colorMode: 'light'
});

/**
 * Begin::Declare variable object section
 */
 const api: ContextAPI = new ContextAPI(new SimpleAPI());
/**
 * End::Declare variable object section
 */

/**
 * Begin::Declare some variable section
 */
const dataOptions: Ref<Options> = ref<Options>({});
const data: Ref<object> = ref<object>({});
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const filters: Ref<Items> = ref<Items>({
    department_id: '',
    shift_id: '',
    class_id: '',
    major_id: '',
    nationality: ''
});
const isOpenFilter: Ref<boolean> = ref<boolean>(false);
const openCreate: Ref<boolean> = ref<boolean>(false);
const openDetails: Ref<boolean> = ref<boolean>(false);
const studentId: Ref<number | null> = ref<number | null>(null);
const linksItem = [
    {
        label: 'School Management'
    },
    {
        label: 'Student List',
        to: '/student_list'
    }
];
const columns: Ref<Column[]> = ref<Column[]>([
    {
        title: "Profile"
    },
    {
        title:'STU ID',
    },
    {
        title:'Full Name',
    },
    {
        title: 'Name (KH)',
    },
    {
        title: 'Date of Birth'
    },
    {
        title: "Gender"
    },
    {
        title: "Nationality"
    },
    {
        title: "Action"
    }
 ]);
 /**
 * End::Declare some variable section
 */

/**
 * Begin::Fetch data section
 */
 const fetchData = async (current_page: number = 1,per_page: number = 10, search: string = ''): Promise<void> => {
    let url: string = `student?per_page=${per_page}&page_no=${current_page}&department_id=${filters.value.department_id}&major_id=${filters.value.major_id}&class_id=${filters.value.class_id}&nationality=${filters.value.nationality}&shift_id=${filters.value.shift_id}`;
    if(search)
    {
        url += `&search=${search}`;
    }
    const result: ResponseStatus = await api.get(url, false) as ResponseStatus;
    if(!result.error)
    {
        data.value = result as object;
    }
}

const fetchOption = async (): Promise<void> => {
    const options: ResponseStatus = await api.get("setting/filter/student") as ResponseStatus;
    if(!options.error)
    {
        dataOptions.value = options.data as unknown as Options;
    }
};

const searchData = async (value: string): Promise<void> => {
    if(timeout.value)
    {
        clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(async (): Promise<void> => {
        await fetchData(1, 10, value);
    }, 250);
}
/**
 * End::Fetch data section
 */
 watch((): boolean => openCreate.value || openDetails.value, async (value: boolean): Promise<void> => {
    if(!value)
    {
        studentId.value = null;
    }
});
/**
 * Begin::Some logical in this component
 */
 const toggle = (): void => {
    isOpenFilter.value = !isOpenFilter.value as boolean;
}
const toggleCreate = (value: boolean): void => {
    openCreate.value = value as boolean;
}
const toggleStudentInfo = (value: boolean): void => {
    openDetails.value = value as boolean;
}
/**
 * End::Some logical in this component
 */

onMounted(async (): Promise<void> => {
    await fetchOption();
    await fetchData();
})
</script>