export default function page({ params }: any) {
  return (
    <div className="flex justify-center flex-col items-center h-screen gap-3 bg-green-300 text-black">
      <h1 className="text-4xl font-semibold">Profile Page</h1>
      <div className="bg-white text-black p-3">{params.id}</div>
    </div>
  );
}
