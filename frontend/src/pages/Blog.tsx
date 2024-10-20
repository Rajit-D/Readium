import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import BlogPage from "../components/BlogPage";
import Appbar from "../components/Appbar";
import Spinner from "../components/Spinner";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  console.log(blog);
  if (loading) {
    return (
      <div className="">
        <Appbar />
        <div className=" h-screen flex justify-center items-center flex-col">
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <div>
      <BlogPage blog={blog} />
    </div>
  );
};

export default Blog;
