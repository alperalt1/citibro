import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const accessToken = localStorage.getItem("CitibrokersAccessToken") as string;
const refreshToken = localStorage.getItem("CitibrokersRefreshToken") as string;

interface AuthState {
  authenticated: boolean;
  accessToken: string;
  resfreshToken: string;
  permissions: Record<string, string[]> | null;
}

interface Authentication {
  authenticated: boolean;
  accessToken: string;
  resfreshToken: string;
  permissions?: null
}

const initialState: AuthState = {
  authenticated: accessToken != null && accessToken != "",
  accessToken: accessToken,
  resfreshToken: refreshToken,
  permissions: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<Omit<Authentication, "permissions" | "authenticated">>) => {
      state.authenticated = !!action.payload.accessToken && !!action.payload.resfreshToken;
      state.accessToken = action.payload.accessToken;
      state.resfreshToken = action.payload.resfreshToken;
      localStorage.setItem("CitibrokersAccessToken", action.payload.accessToken);
      localStorage.setItem("CitibrokersRefreshToken", action.payload.resfreshToken);
    },
    signOut: (state) => {
      state.authenticated = false;
      state.permissions = null;
      localStorage.setItem("CitibrokersAccessToken", "");
      localStorage.setItem("CitibrokersRefreshToken", "");
    },
    setPermissions: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.permissions = action.payload;
    },
  },
});

export const {
  signIn,
  signOut,
  setPermissions,
} = authSlice.actions;
