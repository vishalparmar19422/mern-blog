const Skeleton = () => {
  return (
    <>
      <div  className=" h-[200px] w-[700px]  mt-6 p-4 flex flex-col gap-4 animate-pulse">
        <div className="heading flex gap-4">
          <div className="avatar bg-gray-300 h-6 w-6 rounded-full"></div>
          <div className="date   bg-gray-300 h-6 w-32 rounded-full"></div>
          <div className="date   bg-gray-300 h-6 w-32 rounded-full"></div>
        </div>
        <div className="content flex flex-col gap-4">
            <div className="title h-4 w-48   bg-gray-300 rounded-lg"></div>
            <div className="content h-4 w-[600px] bg-gray-300 rounded-lg"></div>
            <div className="content h-4 w-[650px] bg-gray-300 rounded-lg"></div>
            <div className="content h-4 w-[700px] bg-gray-300 rounded-lg"></div>


        </div>
      </div>
    </>
  );
};

export default Skeleton;
