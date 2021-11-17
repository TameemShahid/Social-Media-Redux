import { sub } from "date-fns";
import { client } from "../../api/client";
const { createSlice, nanoid, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  posts: [],
  status: "idle",
  error: null
};

// Thunks
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    AddPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userID) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            userID,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0
            }
          }
        };
      }
    },
    EditPost(state, action) {
      const { id, title, content } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    AddReaction(state, action) {
      const { postID, reaction } = action.payload;
      const post = state.posts.find((post) => post.id === postID);
      if (post) {
        post.reactions[reaction]++;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

// exporting actions
export const { AddPost, EditPost, AddReaction } = postsSlice.actions;

export default postsSlice.reducer;

// Selectors
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => {
  return state.posts.posts.find((post) => post.id === postId);
};
