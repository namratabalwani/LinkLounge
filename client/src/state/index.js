import { createSlice } from "@reduxjs/toolkit";
// import { stat } from "fs";

const initialState = {
    mode: "light",
    user: "null",
    token: "null",
    posts: [],
    friends: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.friends = action.payload.friends;
            } else {
                console.error("Friends non-existent");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts.slice();
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map(post => {
                if (post?._id === action.payload?.post?.updatedPost?._id) return action.payload.post.updatedPost;
                return post;
            });
            state.posts = updatedPosts.slice();
        }
    }
})

export const { setFriends, setLogin, setLogout, setMode, setPost, setPosts } = authSlice.actions;
export default authSlice.reducer;
