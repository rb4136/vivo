import React from "react";
import { Link } from "react-router-dom";

import "./BlogItem.css";

const BlogItem = (props) => {
  return (
    <div className="row">
    <div className="col-md-9">
      <Link className="link-title" to={`${props.id}`}>
        <h3>{props.title}</h3>
      </Link>
      <p>
        {props.content.length > 250
          ? props.content.substring(0, 250) + "..."
          : props.content}
      </p>
      </div>
      <div className="col-md-3">
        <button className="btn btn-outline-dark float-end position-relative top-50 start-0 translate-middle">Delete</button>
      </div>
      <hr />
    </div>
  );
};

export default BlogItem;
