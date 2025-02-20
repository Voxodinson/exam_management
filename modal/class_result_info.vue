<template>
    <UModal 
        class="custom-modal p-3 overflow-hidden"
        :model-value="open"
        :ui="{
            width: 'w-full sm:max-w-[90%]',
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
                :data="[]"
                is-custom
                v-slot="{ data }"
                @update:data="async (current_page: number): Promise<void> => {
                    
                }">
                <tr 
                    class="*:px-2.5 *:py-1.5 hover:bg-gray-100 cursor-pointer">
                    <td
                        class="w-[300px]">
                        <span class="block text-[.9rem]">
                            Dept: <span class="text-blue-400">{{ data.department_name }}</span>
                        </span>
                        <span class="block text-[.9rem]">
                            Class: <span class="text-blue-400">{{ data.class }}</span>
                        </span>
                        <span class="block text-[.9rem]">
                            Shift: <span class="text-blue-400">{{ data.shift }}</span>
                        </span>
                    </td>
                    <td>
                        <span>
                            {{ data.exam }}
                        </span>
                    </td>
                    <td>
                        <span>
                            {{ data.total_students }}
                        </span>
                    </td>
                    <td>
                        <span>
                            {{ data.total_submited }}
                        </span>
                    </td>
                    <td>
                        <span>{{ data.total_score }}</span>
                    </td>
                    <td>
                        
                    <UDropdown 
                        :items="[
                            [{
                                label: 'View Information',
                                iconClass: 'text-blue-400',
                                class: 'text-blue-400',
                                icon: 'material-symbols:folder-eye-outline',
                            }], 
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
    open: boolean
}>(),{
    open: false
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
const viewQuestion: Ref<boolean> = ref<boolean>(false);
const columns: Ref<Column[]> = ref<Column[]>([
    {
        title:'Department / Class / shift',
    },
    {
        title: "exam"
    },
    {
        title: 'Total Students'
    },
    {
        title: 'Total Submited'
    },
    {
        title: 'Total Score (%)'
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


/**
 * End::Fetch data section
 */
const toggleViewQuestion = (): void => {
    viewQuestion.value = !viewQuestion.value as boolean;
}
/**
 * Begin::Some logical section
 */


/**
 * End::Some logical section
 */
onMounted(async (): Promise<void> => {
})
</script>