import { Link } from "react-router-dom";

interface BlogCard {
  authorName: string;
  content: string;
  title: string;
  date: string;
  id: number;
}

const Blogcard = ({ authorName, content, title, date, id }: BlogCard) => {
  const truncateContent = (content: string, wordCount: number) => {
    const words = content.split(" "); // Split the content into words

    if (words.length <= wordCount) {
      // If the number of words is less than or equal to the limit, return the full content
      return content;
    }

    // Otherwise, return the first 'wordCount' words with an ellipsis
    const ans = words.slice(0, wordCount).join(" ") + "...";
    return ans;
  };
  return (
    <Link to={`/blog/${id}`}> 
      <div className="main m-16 border-b-2 pb-8">
        <div className="heading flex gap-2">
          <div className="avatar h-full w-6 bg-slate-400 flex justify-center  items-center rounded-full">
            {authorName[0]}
          </div>
          <h1 className="name">{authorName}</h1>.
          <h1 className="date font-light">{date}</h1>
        </div>
        <div className="title font-extrabold text-xl pt-2">{title}</div>
        <div className="title  text-[15px] pt-1">
          {truncateContent(content, 20)}
        </div>
      </div>
    </Link>
  );
};

export default Blogcard;
