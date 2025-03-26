import { 
    defineStore 
} from 'pinia';
import { 
    Success 
} from '@/utils/dialog';
import {Error} from '@/utils/dialog';
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
        account_type: '',
        auth_id: '',
        profile: ''
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
                    this.auth_id = data?.data?.student?.id;
                    this.profile = data?.data?.profile;

                    localStorage.setItem('auth_id', this.auth_id);
                    localStorage.setItem('username', this.username);

                    this.authenticated = this.account_type === 'student' || this.account_type === 'admin';

                    if (!this.authenticated) {
                        this.messages = 'Your account type is not authorized to log in.';
                        token.value = null;
                        localStorage.removeItem('auth_id');
                        return;
                    }
                } else {
                    this.authenticated = false;
                    Error('Invalid credentials, please try again.');
                }
                
            } catch (error) {
                this.authenticated = false;
                Error('Authentication failed, please try again.');
            }
        },

        logUserOut() {
            const token: any = useCookie('token');
            this.authenticated = false;
            token.value = null;
            localStorage.removeItem('username');
            localStorage.removeItem('auth_id');
            Success('Logout successfully!');
        }
    }
});
