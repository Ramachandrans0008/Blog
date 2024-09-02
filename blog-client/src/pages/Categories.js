import React, { useEffect, useState } from "react";
import Post from "../components/post";
import axios from "axios";
import { useParams } from "react-router-dom";

const Categories = () => {
  const [posts, setposts] = useState([]);
  const [category, setcategory] = useState(null);
  const { id } = useParams();

  const fetchposts = async () => {
    const response = await axios.get(
      `https://blog-server-yd8b.onrender.com/api/posts/category/${id}`
    );
    setposts(response.data);
  };
  const fetchcategory = async () => {
    const response = await axios.get(
      `https://blog-server-yd8b.onrender.com/api/categories/${id}`
    );
    setcategory(response.data);
  };

  useEffect(() => {
    fetchposts();
    fetchcategory();
  }, []);

  if (!category) {
    return <p>Loading.....</p>;
  }

  return (
    <>
      <main>
        <div class="container mt-4">
          <div class="row">
            <div class="col-lg-8">
              <h1 class="mb-4">{category.name}</h1>

              {posts.length > 0 ? (
                posts.map((post) => <Post post={post} />)
              ) : (
                <h4>No Posts available</h4>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Categories;
