import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/ProfileSlices";
import authReducer from "../features/auth/AuthSlices";
import transactionReducer from "../features/transaction/TransactionSlices";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    transaction: transactionReducer,
  },
});
