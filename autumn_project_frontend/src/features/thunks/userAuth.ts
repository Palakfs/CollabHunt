import { signupRoute, loginRoute } from '../../route';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



interface RegisterFormData {
    user_enrol: number;
    password: string;
}

interface LoginFormData {
    user_enrol: number;
    password: string;
}

interface AuthResponse {
    access: string;
    refresh: string;
}

export const registerUser = createAsyncThunk<
    void,
    RegisterFormData,
    { rejectValue: string }
>(
    'user/signup/',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(signupRoute, formData);
            if (response.status === 201) {
                console.log("User registered successfully");
                const loginData = { user_enrol: formData.user_enrol, password: formData.password };
                try {
                    const { data } = await axios.post<AuthResponse>(loginRoute, loginData);
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);
                    console.log(localStorage.getItem('access_token'));
                 
                } catch (error: any) {
                    console.log("Error in token fetch: ", error.message);
                }
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue("Some error occurred");
            }
        }
    }
);

export const userLogin = createAsyncThunk<
    void,
    LoginFormData,
    { rejectValue: string }
>(
    'user/login/',
    async (LoginFormData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<AuthResponse>(loginRoute, LoginFormData);
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            
        } catch (error: any) {
            console.log(error.response.data.detail);
            return rejectWithValue(error.response.data.detail);
        }
    }
);

export {};
