<template>
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
                class="w-[400px]"/>
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
                            :options="[]"
                            value-attribute="id"
                            option-attribute="name"
                            id-attribute="id"
                            placeholder="Select a department"
                            class="w-full"/>
                    </UFormGroup>
                    <UFormGroup
                        class="w-[calc(98%/4)]"
                        label="Class"
                        name="">
                        <SelectMenu
                            name=""
                            :options="[]"
                            value-attribute="id"
                            option-attribute="name"
                            id-attribute="id"
                            placeholder="Select a class"
                            class="w-full"/>
                    </UFormGroup>  
                    <UFormGroup
                        class="w-[calc(98%/4)]"
                        label="Shift Time"
                        name="">
                        <SelectMenu
                            name=""
                            :options="[]"
                            value-attribute="id"
                            option-attribute="name"
                            id-attribute="id"
                            placeholder="Select a shift"
                            class="w-full"/>
                    </UFormGroup>  
                    <UFormGroup
                        class="w-[calc(97.5%/4)]"
                        label="Nationality"
                        name="">
                        <SelectMenu
                            name=""
                            :options="[]"
                            value-attribute="id"
                            option-attribute="name"
                            id-attribute="id"
                            placeholder="Select a nationality"
                            class="w-full"/>
                    </UFormGroup>  
                </div>
            </div>
        </div>
        <div 
            class="w-full bg-white rounded-md overflow-hidden">
            <Table
                :columns="columns"
                :data="datas"
                is-custom
                v-slot="{ data }"
                @update:data="async (current_page: number): Promise<void> => {
                    
                }">
                <tr 
                    class="*:px-2.5 *:py-1.5 hover:bg-gray-100 cursor-pointer">
                    <td
                        class="w-[150px]">
                        <span>
                            {{ data.stu_id }}
                        </span>
                    </td>
                    <td>
                        <div class="w-[60px] h-[60px] overflow-hidden rounded-full border-[1px] border-gray-200">
                            <img 
                                :src="data.image_url || UserImage" 
                                alt=""
                                class="w-full h-full object-cover">
                        </div>
                    </td>
                    <td>
                        <span>{{ data.fullname }}</span>
                    </td>
                    <td>
                        <span>{{ data.dob }}</span>
                    </td>
                    <td>
                        <span>{{ data.gender }}</span>
                    </td>
                    <td>
                        <span>{{ data.nationality }}</span>
                    </td>
                    <td>
                        <span
                            class="text-[.9rem]">
                            {{ data.class }} 
                            - <span v-if="data.year">Y{{ data.year }}</span>
                            <span v-else>-</span>
                            - {{ data.shift }}
                        </span>
                    </td>
                    <td class="w-[230px]">
                        <div class="*:text-[.9rem]">
                            <span>
                                {{ data.phone }}
                            </span>
                            <span 
                                class="block">
                                {{ data.gmail }}
                            </span>
                        </div>
                    </td>
                    <td>
                        <UDropdown 
                            :items="items" 
                            :popper="{ 
                                placement: 'bottom-start' 
                            }">
                            <UButton 
                                color="white"
                                trailing-icon="mdi:dots-vertical" />
                        </UDropdown>
                    </td>
                </tr>
            </Table>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { 
    Table,
    SelectMenu,
    InputDateRange
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
 const isOpenFilter: Ref<boolean> = ref<boolean>(true);
const linksItem = [
    {
        label: 'Main Menu'
    },
    {
        label: 'Results'
    },
    {
        label: 'All Results',
        to: '/result_list'
    }
];
const columns: Ref<Column[]> = ref<Column[]>([
    {
        title:'STU ID',
    },
    {
        title: "Profile"
    },
    {
        title:'Full Name',
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
        title: 'Study Info'
    },
    {
        title: 'Contact Info'
    },
    {
        title: "Action"
    }
 ]);
 const items = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    }
  }], [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    shortcuts: ['E'],
    click: () => {
      console.log('Edit')
    }
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
    shortcuts: ['D'],
    disabled: true
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    shortcuts: ['⌘', 'D']
  }]
]
const datas = {
    status: 'ok',
    data: [
        {   
            "stu_id":"STU-00001",
            "fullname": "Vox Odinson",
            "gender": "M",
            "dob": "10-05-2003",
            "nationality": "Cambodia",
            "phone":"067961719",
            "gmail":"voxodinson@gmail.com",
            "address": 'st644, boeng salang, toulkork, Phnompenh, Cambodia',
            "class":"M3",
            "shift":"Morning",
            "year":"4",
            "image_url":"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        },
        {   
            "stu_id":"STU-00001",
            "fullname": "Vox Odinson",
            "gender": "M",
            "dob": "10-05-2003",
            "nationality": "Cambodia",
            "phone":"067961719",
            "gmail":"voxodinson@gmail.com",
            "image_url":""
        },
        {   
            "stu_id":"STU-00001",
            "fullname": "Vox Odinson",
            "gender": "M",
            "dob": "10-05-2003",
            "nationality": "Cambodia",
            "phone":"067961719",
            "gmail":"voxodinson@gmail.com",
            "address": 'st644, boeng salang, toulkork, Phnompenh, Cambodia',
            "class":"M100",
            "shift":"Evening",
            "year":"4",
            "image_url":""
        },
        {   
            "stu_id":"STU-00001",
            "fullname": "Vox Odinson",
            "gender": "M",
            "dob": "10-05-2003",
            "nationality": "Cambodia",
            "phone":"067961719",
            "gmail":"voxodinson@gmail.com",
            "image_url":"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        },
        {   
            "stu_id":"STU-00001",
            "fullname": "Vox Odinson",
            "gender": "M",
            "dob": "10-05-2003",
            "nationality": "Cambodia",
            "phone":"067961719",
            "gmail":"voxodinson@gmail.com",
            "address": 'st644, boeng salang, toulkork, Phnompenh, Cambodia',
            "image_url":""
        },
    ],
    page_no: 1,
    per_page: 10,
    total: 10,
    total_page: 10
 };
 /**
 * End::Declare some variable section
 */

/**
 * Begin::Some logical in this component
 */
 const toggle = (): void => {
    isOpenFilter.value = !isOpenFilter.value as boolean;
}
/**
 * End::Some logical in this component
 */
</script>