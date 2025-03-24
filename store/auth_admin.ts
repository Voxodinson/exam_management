import { defineStore } from 'pinia';

interface UserPayloadInterface {
    username: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        messages: '',
        username: '',
        status: '',
        account_type: ''
    }),
    actions: {
        async authenticateUser({ username, password }: UserPayloadInterface) {
            const base_url: ImportMetaEnv = import.meta.env.VITE_BASE_URL;
            try {
                const data: any = await $fetch(`${base_url}admin/v1/web/auth/login`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                if (data?.data?.token) {
                    const token: any = useCookie('token');
                    token.value = data?.data?.token;
                    this.username = data?.data?.user_name;
                    this.status = data?.status;
                    this.account_type = data?.data?.account_type;

                    // Check if the account type is 'admin'
                    if (this.account_type !== 'Admin') {
                        this.authenticated = false;
                        this.messages = 'Your account type is not authorized to log in.';
                        token.value = null;
                        return; // Early return to prevent further code execution
                    }

                    this.authenticated = true;
                    localStorage.setItem('username', this.username);
                    this.messages = 'Logged in successfully';

                    setTimeout(() => {
                        this.messages = '';
                    }, 3000);
                } else {
                    this.authenticated = false;
                    this.messages = 'Invalid credentials, please try again.';
                }
            } catch (error) {
                this.authenticated = false;
                this.messages = 'Authentication failed, please try again.';
            }
        },

        logUserOut() {
            const token: any = useCookie('token');
            this.authenticated = false;
            token.value = null;
            localStorage.removeItem('username');
            this.messages = 'Logging out successfully...';
        }
    }
});
