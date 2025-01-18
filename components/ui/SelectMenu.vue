<template>
    <div
        class="relative group h-fit"
        :class="class">
        <USelectMenu
            :id="useId()"
            searchable
            color="white"
            :variant="variant"
            size="md"
            :name="name"
            :options="options"
            :option-attribute="optionAttribute"
            :by="valueAttribute"
            :placeholder="placeholder"
            :multiple="multiple"
            :disabled="disabled"
            :padded="padded"
            :ui="{
                icon: {
                    base: (selected[valueAttribute]) == null ? 'block' : 'block group-hover:hidden'
                },
                color: {
                    white: {
                        outline: selected[valueAttribute] == null ? 'dark:bg-gray-400 text-gray-400' : 'dark:bg-gray-900 text-gray-900'
                    }
                },
                ...ui
            }"
            :ui-menu="{
                ...uiMenu
            }"
            @update:model-value="(value: Option): void => {
                if(value)
                {
                    selected = value;
                    emits('update:model-value', value as Option);
                    emits('change', selectElement as unknown as HTMLSelectElement);
                    checkNextSibling();
                }
            }"
            :model-value="selected"/>
        <div
            class="absolute top-5 -translate-y-2/4 right-2 cursor-auto"
            :class="{
                'hidden group-hover:block': selected[valueAttribute] != null,
                'hidden': selected[valueAttribute] == null
            }">
            <UIcon
                @click="clearOption({})"
                name="gravity-ui:circle-xmark"
                class="text-xl text-red-500 cursor-pointer"
                :class="{
                    'hidden': disabled
                }"/>
        </div>
        <select
            ref="selectElement"
            @change="(event: Event): void => {
                getValue(event);
            }"
            class="w-[1px] h-[1px] absolute top-1/2 left-1/2"
            :name="name"
            :value="(selectedValue?.toString())"
            :title="title"
            :multiple="multiple"
            :required="required"
            :disabled="disabled"
            role="input">
            <option
                :selected="!isFirst"
                value="">{{ placeholder }}</option>
            <option
                v-for="(option, idx) in options"
                :key="idx"
                :value="option[valueAttribute]">{{ option[optionAttribute] }}</option>
        </select>
    </div>
    <div
        v-if="hasEditor"
        class="flex items-center gap-x-2 absolute -top-6"
        :class="{
            'right-0': !editor?.position,
            [editor?.position as string]: editor?.position
        }">
        <UIcon
            @click="editor?.create(true)"
            name="material-symbols:add-circle-outline-rounded"
            class="text-blue-500 text-xl cursor-pointer"/>
        <UIcon
            @click="editor?.update(selected[idAttribute] ,true)"
            name="streamline:interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing"
            class="text-yellow-500 text-lg cursor-pointer"
            :class="{
                'hidden': !selected[valueAttribute]
            }"/>
        <UIcon
            @click="() => {
                editor?.delete(selected[idAttribute]);
                clearOption({});
            }"
            name="material-symbols:delete-outline-rounded"
            class="text-red-500 text-2xl cursor-pointer"
            :class="{
                'hidden': !selected[valueAttribute]
            }"/>
    </div>
</template>

<script setup lang="ts">
import type {
    SelectVariant
} from '@nuxt/ui/dist/runtime/types';
import type {
    VNodeRef
} from 'vue';

/**
 * Begin::Declare interface section
 */
interface Option
{
    [key: string]: string | number;
}

interface Editor
{
    create: (open: boolean) => void,
    update: (id: number | string, open: boolean) => void,
    delete: (id: number | string) => void,
    position?: string
}
/**
 * End::Declare interface section
 */

const props = withDefaults(defineProps<{
    modelValue?: string | number | object | null,
    options: Option[],
    optionAttribute: string,
    valueAttribute: string,
    name: string,
    placeholder: string,
    required?: boolean,
    multiple?: boolean,
    editor?: Editor,
    hasEditor?: boolean,
    class?: string | object,
    idAttribute?: string,
    title?: string,
    disabled?: boolean,
    isFirst?: boolean,
    ui?: object | any,
    uiMenu?: object | any,
    variant?: SelectVariant,
    padded?: boolean,
    preFetch?: boolean
}>(),{
    modelValue: null,
    options: () => ([]),
    optionAttribute: 'label',
    valueAttribute: 'value',
    name: '',
    placeholder: '',
    required: false,
    multiple: false,
    editor: () => ({
        create: (): void => {},
        update: (): void => {},
        delete: (): void => {}
    }),
    hasEditor: false,
    class: '',
    idAttribute: 'id',
    title: '',
    disabled: false,
    isFirst: false,
    ui: () => ({}),
    uiMenu: () => ({}),
    variant: 'outline',
    padded: true,
    preFetch: false
});

/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits<{
    (event: 'update:model-value', value: Option): void,
    (event: 'change', value: HTMLSelectElement): void
}>();
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variable section
 */
const selected: Ref<Option> = ref<Option>({});
const selectElement: Ref<VNodeRef | null> = ref<VNodeRef | null>(null);
/**
 * End::Declare variable section
 */

/**
 * Begin::Logical of this component
 */
const getValue = (event: Event): void => {
    const target: HTMLSelectElement = event.target as HTMLSelectElement;
    const value: string | number = target.value as string | number;
    const options = props.options as Option[];
    selected.value = ((value?.toString() !== '') && (value !== null) && (value !== undefined)) ? options.find((op: Option) => (op[props.valueAttribute])?.toString() == (value?.toString())) as Option : {} as Option;
    emits('update:model-value', selected.value);
}

const clearOption = (value: Option): void => {
    selected.value = value;
    emits('update:model-value',value);
}

const checkNextSibling = (): void => {
    const selectEl: HTMLSelectElement | null = (selectElement?.value) as HTMLSelectElement | null;
    if(selectEl)
    {
        const smallEl: HTMLElement = selectEl.nextElementSibling as HTMLElement;
        if(smallEl && smallEl.classList.contains('error'))
        {
            smallEl.remove();
        }
    }
}

const selectedValue: ComputedRef<string | number> = computed<string | number>((): string | number => {
    return (selected.value[props.valueAttribute])?.toString();
});

const initializeSelectedValue = (): void => {
    const options = props.options as Option[];

    if(props.modelValue !== null)
    {
        const value = props.modelValue as string | number;
        selected.value = options.find((op) => op[props.valueAttribute] == value) as Option || {};
        if(props.preFetch)
        {
            emits('update:model-value', selected.value);
        }
    }
    else if(props.isFirst && options[0])
    {
        selected.value = options[0];
        emits('update:model-value', selected.value);
    }
}

watch((): Option[] => props.options, (value: Option[]): void => {
    if(value[0])
    {
        initializeSelectedValue();
    }
});
/**
 * End::Logical of this component
 */

onMounted((): void => {
    initializeSelectedValue();
});

onUnmounted((): void => {
    clearOption({});
    const selectEl: HTMLSelectElement | null = (selectElement?.value) as HTMLSelectElement | null;
    if(selectEl) selectEl.remove();
});
</script>