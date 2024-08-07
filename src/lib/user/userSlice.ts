import moment from "moment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  SignInPayload,
  ForgotPasswordPayload,
  NewPasswordPayload,
} from "@/models/auth";
import { getHeaders } from "@/utils/headerPayload";

export const signIn = createAsyncThunk(
  "signIn",
  async ({ username, password }: SignInPayload) => {
    const headers = await getHeaders();
    const signinTime = moment().format("DD-MM-YYYY HH:mm:ss");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/v01/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          username,
          password,
          timestamps: signinTime,
        }),
      }
    );

    const data = await response.json();

    return data;
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async ({ username }: ForgotPasswordPayload) => {
    const headers = await getHeaders();
    const signinTime = moment().format("DD-MM-YYYY HH:mm:ss");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/v01/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          username,
          timestamps: signinTime,
        }),
      }
    );

    const data = await response.json();

    return data;
  }
);

export const newPassword = createAsyncThunk(
  "newPassword",
  async ({ password, cpassword, code }: NewPasswordPayload) => {
    const headers = await getHeaders();
    const signinTime = moment().format("DD-MM-YYYY HH:mm:ss");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/v01/new-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          password,
          cpassword,
          code,
          timestamps: signinTime,
        }),
      }
    );

    const data = await response.json();

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: "",
    data: null,
    isSignin: false,
    isSetup: false,
    security: [],
    setupUrl: "",
    tempToken: "",
    token: "",
  },
  reducers: {
    signedOut: (state) => {
      state.isSignin = false;
    },
  },
  extraReducers: (builder) => {
    // Sign In
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;

      const payloadStatus = action.payload.status.status;
      const hasSecurityChecklist =
        "securitychecklist" in action.payload.support;
      const hasSecuritySetup = "securitysetup" in action.payload.support;

      if (payloadStatus === 1 && hasSecurityChecklist && !hasSecuritySetup) {
        state.security = action.payload.support.securitychecklist.security.map(
          (sec: any) => sec.ucs_name
        );
        state.tempToken = action.payload.support.temptoken;
        state.isSignin = true;
      } else if (
        payloadStatus === 1 &&
        !hasSecurityChecklist &&
        hasSecuritySetup
      ) {
        state.setupUrl = action.payload.support.securitysetup.dataurl;
        state.tempToken = action.payload.support.temptoken;
        state.isSignin = true;
        state.isSetup = true;
      } else {
        state.isError = true;
        state.errorMessage = action.payload.status.message[0].errormessage;
      }
    });

    // Forgot Password
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      if (action.payload.status.status === 0) {
        state.isError = true;
        state.errorMessage = action.payload.status.message[0].errormessage;
      }
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // New Password
    builder.addCase(newPassword.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(newPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      if (action.payload.status.status === 0) {
        state.isError = true;
        state.errorMessage = action.payload.status.message[0].errormessage;
      }
    });
    builder.addCase(newPassword.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { signedOut } = userSlice.actions;

export default userSlice.reducer;
