import { Link } from "react-router-dom"
import img from "../../public/pngwing.com.png"

const HomePage = () => {
    return (
        <><div className="con  bg-red-400">
            <div className="nav flex justify-between mx-12 pt-4 border-b border-black pb-6 items-center ">
                <div className="title text-xl font-bold tracking-widest">Medium</div>
                <div className="buttons flex gap-4">
                <Link to={"/signin"} className="text-sm bg-black rounded-lg text-white px-6 py-2">Sign up</Link>
                <Link to={"/signin"} className="text-sm bg-black rounded-lg text-white px-6 py-2">Sign In</Link>

    
                </div>

            </div>
            <div className="main bg-red-400 h-[662px] flex items-center gap-[200px]">
                <div className="left  ml-16 w-[800px]   ">
                    <div className="heading text-[130px]">Stay curious.</div>
                    <div className="para  text-xl">Discover stories, thinking, and expertise from writers on any topic,<br></br>Don't be like this guy. </div>
                    <div className="button mt-8 flex gap-4">
                       
                        <Link to={"/signin"} className="text-xl bg-black rounded-lg text-white px-6 py-2">Start Writing</Link>
                        <Link to={"/signin"} className="text-xl bg-black rounded-lg text-white px-6 py-2">Start Exploring</Link>
                    </div>
                </div>
                <div className="right min-w-[300px]">
                    <img src={img} alt="" className="h-[400px] w-[400px]" />
                </div>

            </div>
        </div>
        </>
    )
}

export default HomePage 
