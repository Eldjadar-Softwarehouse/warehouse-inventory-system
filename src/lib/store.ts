import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter/counterSlice";
import userSlice from "./user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice,
      user: userSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
