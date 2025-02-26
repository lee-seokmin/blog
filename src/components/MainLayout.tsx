import Card from "@/components/Card";

export default function MainLayout() {
  const dummyPosts = Array(10).fill(null);

  return (
    <div className="flex flex-col gap-5 w-full max-w-[900px] mx-auto p-2">
      <ul className="flex flex-row align-center justify-center text-xl">
        <li className="border-b-2 border-transparent hover:border-red-300 cursor-pointer pl-5 pr-5">Posts</li>
        <li className="border-b-2 border-transparent hover:border-red-300 cursor-pointer pl-5 pr-5">Folder</li>
      </ul>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col gap-5 w-full md:w-4/5">
          <h1 className="text-xl font-bold italic hover:underline cursor-pointer">Best Posts.</h1>
          <Card />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold italic pb-2 md:pr-5 border-b border-current cursor-pointer">Memos.</h1>
          <p>dsad</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10 grid-cols-1">
        {dummyPosts.map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  );
}