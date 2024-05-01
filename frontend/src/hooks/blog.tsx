import { useEffect, useState } from "react";
import axios from "axios";
import BACKEND_URL from "../../config.ts";

export interface Blog {
  title: string;
  content: string;
  id: number;
  author: {
    name: string;
  };
}

function useBlog() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlog = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setBlogs(res.data.blogs);
    setLoading(false);
  };
  useEffect(() => {
    getBlog();
  }, []);

  return { loading, blogs };
}
export default useBlog;
