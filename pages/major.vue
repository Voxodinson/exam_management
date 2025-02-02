<template>
    <template v-if="openCreate">
        
    </template>
    <template
        v-else>
        <div class="w-full bg-white rounded-md p-3">
            <div class="flex gap-3">
                <UButton
                    icon="material-symbols:add-2-rounded"
                    size="md"
                    color="primary"
                    variant="solid"
                    label="Create Purchase"
                    :trailing="false"
                    class="h-fit"
                    @click="(): void => {
                        toggleCreate(true)
                    }"/>
            </div>
            <div class="flex gap-3 w-full items-end p-3 border-[1px] border-gray-300 rounded-md mt-3 bg-gray-100">
                <UFormGroup
                    class="w-[calc(97%/5)]"
                    label="Filter By Date"
                    name="">
                    <InputDateRange
                        name="date"
                        class="w-full"/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(97%/5)]"
                    label="PO Number"
                    name="name">
                    <UInput
                        type="text"
                        color="white"
                        variant="outline"
                        size="md"
                        name="name"
                        role="input"
                        placeholder="enter PO number here..."
                        class="w-full"
                        @input="async (event: Event): Promise<void> => {
                            const value: string = (event.target as HTMLInputElement).value as string;
                            await searchData(value);
                        }"/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(97%/5)]"
                    label="Supplier"
                    name="">
                    <SelectMenu
                        name="role"
                        :options="[]"
                        option-attribute="user_name"
                        value-attribute="id"
                        id-attribute="id"
                        placeholder="select supplier"
                        class="w-full"/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(97%/5)]"
                    label="Payment Type"
                    name="">
                    <SelectMenu
                        name="approved_status"
                        :options="[]"
                        option-attribute="x"
                        value-attribute="id"
                        id-attribute="id"
                        placeholder="select payment type"
                        class="w-full"/>
                </UFormGroup>
                <UFormGroup
                    class="w-[calc(97%/5)]"
                    label="Status"
                    name="">
                    <SelectMenu
                        name="status"
                        :options="[]"
                        option-attribute="user_name"
                        value-attribute="id"
                        id-attribute="id"
                        placeholder="select status"
                        class="w-full"/>
                </UFormGroup>
                <UButton
                    label="Clear"
                    variant="solid"
                    color="red"
                    size="md"
                    class="h-fit"/>
            </div>
        </div>
        <div class="w-full p-3 rounded-md bg-white mt-3">
            <Table
                :columns="columns"
                :data="data"
                is-custom
                v-slot="{ data }"
                @update:data="async (current_page: number): Promise<void> => {
                    await fetchData(current_page);
                }">
                <tr class="*:px-2.5 *:py-1.5">
                    <td>
                        <span>{{ data.po_code }}</span>
                    </td>
                    <td>
                        <span>{{ data.purechase_date }}</span>
                    </td>
                    <td>
                        <span>{{ data.supplier_name }}</span>
                    </td>
                    <td>
                        <span>{{ data.total_amount }}</span>
                    </td>
                    <td>
                        <span>{{ data.due_amount }}</span>
                    </td>
                    <td>
                        <span>{{ data.tax_amount }}</span>
                    </td>
                    <td>
                        <span>{{ data.tax }}</span>
                    </td>
                    <td>
                        <span>{{ data.status_code }}</span>
                    </td>
                </tr>
            </Table>
        </div>
    </template>
</template>

<script setup lang="ts">
import { 
    Table,
    InputDateRange,
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
    ResponseStatus
} from "@/models/type";
import { 
    Delete 
} from '@/utils/dialog';
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
const openCreate: Ref<boolean> = ref<boolean>(false);
const majorId: Ref<number | null> = ref<number | null>(null);
const columns: Ref<Column[]> = ref<Column[]>([
    {
        title:'Action',
    },
    {
        title: 'PO Number'
    },
    {
        title: "Purchase Date"
    },
    {
        title: "Supplier"
    },
    {
        title: 'Total Amount($)'
    },
    {
        title: 'Total Amount Due($)'
    },
    {
        title:'Tax Amount($)'
    },
    {
        title:'Tax($)'
    },
    {
        title:'Status'
    }
 ])

/**
 * End::Declare variable section
 */ 

/**
 * Begin::Some logical in this component
 */
const toggleCreate = (value: boolean) => {
    openCreate.value = value as boolean;
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
 watch((): boolean => openCreate.value, async (value: boolean): Promise<void> => {
    if(!value)
    {
        majorId.value = null;
    }
});

onMounted(async (): Promise<void> => {
    // await fetchData();
});
</script>