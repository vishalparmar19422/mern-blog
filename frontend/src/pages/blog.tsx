import Blogcard from "../components/blogCard";
import Nav from "../components/nav";
import Skeleton from "../components/skeleton";
import useBlog from "../hooks/blog";

const Blog = () => {
  const { loading, blogs } = useBlog();

  if (loading) {
    return (
      <>
        <div className="nav">
          <Nav />
        </div>
        <div className="skeloton flex  flex-col w-full h-1/2 items-center ">
          <Skeleton />
          <Skeleton />
          <Skeleton />


        </div>
      </> 
    );
  }
  return (
    <>
      <Nav />
      <div className="content flex justify-center">
        <div className="main">
          {blogs.map((blog) => {
            return (
              <Blogcard
                id={blog.id}
                key={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                date="25 march 2024"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blog;
