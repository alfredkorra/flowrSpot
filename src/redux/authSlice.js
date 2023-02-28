import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const signUpUser = createAsyncThunk("signupuser", async (body) => {
  const res = await fetch(
    "https://flowrspot-api.herokuapp.com/api/v1/users/register",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  console.log(localStorage.getItem("auth_token"))
  return await res.json();
});


export const signInUser = createAsyncThunk("signinuser", async (body) => {
  const res = await fetch(
    "https://flowrspot-api.herokuapp.com/api/v1/users/login",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return await res.json();
});



const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    auth_token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.auth_token = action.payload.auth_token;
        // console.log(JSON.stringify(action.payload.auth_token));
        localStorage.setItem("auth_token", (action.payload.auth_token));
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.auth_token = null;
      });
  },
});

export const { addToken, addUser, logout } = authSlice.actions;
export default authSlice.reducer;
