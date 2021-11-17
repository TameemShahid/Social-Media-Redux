import React from "react";
import { useDispatch } from "react-redux";
import { AddReaction } from "./postsSlice";

const reactionEmojis = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀"
};

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmojis).map(
    ([name, emoji]) => {
      return (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() =>
            dispatch(AddReaction({ postID: post.id, reaction: name }))
          }
        >
          {emoji} {post.reactions[name]}
        </button>
      );
    }
  );

  return <div>{reactionButtons}</div>;
};
