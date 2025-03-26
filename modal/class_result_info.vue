<template>
    <UModal 
        class="custom-modal p-3 overflow-hidden"
        :model-value="open"
        :ui="{
            width: 'w-full sm:max-w-[95%]',
            overlay: {
                background: 'bg-gray-950/75'
            }
        }"
        prevent-close>
        <div
            class="px-2 pt-2 flex items-center justify-between border-b-[1px] border-gray-200 pb-1">
            <h3
                class="font-semibold capitalize">
                Exam Info
            </h3>
            <UIcon 
                name="material-symbols:close-rounded" 
                class="text-[1.2rem] hover:scale-110 transition-all ease-in-out duration-150 cursor-pointer"
                @click="(): void => {
                    emits('toggle', false);
                }"/>
        </div>
        <div class="w-full h-fit max-h-[80vh] overflow-auto p-2">
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
                        <span class="capitalize">
                            {{ data.student_name }}
                        </span>
                    </td>
                    <td>
                        <span class="capitalize">
                            {{ data.code }}
                        </span>
                    </td>
                    <td>
                        <span class="text-[1.2rem]">
                            {{ data.score }}/{{ data.total_score}}
                            <span class="text-blue-500 text-[.9rem]">{{ data.percentage }}%</span>
                        </span>
                    </td>
                    <td>
                        <span class="block text-[.9rem]">
                            Start Time: <span class="text-blue-400">{{ data.start_time }}</span>
                        </span>
                        <span class="block text-[.9rem]">
                            End Time: <span class="text-blue-400">{{ data.end_time }}</span>
                        </span>
                        <span class="block text-[.9rem]">
                            Time Spend: <span class="text-blue-400">{{ data.total_time_spent }}</span>
                        </span>
                    </td>
                    <td>
                        <UDropdown 
                            :items="[
                                [{
                                    label: 'Delete',
                                    icon: 'i-heroicons-trash-20-solid',
                                    iconClass: 'text-red-400',
                                    class: 'text-red-400',
                                    click: () => {
                                        Confirm('Are you sure to delete exam..?', async (): Promise<void> => {
                                            const result = await api.update(``, true, {}) as ResponseStatus;
                                            
                                        });
                                    }
                                }]
                            ]" 
                            :popper="{ placement: 'bottom-start' }">
                            <UButton 
                                color="white"
                                trailing-icon="mdi:dots-vertical" />
                        </UDropdown>
                    </td>
                </tr>
            </Table>
        </div>
    </UModal>
    
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
    Column
} from "@/models/type";
import { 
    Confirm 
} from "@/utils/dialog";
import { 
    Table 
 } from "@/components/ui";
/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
}>();

const props = withDefaults(defineProps<{
    open: boolean,
    examId: number | null
}>(),{
    open: false,
    examIdclassId: null
});
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variables object section
 */
const api: ContextAPI = new ContextAPI(new SimpleAPI());
const context: GetDataContext = new GetDataContext(new GetDataNormalForm());
/**
 * End::Declare variables object section
 */

/**
 *Begin::Declare variable in this section 
 */ 
const data: Ref<object> = ref<object>({});
const columns: Ref<Column[]> = ref<Column[]>([
    {
        title:'Student Name',
    },
    {
        title:'Student Code',
    },
    {
        title: 'Score'
    },
    {
        title: 'Time Summary'
    },
    {
        title:'Action'
    }
 ])
/**
 *End::Declare variable in this section 
 */ 

/**
 * Begin::Fetch data section
 */
const fetchData = async (search: string = ''): Promise<void> => {
    let url: string = `exam/student/result/exam/${props.examId}`;
    if(search)
    {
        url += `&search=${search}`;
    }
    const result: any = await api.get(url) as any;
    if(!result.error)
    {
        data.value = result as any;
        console.log(data.value)
    }
}


/**
 * End::Fetch data section
 */

/**
 * Begin::Some logical section
 */


/**
 * End::Some logical section
 */

watch((): boolean => props.open, async (value: boolean): Promise<void> => {
    if(value)
    {
        await fetchData();
    }
});

</script>