import { Link } from "react-router-dom";
import InputComponent from "./InputComponent";
import { useState } from "react";
import { signUpInput } from "@nikhilchawla9013/medium";

const Auth = ({type}:{type:"signin" | "signup"}) => {
  const [signUpInputVar, setSignUpInput] = useState<signUpInput>({
    username:"",
    password:"",
    name:""
  });
  const isSignIn = type === 'signin';
  return (
    <div className="flex justify-center items-center mt-[14%] min-w-[80%]">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center">{isSignIn ? "Sign In" : "Create an account"}</h1>
        <p className="text-md font-normal text-center text-gray-500 mt-2">
          {isSignIn ? "Create Account? " : "Already have an account? "}
          <Link className="underline cursor-pointer" to={isSignIn? "/signup":"/signin"}>{isSignIn ?"Sign Up" : "Sign In"}</Link>
        </p>
        <div className="mt-4">
          <div className="flex flex-col gap-2 font-medium text-sm">
            {!isSignIn && <InputComponent label="Username" placeholder="Enter your username" onChange={(e)=>{
              setSignUpInput((p:any)=>{
                return {
                  ...p,
                  name:e.target.value
                }
              })
            }} />}
          </div>
          <div className="flex flex-col gap-2 font-medium text-sm mt-3">
            <InputComponent label="Email" placeholder="abc@gmail.com" onChange={(e)=>{
              setSignUpInput((p:any)=>{
                return {
                  ...p,
                  username:e.target.value
                }
              })
            }} />
          </div>
          <div className="flex flex-col gap-2 font-medium text-sm mt-3">
          <InputComponent label="Password" type="password" onChange={(e)=>{
              setSignUpInput((p:any)=>{
                return {
                  ...p,
                  password:e.target.value
                }
              })
            }} />
          </div>
          <button className="bg-black text-white p-2 w-full mt-2 rounded-sm">
            {isSignIn ? "Sign In" :"Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
