import moment from "moment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignInPayload } from "@/models/auth";
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
          timestamp: signinTime,
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
    security: [],
    tempToken: "",
    token: "",
  },
  reducers: {
    signedOut: (state) => {
      state.isSignin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      if (action.payload.status.status === 1) {
        state.security = action.payload.support.securitychecklist.security.map(
          (sec: any) => sec.ucs_name
        );
        state.tempToken = action.payload.support.temptoken;
        state.isSignin = true;
      } else {
        state.isError = true;
        state.errorMessage = action.payload.status.message[0].errormessage;
      }
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { signedOut } = userSlice.actions;

export default userSlice.reducer;
