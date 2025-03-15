import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware((to) => {
    const { authenticated } = storeToRefs(useAuthStore());
    const token = useCookie("token");

    if (token.value) {
        authenticated.value = true;
    }

    if (token.value && (to.name === "signin" || to.name === "student_signin" || to.name === "signin_choose")) {
        return navigateTo("/");
    }

    if (!token.value && to.name !== "signin_choose" && to.name !== "signin" && to.name !== "student_signin") {
        abortNavigation();
        return navigateTo("/signin_choose");
    }
});
