<template>
    <UPopover
        class="fixed-to-datepicker"
        :popper="{
            placement: 'bottom-start'
        }">
    <UInput
        :id="useId()"
        icon="i-heroicons-calendar-days-20-solid"
        color="white"
        variant="outline"
        size="md"
        :name="name"
        v-model="date"
        class="w-full"
        placeholder="dd-MMM-yyyy - dd-MMM-yyyy"
        role="input"/>
        <template #panel="{ close }">
            <div
                class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
                <div
                    class="hidden sm:flex flex-col py-4">
                    <UButton
                        type="button"
                        v-for="(range, idx) in ranges"
                        :key="idx"
                        :label="range.label"
                        color="gray"
                        variant="ghost"
                        class="rounded-none px-6"
                        :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
                        truncate
                        @click="selectRange(range.duration)"/>
                </div>
                <DateRangePicker
                    :model-value="selected"
                    @update:model-value="getValue"
                    @close="close"/>
            </div>
        </template>
    </UPopover>
</template>

<script setup lang="ts">
import {
    DateRangePicker
} from '@/components/ui/';
import {
    sub,
    format,
    isSameDay,
    type Duration
} from 'date-fns';

defineProps({
    name: {
        type: String,
        required: false
    }
});

/**
 * Begin::Declare interface section
 */
interface Range
{
    label: string,
    duration: object
}

interface DateRange
{
    start: Date,
    end: Date
}
/**
 * End::Declare interface section
 */

/**
 * Begin::Declare variable section
 */
const ranges: Ref<Range[]> = ref<Range[]>([
    {
        label: 'Last 7 days',
        duration: {
            days: 7
        }
    },
    {
        label: 'Last 14 days',
        duration: {
            days: 14
        }
    },
    {
        label: 'Last 30 days',
        duration: {
            days: 30
        }
    },
    {
        label: 'Last 3 months',
        duration: {
            months: 3
        }
    },
    {
        label: 'Last 6 months',
        duration: {
            months: 6
        }
    },
    {
        label: 'Last year',
        duration: {
            years: 1
        }
    }
]);
const selected: Ref<DateRange> = ref<DateRange>({
    start: sub(new Date(), {
        days: 7
    }),
    end: new Date()
});
/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical in this component
 */
const date = (computed(() => {
    const start = format(selected.value.start, 'd-MMM-yyy');
    const end = format(selected.value.end, 'd-MMM-yyy');
    return `${start} - ${end}`;
}));

const isRangeSelected = (duration: Duration): boolean => {
    return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date());
}

const selectRange = (duration: Duration): void => {
    selected.value = {
        start: sub(new Date(), duration),
        end: new Date()
    }
}

const getValue = (value: DateRange): void => {
    selected.value = value;
}
/**
 * End::Some logical in this component
 */
</script>

<style lang="css">
.fixed-to-datepicker > div.group{
    position: fixed;
}
</style>