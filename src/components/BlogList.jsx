import React, { useState, useEffect, useContext } from "react";

import BlogItem from "./BlogItem";
import http from "../shared/http-common";
import { AuthContext } from "../shared/auth-context";

const BlogList = () => {
  const auth = useContext(AuthContext);
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http
      .get("/", { headers: { Authorization: "Bearer " + auth.token } })
      .then((res) => setBlogList(res.data))
      .catch((err) => console.log(err))
      .then(() => setLoading(false));
  }, [auth.token, blogList]);

  if (!loading) {
    blogList.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();

    const listOfEntries = blogList.map((entry) => {
      const longDate = Date.parse(entry.date);
      const month = new Date(longDate).toLocaleString("default", {
        month: "long",
      });
      const date = new Date(longDate).getDate();
      const year = new Date(longDate).getFullYear();

      return (
        <BlogItem
          key={entry.id}
          id={entry.id}
          title={entry.title}
          content={entry.content}
          date={date}
          month={month}
          year={year}
        />
      );
    });

    return <div>{listOfEntries}</div>;
  } else {
    return <div>Loading...</div>;
  }
};

export default BlogList;
