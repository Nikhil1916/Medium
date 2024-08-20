import React from "react";
import { BlogCardProps } from "../utils/interfaces";
import Avatar from "./Avatar";

const Blogcard = ({
  title,
  authorName,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="m-2 p-4 border-b-2 mb-4 break-words">
      <div className="flex gap-2 items-center">
        <Avatar name={authorName} />
        <div className="flex items-center">
          <span className="text-sm font-normal text-gray-600">{authorName}</span>
          <div className="flex flex-col justify-center">
            <span className="rounded-full bg-black w-[4px] h-[4px] m-2 text-xs"></span>
          </div>
          <span className="text-gray-500 text-sm">{publishedDate}</span>
        </div>
      </div>
      <div className="font-bold text-2xl break-words">{title}</div>
      <div className="font-normal break-words">
        {content?.length > 100 ? content.slice(0, 100) + "..." : content}
      </div>
    </div>
  );
};

export default Blogcard;
