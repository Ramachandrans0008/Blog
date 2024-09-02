import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const [post, setpost] = useState(null);
  const { id } = useParams();

  const fetchpost = async () => {
    try {
      const response = await axios.get(`https://blog-server-yd8b.onrender.com/api/posts/${id}`);

      setpost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchpost();
  }, []);
  if (!post) {
    return <p>Loading.....</p>;
  }
  const formattedDate = Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.createdAt));
  return (
    <>
      <main class="container my-4">
        <div class="row">
          <article class="col-lg-8">
            <h2 class="blog-post-title">{post.title}</h2>
            <p class="blog-post-meta">
              {formattedDate} by <a href="#">{post.author}</a>
            </p>

            <img class="mb-3 img-fluid" src={post.image} alt="" />

            <div class="blog-post-content">
              <p>{post.content}</p>
            </div>
          </article>
        </div>
      </main>
    </>
  );
};

export default PostDetail;
