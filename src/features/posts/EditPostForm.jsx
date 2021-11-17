import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { EditPost, selectPostById } from "./postsSlice";

export const EditPostForm = ({ match }) => {
  const { postID } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  const post = useSelector((state) => selectPostById(state, postID));
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onTitleChange = (event) => setTitle(event.target.value);
  const onContentChange = (event) => setContent(event.target.value);
  const onSavePost = () => {
    if (title && content) {
      dispatch(EditPost({ id: postID, title, content }));
      history.push(`/posts/${postID}`);
    }
  };
  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={onSavePost}>
          Save Post
        </button>
      </form>
    </section>
  );
};
