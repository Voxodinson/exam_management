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
                    class="w-[400px] p-1"
                    @input="async (event: Event): Promise<void> => {
                        const value: string = (event?.target as HTMLInputElement)?.value;
                        await searchData(value);
                    }"/>
                <UTooltip 
                    text="Create New User"
                    :popper="{ offsetDistance: 12 }">
                    <UButton
                        icon="material-symbols:add-circle-outline-rounded"
                        size="md"
                        color="black"
                        label="New User"
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
                                :model-value="filters.department_id"/>
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
                                class="w-full"
                                @update:model-value="async (value: Items): Promise<void> => {
                                    if(value?.id){
                                        filters.class_idc = Number(value.id);
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
                                :options="[]"
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
                                :options="[]"
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
                class="w-full rounded-md grid grid-cols-3 gap-2">
                <div
                    v-for="(user, idx) in data.data"
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
                            class=" absolute top-2 left-2 py-0.5 px-4 text-white rounded-md text-[.8rem]"
                            :class="[
                                user.lock ? 'bg-red-400' : 'bg-blue-400'
                            ]">
                            {{ user.lock ? 'Lock' : 'Active'}}
                        </span>
                        <div class=" absolute top-2 right-2">
                            <UDropdown 
                                :items="dropDownItems(user as any)" 
                                :popper="{ placement: 'bottom-end' }">
                                <UButton 
                                    color="white"
                                    trailing-icon="mdi:dots-vertical" />
                            </UDropdown>
                        </div>
                        <h3>
                            {{ user.user_name || '-----'}}
                        </h3>
                        <span
                            class="text-gray-400 text-[.8rem]">
                            {{ user.user_role ? user.user_role : '---' }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-2 *:border-b-[1px] mt-2 *:border-gray-200 *:flex *:items-center *:justify-between *:w-full bg-gray-100 rounded-md p-3">
                        <div
                            class="*:text-gray-600 *:text-[.9rem]">
                            <span>Email:</span> 
                            <span>{{ user.email || '-----'}}</span>
                        </div>
                        <div
                            class="*:text-gray-600 *:text-[.9rem]">
                            <span>Login Account:</span>
                            <span>{{ user.email || '-----'}}</span>
                        </div>
                        <div
                            class="*:text-gray-600 *:text-[.9rem]">
                            <span>Start Date:</span>
                            <span>{{ user.start_date || '---- -- --'}}</span>
                        </div>
                        <div
                            class="*:text-gray-600 *:text-[.9rem]">
                            <span>Phone Number:</span>
                            <span>{{ user.phone || '-----'}}</span>
                        </div>
                        <div
                            class="*:text-gray-600 *:text-[.9rem]">
                            <span>Address:</span>
                            <span>
                                {{ user.address || '-----'}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="data" 
                class="w-full flex items-center mt-2 justify-end p-2 bg-white rounded-md">
                <UPagination
                    size="sm"
                    :total="Number(data.total) || 0" 
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
const data: Ref<any> = ref<any>({});
const userID: Ref<number | null> = ref<number | null>(null);
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const page: Ref<number> = ref<number>(1);
const _result: Ref<any> = ref<any>({});
const isOpenFilter: Ref<boolean> = ref<boolean>(true);
const openCreate: Ref<boolean> = ref<boolean>(false);
const filters: Ref<Items> = ref<Items>({
    department_id: '',
    class_id: '',
    shift_id: '',
    nationality: '',
});
const linksItem = [
  {
      label: 'Main Menu'
  },
  {
      label: 'All Exam',
  }
];
const dropDownItems = (data: Items): any => [
    [
        {
            label: 'Lock User',
            iconClass: 'text-red-500',
            class: 'text-red-500',
            icon: `${data.lock ? 'streamline:interface-lock-combination-combo-lock-locked-padlock-secure-security-shield-keyhole' : 'streamline:interface-unlock-combination-combo-key-keyhole-lock-secure-security-square-unlock-unlocked'}`,
            click: async (): Promise<void> => {
                Confirm('Do you want to lock user account?', async (): Promise<void> => {
                    const result = await api.update(`user/lock/${data.id}`, true, {}) as ResponseStatus;
                    if(result){
                        await fetchData();
                    }
                });
            }
        },
        {
            iconClass: 'text-yellow-500',
            class: 'text-yellow-500',
            label: 'Modify User',
            icon: 'streamline:interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing',
            click: () => {
                userID.value = data.id as number;
                toggleCreate(true);
            }
        },
        {
            iconClass: 'text-red-500',
            class: 'text-red-500',
            label: 'Delete',
            icon: 'material-symbols:delete-outline',
            click: async (): Promise<void> => {
                Confirm('Do you want to delete user account?', async (): Promise<void> => {
                    const result = await api.update(``, true, {}) as ResponseStatus;
                    if(result){
                        await fetchData();
                    }
                });
            }
        }
    ]
]
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
 const fetchData = async (current_page: number = 1, per_page: number = 10, search: string = ''): Promise<void> => {

    // let url: string = `user?per_page=${per_page}&page_no=${current_page}&deprtment_id=${filters.value.department_id}&class_id=${filters.value.class_id}&shift_id=${filters.value.shift_id}&nationality=${filters.value.nationality}`;
    let url: string = 'user';
    if(search)
    {
        url += `&search=${search}`;
    }
    const result: ResponseStatus = await api.get(url) as ResponseStatus;
    if(!result.error)
    {
        data.value = result as object;
        console.log(data.value)
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
        await fetchData(1, 10, value);
    }, 250);
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
    await fetchData();
});
</script>