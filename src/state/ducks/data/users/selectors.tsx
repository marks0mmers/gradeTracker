import { RootState } from "../../../rootReducer";

export const getCurrentUser = (state: RootState) => state.data.user.currentUser;
export const getUsers = (state: RootState) => state.data.user.users;
