import { Link } from "react-router-dom";

interface BlogCardProps {
  author: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

const BlogCard = ({
  author,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-300 pb-4 w-screen max-w-screen-lg cursor-pointer">
        <div className="flex">
          <Avatar author={author} />
          <div className="font-extralight pl-2 flex justify-center flex-col">
            {author}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500">{publishedDate}</div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-400 text-sm font-thin">
          {content.length / 100} minute(s) read
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
  author,
  size = "small",
}: {
  author: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {author[0]}
      </span>
    </div>
  );
}

export default BlogCard;
