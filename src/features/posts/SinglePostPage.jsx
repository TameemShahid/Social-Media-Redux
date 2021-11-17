import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { selectPostById } from "./postsSlice";

export const SinglePostPage = ({ match }) => {
  const { postID } = match.params;

  const post = useSelector((state) => selectPostById(state, postID));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userID={post.userID} />
        <TimeAgo timestamp={post.date} />
        <br />
        <br />
        <ReactionButtons post={post} />
        <Link to={`/editPost/${postID}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};
