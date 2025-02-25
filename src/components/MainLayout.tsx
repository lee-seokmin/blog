import Card from "@/components/Card";

export default function MainLayout() {
  const dummyPosts = Array(10).fill(null);

  return (
    <div className="flex w-1/3 m-auto flex-col gap-5">
      <ul className="flex flex-row align-center justify-center text-xl">
        <li className="border-b-2 border-transparent hover:border-red-300 cursor-pointer pl-5 pr-5">Posts</li>
        <li className="border-b-2 border-transparent hover:border-red-300 cursor-pointer pl-5 pr-5">Folder</li>
      </ul>
      <div className="grid grid-cols-2 gap-5">
        {dummyPosts.map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  );
}