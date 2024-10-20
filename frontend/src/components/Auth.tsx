import { signUpInput } from "@xdev275/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signUpInput>({
    username: "",
    email: "",
    password: "",
  });
  const sendRequest = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
      postInputs
    );
    const jwt = response.data.jwt;
    localStorage.setItem("token", jwt);
    navigate("/blogs");
  };
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="">
          <div className=" flex justify-center items-center flex-col px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signup" ? "Login" : "Sign Up"}
              </Link>
            </div>
          </div>
          <div className="pt-5">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Enter your username"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    username: e.target.value,
                  });
                }}
              />
            ) : null}
            <LabelledInput
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="Enter your password"
              type={"password"}
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <button
            onClick={sendRequest}
            type="button"
            className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType): JSX.Element {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-900 dark:text-black font-semibold my-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
