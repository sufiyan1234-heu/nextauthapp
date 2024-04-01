"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserData = async () => {
    const res = await axios.post("/api/users/aboutme");
    console.log(res.data.data._id);
    setData(res.data.data._id);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="flex flex-col items-center
  justify-center min-h-screen py-2"
    >
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700
      text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700
      text-white font-bold py-2 px-4 rounded"
        onClick={getUserData}
      >
        Get Data
      </button>
    </div>
  );
}
