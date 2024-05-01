import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/nav";
import Skeleton from "../components/skeleton";
import BACKEND_URL from "../../config.ts"

const Fullblog = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog]: any = useState([]);

  const getBlog = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setBlog(res.data.blog);
    setLoading(false);
  };
  useEffect(() => {
    getBlog();
  }, []);
  if (loading) {
    return (
      <div className="main">
        <Nav />

        <div className="skeleton w-full h-1/2 flex justify-center">
          <Skeleton />
        </div>
      </div>
    );
  }

  const authorName = blog?.author?.name || "Anonymous";
  return (
    <>
      <Nav />
      <article className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-5xl font-bold leading-tight mb-4">{blog.title}</h1>
        <p className="text-gray-600  mb-8 text-md">Posted on August 24, 2023</p>
        <div className="flex space-x-8">
          <div className="w-4/5">
            <p className="text-lg leading-relaxed mb-6">{blog.content}</p>
          </div>
          <aside className="w-1/5">
            <div className="w-full top-8">
              <div className="avatar h-8 w-8 text-xl bg-slate-400 flex justify-center  items-center rounded-full">
                {authorName[0]}
              </div>

              <h4 className="text-lg font-semibold">{authorName}</h4>
              <p className="text-gray-700">
                Some random Fact about user that might be intresting.
              </p>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
};

export default Fullblog;
