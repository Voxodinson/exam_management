<template>
    <template
        v-if="openCreate">
        <User
            @toggle="toggleCreate"
            @update:data="fetchData"
            :user-id="userID"/>
    </template>
    <template
        v-else>
        <div class="flex items-center justify-between h-[45px] px-4 bg-white border-b-[1px] border-gray-200">
            <UBreadcrumb 
                :links="linksItem"
                divider="/"
                    :ui="{
                        base: 'font-semibold text-[.8rem]',
                        inactive: 'hover:text-blue-200',
                        active: 'text-blue-400',}"/>
            <div class=" flex gap-2 items-center justify-center h-full">
                <UInput
                    icon="material-symbols:search"
                    type="text"
                    color="white"
                    variant="outline"
                    size="sm"
                    name="district"
                    role="input"
                    placeholder="Search name here..."
                    class="w-[400px] p-1"/>
                <UTooltip 
                    text="Create New User"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        icon="material-symbols:add-circle-outline-rounded"
                        size="md"
                        color="black"
                        label="New Exam"
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
                        size="lg"
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
        <div class="w-full p-2">
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
                class="w-full rounded-md grid grid-cols-3 gap-2">
                <div
                    v-for="(user, idx) in datas.data"
                    :key="idx"
                    class="w-full h-fit bg-white border-[1px] border-gray-100 rounded-md p-2 relative">
                    <div class="w-full flex flex-col items-center justify-center">
                        <div 
                            class="w-[150px] h-[150px] overflow-hidden rounded-full shadow-sm">
                            <img 
                                :src="(user.img_link_url as string) || UserImage" 
                                alt="user_image"
                                class="w-full h-full object-cover">
                        </div>
                        <span
                            class=" absolute top-2 right-2 py-0.5 px-4 text-white rounded-md text-[.8rem]"
                            :class="[
                                user.lock ? 'bg-red-400' : 'bg-blue-400'
                            ]">
                            {{ user.lock ? 'Lock' : 'Active'}}
                        </span>
                        <h3>
                            {{ user.user_name }}
                        </h3>
                        <span
                            class="text-gray-400 text-[.8rem]">
                            {{ user.user_role }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-2 *:border-b-[1px] mt-2 *:border-gray-200 *:flex *:items-center *:justify-between *:w-full bg-gray-100 rounded-md p-3">
                        <div
                            class="*:text-gray-600 *:text-[.9rem]">
                            <span>Email:</span> 
                            <span>{{user.email}}</span>
                        </div>
                        <div
                            class="*:text-gray-600 *:text-[.9rem]">
                            <span>Login Account:</span>
                            <span>{{ user.email }}</span>
                        </div>
                        <div
                            class="*:text-gray-600 *:text-[.9rem]">
                            <span>Start Date:</span>
                            <span>{{ user.start_date }}</span>
                            <span
                                v-if="!user.start_date">
                                ---- -- --
                            </span>
                        </div>
                        <div
                            class="*:text-gray-600 *:text-[.9rem]">
                            <span>Phone Number:</span>
                            <span>{{ user.phone }}</span>
                        </div>
                        <div
                            class="*:text-gray-600 *:text-[.9rem]">
                            <span>Address:</span>
                            <span>
                                Phnom Penh Cambodia
                            </span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between gap-3 p-2 bg-green-100 mt-2 rounded-md">
                        <UButton 
                            icon="carbon:password"
                            color="sky" 
                            variant="outline"
                            label="Change Password"
                            class="hover:bg-blue-100"/>
                        <UIcon 
                            :name="user.lock ? 'streamline:interface-lock-combination-combo-lock-locked-padlock-secure-security-shield-keyhole' : 'streamline:interface-unlock-combination-combo-key-keyhole-lock-secure-security-square-unlock-unlocked'" 
                            class="text-[1.6rem] text-red-500 hover:scale-105" 
                            v-if="true"
                            @click="async (): Promise<void> => {
                                Confirm('Do you want to lock user account?', async (): Promise<void> => {
                                    const result = await api.update(``, true, {}) as ResponseStatus;
                                    if(result){
                                        await fetchData();
                                    }
                                });
                            }"/>
                        <UButton 
                            icon="streamline:interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing"
                            color="sky" 
                            variant="outline"
                            label="Modify User"
                            @click="()=>{
                                toggleCreate(true);
                            }"
                            class="hover:bg-blue-100"/>
                    </div>
                </div>
            </div>
            <div
                v-if="datas" 
                class="w-full flex items-center mt-2 justify-end p-2 bg-white rounded-md">
                <UPagination
                    size="sm"
                    :total="datas.total || 0" 
                    show-last 
                    show-first
                    @update:model-value="async (current_page: number): Promise<void> => {
                        await fetchData(current_page);
                    }"
                    v-model="page"
                    :to="(page_no: number) => ({
                        query: {
                            page_no
                        }
                    })"/>
            </div>
        </div>
    </template>
