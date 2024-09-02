import React, { useEffect, useState } from "react";
import Post from "../components/post";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setposts] = useState([]);
  const [category, setcategory] = useState([]);

  const fetchposts = async () => {
    const response = await axios.get("https://blog-server-yd8b.onrender.com/api/posts");
    setposts(response.data);
  };
  const fetchcategory = async () => {
    const response = await axios.get("https://blog-server-yd8b.onrender.com/api/categories");
    setcategory(response.data);
  };

  useEffect(() => {
    fetchposts();
    fetchcategory();
  }, []);

  return (
    <>
      <main>
        <div class="container mt-4">
          <div class="row">
            <div class="col-lg-8">
              <h1 class="mb-4">Latest Posts</h1>

              {posts.length > 0 ? (
                posts.map((post) => <Post post={post} />)
              ) : (
                <h4>No Posts available</h4>
              )}
            </div>
            <div class="col-lg-4">
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">About Me</h5>
                  <p class="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>

              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">Categories</h5>
                  <ul class="list-group">
                    {category.map((category) => (
                      <li class="list-group-item">
                        <Link
                          to={`/posts/category/${category._id}`}
                          class="text-black"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PostList;
