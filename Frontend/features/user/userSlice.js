import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRegisterUser, fetchLoginUser, fetchLogoutUser } from './userAPI';

interface userThunk {
    username: string;
    password: string;
}

type user = {
    token: string;
}

type userState = {
    user: user | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: userState = {
    user: null,
    status: 'idle',
    error: null,
};

export const fetchRegisterUser = createAsyncThunk(
    'user/fetchRegisterUser',
    async ({ username, password }: userThunk, { rejectWithValue }) => {
        const response = await fetchRegisterUser(username, password);
        const responseJson = await response.json();
        console.log(responseJson.message.toString());
        if (!response.ok) {
            return rejectWithValue("Failed to register user");
        } else if (responseJson.message.toString() === "Usuario registrado correctamente") {
            return responseJson;
        } else {
            return rejectWithValue(responseJson.message.toString());
        }
    }
);

export const fetchLoginUserThunk = createAsyncThunk(
    'user/fetchLoginUser',
    async ({ username, password }: userThunk, { rejectWithValue }) => {
        const response = await fetchLoginUser(username, password);
        const responseJson = await response.json();
        console.log(responseJson.message.toString());
        if (!response.ok) {
            return rejectWithValue("Failed to login user");
        } else if (responseJson.message.toString() === "Usuario logueado correctamente") {
            return responseJson;
        } else {
            return rejectWithValue(responseJson.message.toString());
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        adduser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRegisterUser.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = null;
            state.user = action.payload;
            alert('Usuario registrado correctamente');
        })
            .addCase(fetchRegisterUser.rejected, (state, action) => {
                state.status = 'failed';
                state.user = null;
                state.error = action.payload;
                alert('No es posible registrar el usuario');
            })
            .addCase(fetchLoginUserThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                alert('No es posible iniciar sesión');
            })
            .addCase(fetchLoginUserThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload;
                state.error = action.payload;
            });
    },
});

export const { adduser } = userSlice.actions;
export default userSlice.reducer;