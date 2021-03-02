import React from "react";
import { Link } from "react-router-dom";

import "./BlogItem.css";

const BlogItem = (props) => {
  return (
    <div>
      <Link className="link-title" to={`${props.id}`}>
        <h3>{props.title}</h3>
      </Link>
      <p>
        {props.content.length > 250
          ? props.content.substring(0, 250) + "..."
          : props.content}
      </p>
      <hr />
    </div>
  );
};

export default BlogItem;
