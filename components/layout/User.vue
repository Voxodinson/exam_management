<template>
    <UDropdown
        :items="items"
        :popper="{
            placement: 'bottom-start'
        }"
        :ui="{
            trigger: 'rounded-3xl  overflow-hidden',
            background: 'bg-white',
            width: 'w-fit min-w-[200px]'
        }">
        <div
            class="bg-white flex gap-x-2  rounded-md items-start">
            <UAvatar
                :src="profile"
                alt="user"
                size="md"/>
        </div>
    </UDropdown>
</template>

<script setup lang="ts">
import type {
    DropdownItem
} from '@nuxt/ui/dist/runtime/types';
import {
    storeToRefs
} from 'pinia';
import {
    useAuthStore
} from '@/store/auth';
import {
    Confirm
} from "@/utils/dialog";
import {
    type Router,
    useRouter
} from "vue-router";

/**
 * Begin::Declare variable section
 */
const {
    authenticated,
    profile,
    username } = storeToRefs(useAuthStore());
const { logUserOut } = useAuthStore();
const router: Router = useRouter();
const items: Ref<DropdownItem[][]> = computed(() => [
    [
        {
            label: (username.value as string),
            class: 'justify-start pb-3 hover:bg-transparent',
            avatar: {
                src: '',
                size: 'lg'
            }
        },
        {
            label: 'Logout',
            icon: "octicon:sign-out",
            iconClass: "text-blue-500",
            click: (): void => {
                logout();
            }
        }
    ]
]);
/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical in this component
 */
const logout = (): void => {
    Confirm('Do you want to log out now?', (): void => {
        logUserOut();
        router.push('/signin_choose');
    });
}

const getUsername = (): void => {
    username.value = username.value || localStorage.getItem('username') as string;
}

/**
 * End::Some logical in this component
 */

onMounted(async (): Promise<void> => {
    getUsername();
});
</script>