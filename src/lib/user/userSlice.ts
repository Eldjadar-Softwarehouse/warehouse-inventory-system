import moment from "moment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
import {
  SignInPayload,
  ForgotPasswordPayload,
  NewPasswordPayload,
  NewGAuthSetupPayload,
} from "@/models/auth";
import { getHeaders } from "@/utils/headerPayload";

export const signIn = createAsyncThunk(
  "signIn",
  async ({ username, password }: SignInPayload) => {
    const headers = await getHeaders();
    const timestamps = moment().format("DD-MM-YYYY HH:mm:ss");

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
          timestamps: timestamps,
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
    const timestamps = moment().format("DD-MM-YYYY HH:mm:ss");

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
          timestamps: timestamps,
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
    const timestamps = moment().format("DD-MM-YYYY HH:mm:ss");

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
          timestamps: timestamps,
        }),
      }
    );

    const data = await response.json();

    return data;
  }
);

export const newGAuthSetup = createAsyncThunk(
  "newGAuthSetup",
  async ({ tempToken, gcode }: NewGAuthSetupPayload) => {
    const headers = await getHeaders();
    const timestamps = moment().format("DD-MM-YYYY HH:mm:ss");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/v01/new-gauth-setup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          Authorization: `Bearer ${tempToken}`,
        },
        body: JSON.stringify({
          gcode,
          timestamps: timestamps,
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
    menu: [],
  },
  reducers: {
    signedOut: (state) => {
      state.isSignin = false;
    },
    resetErrorState: (state) => {
      state.isError = false;
      state.errorMessage = "";
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
      const support = action.payload.support;

      const hasSecurityChecklist = support && "securitychecklist" in support;
      const hasSecuritySetup = support && "securitysetup" in support;

      if (payloadStatus === 1 && hasSecurityChecklist && !hasSecuritySetup) {
        state.security = support!.securitychecklist.security.map(
          (sec: any) => sec.ucs_name
        );
        state.tempToken = support!.temptoken;
        state.isSignin = true;
      } else if (
        payloadStatus === 1 &&
        !hasSecurityChecklist &&
        hasSecuritySetup
      ) {
        state.setupUrl = support!.securitysetup.dataurl;
        state.tempToken = support!.temptoken;
        state.isSignin = true;
        state.isSetup = true;
      } else {
        console.log("error");
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

    // New GAuthSetup
    builder.addCase(newGAuthSetup.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(newGAuthSetup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;

      if (action.payload.status.status === 1) {
        console.log("success");

        setCookie("token", action.payload.support.token);

        state.menu = action.payload.data.map((item: any) => {
          return {
            group: item.group,
            extended: item.extended,
            feature: item.feature.map((featureItem: any) => {
              return {
                subMenu: featureItem.sub_menu,
                subMenuRoute: featureItem.sub_menu_route,
                extended: featureItem.extended,
                feature: featureItem.feature.map((subFeature: any) => ({
                  subMenu: subFeature.sub_menu,
                  subMenuRoute: subFeature.sub_menu_route,
                })),
              };
            }),
          };
        });
      } else if (action.payload.status.status === 0) {
        state.isError = true;
        state.errorMessage = action.payload.status.message[0].errormessage;
      }
    });
    builder.addCase(newGAuthSetup.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { signedOut, resetErrorState } = userSlice.actions;

export default userSlice.reducer;
