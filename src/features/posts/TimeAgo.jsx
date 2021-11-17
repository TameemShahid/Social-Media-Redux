import { parseISO } from "date-fns";
import { formatDistanceToNow } from "date-fns/esm";
import React from "react";

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp} style={{ marginLeft: "auto" }}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
