import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import http from "../shared/http-common";
import { AuthContext } from "../shared/auth-context";
import LoadingSpinner from "../shared/LoadingSpinner";

const Edit = (props) => {
  const auth = useContext(AuthContext);
  const [foundBlog, setFoundBlog] = useState({});
  const [loading, setLoading] = useState(true);

  const url = useParams().vivoid;

  useEffect(() => {
    http
      .get(url, { headers: { Authorization: "Bearer " + auth.token } })
      .then((res) => setFoundBlog(res.data[0]))
      .catch((err) => console.log(err))
      .then(() => setLoading(false));
  }, [url, auth.token]);

  if (!loading) {
    return (
      <div>
        <h6>{foundBlog.title}</h6>
        <hr />
        <p>Do you want to edit this article now?</p>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
};

export default Edit;
