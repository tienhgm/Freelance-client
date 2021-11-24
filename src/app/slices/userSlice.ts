import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword, getProfile, getReviewsById, handleUploadAvt, updateProfile } from "apis/userModule";
import handleErrorMessage from "utils/handleErrorMessage";
import { notify } from "utils/notification";
import { handleLoading } from "./appSlice";
interface UserSlice {
    isChangePassword: boolean;
    curUser: any;
    reviews: any;
}
const initialState: UserSlice = {
    isChangePassword: false,
    curUser: {},
    reviews: null
}
export const uploadAvt = createAsyncThunk("user/uploadAvt", async (payload: any) => {
    try {
        const res: any = await handleUploadAvt(payload);
        if (res.statusCode === 200) {
            notify("success", "Upload Success", "");
            return res.data.avatar;
        }
    } catch (error) {
        notify("error", "Upload Error!", "");
    }
});
export const handleChangePassword = createAsyncThunk("user/changePassword", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res: any = await changePassword(payload);
        if (res.statusCode === 200) {
            notify("success", "Password change!", "");
            return res.data.status;
        }
    } catch (error: any) {
        handleErrorMessage(error.data.errors);
    } finally {
        dispatch(handleLoading(false));
    }
});
export const handleGetProfile = createAsyncThunk("user/profile", async (payload: any) => {
    try {
        const res: any = await getProfile(payload);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleUpdateProfile = createAsyncThunk("user/updateProfile", async (payload: any, { dispatch }) => {
    try {
        dispatch(handleLoading(true));
        const res: any = await updateProfile(payload);
        if (res.statusCode === 200) {
            notify("success", "Update Success!", "")
            return res.data;
        }
    } catch (error) { } finally {
        dispatch(handleLoading(false));
    }
});
export const handleGetReviews = createAsyncThunk("user/reviews", async (payload: any) => {
    try {
        let { userId, filters } = payload;
        const res: any = await getReviewsById(userId, filters);
        if (res.statusCode === 200) {
            return res.data;
        }
    } catch (error) { }
});
export const handleGetCurUser = createAsyncThunk("user/curUser", async (payload: any) => {

    let url = "http://14.225.192.239:4000/api/user";
    const res = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ` + payload }
    }).then((res: any) => res.json())
        .then((data) => { return data.data })
        .catch(err => { console.log(err) })
    return res;
});
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser() {
            return initialState;
        },
        changeAvatar(state, payload) {
            state.curUser.avatar = payload.payload
        }
    },
    extraReducers: {
        // @ts-ignore
        [uploadAvt.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.curUser.avatar = action.payload;
        },
        // @ts-ignore
        [handleChangePassword.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.isChangePassword = action.payload;
        },
        // @ts-ignore
        [handleGetReviews.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.reivews = action.payload;
        },
        // @ts-ignore
        [handleGetCurUser.fulfilled]: (state: any, action: PayloadAction<UserSlice>) => {
            state.curUser = action.payload;
        },
    }
});

export const { logoutUser, changeAvatar } = userSlice.actions;
export default userSlice.reducer;
