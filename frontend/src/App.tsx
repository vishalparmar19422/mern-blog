import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Blog from "./pages/blog";
import Fullblog from "./pages/fullBlog";
import Writeblog from "./pages/writeBlog";
import HomePage from "./pages/homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Fullblog />} />
          <Route path="/writeBlog" element={<Writeblog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
