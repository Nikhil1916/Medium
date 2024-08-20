import React from "react";

const Avatar = ({initials="UA", size=2,name}:{initials?:string,size?:number,name?:string}) => {
  if(name) {
    if(name?.split(" ")?.length == 2) {
      initials = name?.split(" ")?.[0]?.charAt(0)+name?.split(" ")?.[1]?.charAt(0)
    } else if(name?.split(" ")?.length == 1) {
      initials = name?.split(" ")?.[0]?.charAt(0)+name?.split(" ")?.[0]?.charAt(name.length-1)
    }
    initials = initials?.toLocaleUpperCase();
  }
  return (
    <div style={{
      height: `${size}rem`, width: `${size}rem` 
    }} className={`relative inline-flex items-center justify-center h-[${size}rem] w-[${size}rem] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className="font-medium text-gray-600 dark:text-gray-300 text-xs">{initials}</span>
    </div>
  );
};

export default Avatar;
