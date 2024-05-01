import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-4 flex justify-between p-4 border-b-2">
      <Link to={"/blog"}>
        <h1 className="log font-bold text-xl">Medium</h1>
      </Link>
      <div className="right flex gap-4 justify-center items-center">
        <button
          onClick={() => {
            navigate("/writeblog");
          }}
          className="p-2 rounded-md bg-green-500 text-white"
        >
          Write Blog
        </button>
        <div className="avatar h-8 w-8 bg-slate-400 flex justify-center  items-center rounded-full">
          V
        </div>
      </div>
    </div>
  );
};

export default Nav;
