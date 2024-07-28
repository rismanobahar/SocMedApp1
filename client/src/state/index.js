import { createSlice } from "@reduxjs/toolkit";

const initialState = { //a global state so you dont have to parse in this state on different component
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"; //for dark and light mode 
        },
        setLogin: (state, action) => { //used for after login function
            state.user = action.payload.user; //filling up the user information
            state.token = action.payload.token;//inserts user token
        },
        setLogout: (state) => { //when user already log  out the state will be cleared
            state.user = null;  
            state.token = null;
        },
        setFriends: (state, action) => { //if the logged in user exit, this will load the user's friends
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :(");
            }
        },
        setPosts: (state, action) => { //set or shows the created post
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => { //set the updated post
            const updatedPosts = state.posts.map((post) => { //map the selected post
                if (post._id === action.payload.post._id) return action.payload.post; //if the selected post id matched with the updated post id, return the updated post
                return post; //return the post
            });
            state.posts = updatedPosts; //the updated post will showed at the created post
        },
    },
});

export const { setMode, setLogin, setLogout, setFriends, setPost, setPosts } = 
    authSlice.actions;
export default authSlice.reducer;