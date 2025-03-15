<template>
    <div
        class="h-[100vh] w-full">
        <img
            :src="BackgroundLogin"
            alt="Logo"
            class="object-cover w-full h-full opacity-90"
            loading="lazy" />
    </div>
[    <div
        class="flex h-full w-full absolute top-0 left-0 justify-center items-center shadow-sm overflow-hidden">
        <div
            class="form-submit w-1/2 flex items-center justify-center">
            <form
                name="signin"
                method="POST"
                enctype="multipart/form-data"
                class="panel-login p-6 rounded-md z-10  py-10 flex flex-col w-[80%] overflow-hidden relative justify-center gap-3 bg-white"
                @submit.prevent="getData">
                <img 
                    :src="Technology" 
                    alt=""
                    class="w-[350px] h-[350px] opacity-20 absolute bottom-[10px] right-[10px]">
                <h4
                    class="text-[2rem] text-sky-300 text-center font-normal ">
                    Welcome Back
                    <p class="text-center text-[.9rem] text-gray-400 font-thin">
                        You are about to login as student account.
                    </p>
                </h4>
                <div
                    v-if="messages" 
                    class="w-full p-3 border-[1px] rounded-md border-red-300">
                    <p class="text-[1rem] font-thine  text-red-500">
                        {{ messages }}
                    </p>
                </div>
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
                    label="Student Login"
                    square/>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    Validation,
    Context
} from "@/composable/validateHandler/";
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
    Technology
} from "@/assets/images";
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
  password: string
}
/**
 * End::Declare interface section
 */

/**
 * Begin::Declare variable object section
 */
const context: GetDataContext = new GetDataContext(new GetDataNormalForm());
const validate: Context = new Context(new Validation());
/**
 * End::Declare variable object section
 */

/**
 * Begin::Declare variable section
 */
const user: Ref<User> = ref<User>({
    username: '',
    password: ''
});
const { 
    authenticateUser 
} = useAuthStore();
const {
    authenticated,
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
    await authenticateUser(user.value);
    if(authenticated)
    {
        router.push('/students/students_exam');
    }
}
/**
 * End::Some logical in this component
 */
</script>