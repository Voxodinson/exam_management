<template>
    <div class="flex items-center justify-between h-[45px] px-4 bg-white border-b-[1px] border-gray-200">
        <UBreadcrumb 
            :links="linksItem"
            divider="/"
                :ui="{
                    base: 'font-semibold text-[.8rem]',
                    inactive: 'hover:text-blue-200',
                    active: 'text-blue-400',}"/>
        <div class=" flex gap-2 items-center justify-center h-full">
            <UTooltip 
                text="Create New Exam"
                :popper="{ offsetDistance: 12 }">
                <UButton
                    icon="material-symbols:add-circle-outline-rounded"
                    size="sm"
                    color="black"
                    label="New Exam"
                    variant="soft" 
                    :padded="false"
                    class="bg-[#3A6D8C] hover:bg-gray-200 text-white hover:text-black p-1 transition"/>
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
                    class="bg-[#3A6D8C] hover:bg-gray-200 text-white hover:text-black p-1 transition"/>
            </UTooltip>
        </div>
    </div>
    
    <div class="w-full p-2">
        <div 
            v-if="isOpenFilter"
            class="flex gap-2 justify-between p-2 rounded-md bg-[#3A6D8C]">
            <div 
                class="flex gap-2">
                <SelectMenu
                    name=""
                    :options="[]"
                    value-attribute="id"
                    option-attribute="name"
                    id-attribute="id"
                    placeholder="Select a subject"
                    class="w-[250px]"/>
                <InputDate
                    class="w-[250px]"/>
            </div>
            <UInput
                icon="material-symbols:search"
                type="text"
                color="white"
                variant="outline"
                size="md"
                name="district"
                role="input"
                placeholder="Search here..."
                class="w-[250px]"/>
        </div>
        <div class="w-full mt-2 bg-white rounded-md overflow-hidden">
            <Table
                :columns="columns"
                :data="datas"
                is-custom
                v-slot="{ data }"
                class="mt-3"
                @update:data="async (current_page: number): Promise<void> => {
                    
                }">
                <tr class="*:px-2.5 *:py-1.5">
                    <td>
                        <span>{{ data.exam }}</span>
                    </td>
                    <td>
                        <span>{{ data.due_date }}</span>
                    </td>
                    <td>
                        <span>{{ data.created_at }}</span>
                    </td>
                    <td>
                        <span>{{ data.status }}</span>
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

<script setup lang="ts">
import { 
    Table,
    SelectMenu,
    InputDate
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
 * Begin::Declare variable section
 */
const dataOptions: Ref<Options> = ref<Options>({});
const data: Ref<object> = ref<object>({});
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const filters: Ref<Items> = ref<Items>({
    status_id: '',
    warehouse_id: ''
});
const isOpenFilter: Ref<boolean> = ref<boolean>(true);
const linksItem = [
  {
      label: 'Main Menu'
  },
  {
      label: 'All Exam',
  }
];
const columns: Ref<Column[]> = ref<Column[]>([
    {
        title:'Exam',
    },
    {
        title: 'Created At'
    },
    {
        title: "Due Date"
    },
    {
        title: "status"
    },
    {
        title: 'Action'
    }
 ])
 const datas = {
    status: 'ok',
    data: [
        {
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        },
        {
            "exam": "Web Final Exam",
            "due_date": "10-05-2003",
            "status": "Active",
            "created_at": "2024-10-20"
        }
    ],
    page_no: 1,
    per_page: 10,
    total: 10,
    total_page: 10
 };
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
/**
 * End::Declare variable section
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

/**
 * Begin::Fetch data section
 */
 const fetchData = async (current_page: number = 1, search: string = ''): Promise<void> => {
    const per_page: number = 10;
    let url: string = `purchase?per_page=${per_page}&page_no=${current_page}`;
    if(search)
    {
        url += `&search=${search}`;
    }
    const result: ResponseStatus = await api.get(url) as ResponseStatus;
    if(!result.error)
    {
        data.value = result as object;
    }
}

const fetchOption = async (): Promise<void> => {
    const options: ResponseStatus = await api.get("") as ResponseStatus;
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
    const url: string = `package?per_page=${per_page}&page_no=${current_page}&status_id=${filters.value.status_id}&warehouse_id=${filters.value.warehouse_id}`;
    const result: ResponseStatus = await api.get(url, false) as ResponseStatus;
    if(!result.error)
    {
        data.value = result as object;
    }
}
/**
 * End::Fetch data section
 */

onMounted(async (): Promise<void> => {
    await fetchData();
});
</script>