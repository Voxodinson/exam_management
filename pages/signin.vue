<template>
    <div
        class="h-[100vh] w-full">
        <img
            :src="WhiteTechBG"
            alt="Logo"
            class="object-cover w-full h-full opacity-90"
            loading="lazy" />
    </div>
    <div
        class="flex h-full w-1/2 absolute top-0 right-0 ">
        <div
            class="h-[100vh] w-full flex items-center justify-center bg-white relative overflow-hidden">
            <img 
                :src="Technology" 
                alt="image"
                class="w-[400px] h-[400px] opacity-[0.15] z-0 absolute bottom-[10px] right-[10px]">
            <form
                name="signin"
                method="POST"
                enctype="multipart/form-data"
                class=" p-6 rounded-md z-10 h-full pt-10 flex flex-col w-[70%]  justify-center gap-3"
                @submit.prevent="getData">
                <h4
                    class="text-[3rem] text-sky-400 text-center font-normal ">
                    Welcome Back
                    <p class="text-center text-[.9rem] text-gray-400 font-meduim">
                        Please login into your account!
                    </p>
                </h4>
                <UFormGroup
                    class="w-full mt-6"
                    label="Username"
                    name="username">
                    <UInput
                        type="text"
                        color="white"
                        variant="none"
                        size="md"
                        name="username"
                        minlength="3"
                        maxlength="50"
                        placeholder="Enter your username"
                        v-model="user.username"
                        required
                        class="border-sky-400 bg-white border-[1px] rounded-md"/>
                </UFormGroup>
                <UFormGroup
                    class="w-full"
                    label="Password"
                    name="password">
                    <UInput
                        :type="show ? 'text' : 'password'"
                        color="white"
                        variant="none"
                        size="md"
                        name="password"
                        minlength="6"
                        maxlength="20"
                        placeholder="Enter you password"
                        v-model="user.password"
                        required
                        class="border-sky-400 bg-white border-[1px] rounded-md"/>
                    <UButton
                        type="button"
                        @click="show = !show"
                        variant="link"
                        color="white"
                        size="sm"
                        class="absolute top-0 right-0 w-auto h-full border-0 outline-0"
                        square>
                        <UIcon
                        :name="show ? 'fluent:eye-off-20-regular' : 'fluent:eye-24-regular'"
                        class="text-xl"/>
                    </UButton>
                </UFormGroup>
                <UDivider
                    label="Login Into Your Student Account"
                    :ui="{ label: 'text-gray-500 dark:text-white-400' }"
                    class="mt-6"
                    />
                <UButton
                    type="submit"
                    size="md"
                    class="flex items-center bg-gradient-to-r z-10 from-sky-400 to-blue-600 hover:bg-gradient-to-r hover:from-sky-300 hover:to-blue-500 transition justify-center mt-3"
                    label="Login Now"
                    square/>
                <span
                    class="text-[.8rem] text-center z-20">
                    Don't have an account?
                    <ULink
                        to="/student_register"
                        class="underline hover:text-blue-500">
                        Register an student account
                    </ULink>
                </span>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    GetDataContext,
    GetDataNormalForm
} from "@/composable/dataHandler/";
import {
    storeToRefs
} from 'pinia';
import {
    useAuthStore
} from '@/store/auth';
import { 
    BackgroundLogin,
    Technology,
    WhiteTechBG
} from "@/assets/images";
import { 
    Success 
} from "@/utils/dialog";
definePageMeta({
    layout: 'login',
    colorMode: 'light'
});

useSeoMeta({
  title: 'Login'
});

/**
 * Begin::Declare interface section
 */
interface User
{
  username: string,
  password: string,
}
/**
 * End::Declare interface section
 */

/**
 * Begin::Declare variable object section
 */
const context: GetDataContext = new GetDataContext(new GetDataNormalForm());
/**
 * End::Declare variable object section
 */

/**
 * Begin::Declare variable section
 */
const user: Ref<User> = ref<User>({
    username: '',
    password: '',
});
const {
    messages
} = storeToRefs(useAuthStore());
const router = useRouter();
const show: Ref<boolean> = ref<boolean>(false);
/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical in this component
 */
const getData = (event: Event): void => {
    const data: object = context.getDataForm(event as SubmitEvent) as object;
    user.value = data as User;
    login();
}

const login = async (): Promise<void> => {
    const authStore = useAuthStore();

    await authStore.authenticateUser(user.value);

    if (authStore.authenticated) {
        if (authStore.account_type === 'student') {
            router.push('/students/students_exam');
            Success(`Logged in as ${authStore.account_type} successfully!`);
        } else if (authStore.account_type === 'admin') {
            router.push('/');
            Success(`Logged in as ${authStore.account_type} successfully!`);
        }
    }
};
/**
 * End::Some logical in this component
 */
</script>