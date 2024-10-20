import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import Skeleton from "../components/Skeleton";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="">
        <Appbar />
        <div className="flex justify-center items-center flex-col">
          <div className="">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <Appbar />
      <div className="flex justify-center">
        <div className="flex justify-center flex-col">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              author={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate="19th October"
              id={blog.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