</template>

<script lang="ts" setup>
import { 
    User
} from '@/collector/pages';
import { 
    UserImage 
} from '@/assets/images';
import { 
    SelectMenu
} from '@/components/ui';
import {
    ContextAPI,
    SimpleAPI
} from "@/composable/apiHandler";
import type {
    Items,
    Options,
    ResponseStatus
} from "@/models/type";
import { 
    Confirm 
} from '@/utils/dialog';
import { Result } from 'postcss';
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
definePageMeta({
    colorMode: 'light'
});

/**
 * Begin::Declare variable section
 */
const dataOptions: Ref<Options> = ref<Options>({});
const data: Ref<Items[]> = ref<Items[]>([]);
const userID: Ref<number | null> = ref<number | null>(null);
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const page: Ref<number> = ref<number>(1);
const _result: Ref<any> = ref<any>({});
const isOpenFilter: Ref<boolean> = ref<boolean>(true);
const openCreate: Ref<boolean> = ref<boolean>(false);
const filters: Ref<Items> = ref<Items>({
    search: '',
    role: '',
    branches: ''
});
const linksItem = [
  {
      label: 'Main Menu'
  },
  {
      label: 'All Exam',
  }
];
const datas = {
    status: 'ok',
    data: [
        {
            "user_name": "John Doe",
            "img_link_url": "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
            "user_role": "Admin",
            "email": "johndoe@example.com",
            "start_date": "2025-01-23",
            "phone": "+1234567890",
            "lock": false
        },
        {
            "user_name": "John Doe",
            "img_link_url": "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
            "user_role": "Admin",
            "email": "johndoe@example.com",
            "start_date": "2025-01-23",
            "phone": "+1234567890",
            "lock": true
        },
        {
            "user_name": "John Doe",
            "img_link_url": "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
            "user_role": "Admin",
            "email": "johndoe@example.com",
            "start_date": "2025-01-23",
            "phone": "+1234567890",
            "lock": true
        },
        {
            "user_name": "John Doe",
            "img_link_url": "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
            "user_role": "Admin",
            "email": "johndoe@example.com",
            "start_date": "2025-01-23",
            "phone": "+1234567890",
            "lock": false
        },
        {
            "user_name": "John Doe",
            "img_link_url": "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
            "user_role": "Admin",
            "email": "johndoe@example.com",
            "start_date": "2025-01-23",
            "phone": "+1234567890",
            "lock": false
        },
        {
            "user_name": "John Doe",
            "img_link_url": "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
            "user_role": "Super Admin",
            "email": "johndoe@example.com",
            "start_date": "2025-01-23",
            "phone": "+1234567890",
            "lock": true
        }
    ],
    page_no: 1,
    per_page: 10,
    total: 20,
    total_page: 10
 };
/**
 * End::Declare variable section
 */

/**
 * Begin:Some logical in this component
 */
const toggleCreate = (value: boolean) => {
    openCreate.value = value as boolean;
}
const toggle = (): void => {
    isOpenFilter.value = !isOpenFilter.value as boolean;
}
/**
 * End::Some logical in this component
 */

/**
 * Begin::Fetch data section
 */
 const fetchData = async (current_page: number = 1, search: string = ''): Promise<void> => {
    const per_page: number = 6;
    let url: string = `user?per_page=${per_page}&page_no=${current_page}`;
    if(search)
    {
        url += `&search=${search}`;
    }
    const result: ResponseStatus = await api.get(url) as ResponseStatus;
    _result.value = result as object;
    if(!result.error)
    {
        data.value = result.data as Items[];
    }
}

const fetchOption = async (): Promise<void> => {
    const options: ResponseStatus = await api.get("setting/filter/user/list") as ResponseStatus;
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
        await fetchData(1, value);
    }, 250);
}

const filterData = async (current_page: number = 1): Promise<void> => {
    const per_page: number = 10;
    const url: string = `user?per_page=${per_page}&page_no=${current_page}&role=${filters.value.role}&branches=${filters.value.branches}`;
    const result: ResponseStatus = await api.get(url, false) as ResponseStatus;
    if(!result.error)
    {
        data.value = result.data as Items[];
    }
}
watch((): boolean => openCreate.value, async (value: boolean): Promise<void> => {
    if(!value)
    {
        userID.value = null;
    }
});
/**
 * End::Fetch data section
 */
onMounted(async (): Promise<void> => {
});
</script>