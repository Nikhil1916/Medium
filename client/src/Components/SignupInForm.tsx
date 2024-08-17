import React from "react";

const SignupInForm = () => {
  return (
    <div className="flex justify-center items-center mt-[14%] min-w-[80%]">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center">Create an account</h1>
        <p className="text-md font-normal text-center text-gray-500 mt-2">
          Already have an account? <span className="underline cursor-pointer">Login</span>
        </p>

        <div className="mt-4">
          <div className="flex flex-col gap-2 font-medium text-sm">
            <label htmlFor={"username"}>Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              className="p-2 border border-gray-200 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2 font-medium text-sm mt-3">
            <label htmlFor={"username"}>Email</label>
            <input
              name="email"
              type="text"
              placeholder="abc@gmail.com"
              className="p-2 border border-gray-200 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2 font-medium text-sm mt-3">
            <label htmlFor={"password"}>Password</label>
            <input
              name="password"
              type="text"
            //   placeholder="Enter your username"
              className="p-2 border border-gray-200 rounded-sm"
            />
          </div>
          <button className="bg-black text-white p-2 w-full mt-2 rounded-sm">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignupInForm;
