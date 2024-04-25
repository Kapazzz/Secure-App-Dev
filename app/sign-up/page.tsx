"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa6";

export default function SignUpPage() {
  // redirect to login page
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [touchedFields, setTouchedFields] = useState({
    username: false,
    email: false,
    password: false
  });


  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log("signup okay", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Failed to sign up the user", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isValidUsername = /^[a-zA-Z0-9]+$/.test(user.username) && user.username.length>=3; //! Only allow letters and numbers in username
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) && user.email.length>=6; //! Check for a valid email format
    const isValidPassword = !user.password.includes(",") && user.password.length>=8; //! Ensure password does not contain a comma


    setErrors({
      username: (touchedFields.username && !isValidUsername) ? 'Username should only contain letters and numbers and be at least 3 characters long' : '',
      email: (touchedFields.email && !isValidEmail) ? 'Invalid email format' : '',
      password: (touchedFields.password && !isValidPassword) ? 'Password should not contain a comma and be at least 8 characters long' : ''
    });

    if (isValidUsername && isValidEmail && isValidPassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user,touchedFields]);

  const handleInputChange = (e:any, field:string) => {
    setUser({ ...user, [field]: e.target.value });
    setTouchedFields({ ...touchedFields, [field]: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="py-10 mb-10 text-5xl">
        {loading ? "Processing..." : "Free Sign Up"}
      </h1>

      <input
        className="w-[350px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => handleInputChange(e, 'username')}
        placeholder="Your Username..."
      />
      {errors.username && <p className="text-red-500 mb-4 w-1/5 text-center">{errors.username}</p>}

      <input
        className="w-[350px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => handleInputChange(e, 'email')}
        placeholder="Your Email..."
      />
      {errors.email && <p className="text-red-500 mb-4 w-1/5 text-center">{errors.email}</p>}

      <input
        className="w-[350px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => handleInputChange(e, 'password')}
        placeholder="Your Password..."
      />
      {errors.password && <p className="text-red-500 mb-4 w-1/5 text-center">{errors.password}</p>}

      <button
        onClick={onSignUp}
        disabled={buttonDisabled}
        className={`p-2 border ${buttonDisabled ? 'cursor-not-allowed border-red-500 text-red-500':'cursor-pointer  text-green-600 border-green-600'}   rounded-lg focus:outline-none focus:border-gray-600 uppercase px-20 py-3 mt-10 font-bold`}
      >
        {/* {buttonDisabled ? "Sign Up" : "Register My Account Now"} */}
        Sign Up
      </button>

      <Link href="/login">
        <p className="mt-10">
          Do you have a free account already?{" "}
          <span className="font-bold text-green-600 ml-2 cursor-pointer underline">
            Login to your account
          </span>
        </p>
      </Link>

      <Link href="/">
        <p className="mt-8 opacity-50">
          <FaAngleLeft className="inline mr-1" /> Back to the Homepage
        </p>
      </Link>
    </div>
  );
}
