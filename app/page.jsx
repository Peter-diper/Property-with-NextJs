import Link from "next/link";


const HomePage = () => {
  return (
    <>
      <h1 className="text-center font-bold text-white border order-gray-600 bg-green-400/80 rounded-2xl max-w-140 m-auto  mt-2">
        Welcome
      </h1>
      <Link href="/properties">Show Properties</Link>
    </>
  );
};

export default HomePage;
