import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware((to) => {
    const { authenticated } = storeToRefs(useAuthStore());
    const token = useCookie("token");

    if (token.value) {
        authenticated.value = true;
    }

    if (token.value && (to.name === "signin" || to.name === "student_signin" || to.name === "signin_choose" || to.name === "student_register")) {
        return navigateTo("/");
    }

    if (!token.value && to.name !== "signin_choose" && to.name !== "signin" && to.name !== "student_signin" && to.name !== "student_register") {
        abortNavigation();
        return navigateTo("/signin_choose");
    }
});
