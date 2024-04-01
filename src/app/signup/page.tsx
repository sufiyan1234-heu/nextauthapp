"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
      const res = await axios.post("/api/users/signup", user);
      console.log(res);
      if (res.data.success) {
        Swal.fire({
          title: "Success",
          text: "User created successfully",
          icon: "success",
        });
        router.push("/login");
      }
      if (res.data.status === 400) {
        Swal.fire({
          title: "Error!",
          text: "User already exists",
          icon: "error",
          confirmButtonText: "close",
        });
      }
      setLoading(false);
      setButtonDisabled(false);
      setUser({
        email: "",
        password: "",
        username: "",
      });
    } catch (error: any) {
      console.log("signup failed", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center">
      <div
        className="flex flex-col items-start justify-center
  min-h-screen py-2 gap-2 "
      >
        <h1 className="flex justify-center items-center w-full font-bold text-5xl">
          {loading ? "Processing" : "Signup"}
        </h1>

        <hr />
        <label htmlFor="username" className="font-medium">
          username
        </label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black
      "
          id="username"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          type="email"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black
      "
          id="email"
          placeholder="Email Address"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password" className="font-medium">
          Password{" "}
        </label>
        <input
          type="password"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black
      "
          id="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className={`py-2 px-8 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
            buttonDisabled ? "text-red-600" : ""
          } `}
        >
          {buttonDisabled ? "Fill form First!" : "SignUp"}
        </button>
        <div className="text-xs">
          <p>
            Already have an account?
            <Link
              className=" text-gray-600 ml-1 hover:underline"
              href={"/login"}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
