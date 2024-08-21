import axios from "axios";
import React, { useRef } from "react";
import { API_ENDPOINT } from "../config";
import { Blog, StorageKeys } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const submitBlog = async () => {
    if (!title.current?.value || !content.current?.value) return;
    try {
      const blog:any = await axios.post(
        API_ENDPOINT + "/api/v1/blog",
        {
          title: title.current.value,
          content: content.current.value,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem(StorageKeys.token),
          },
        }
      );
      // console.log(blog);
      navigate("/blog/"+blog?.data?.blog?.id);
    } catch (e) {
      //
    }
  };
  return (
    <div className="flex justify-center">
      <div>
        <input
          ref={title}
          placeholder="Blog Title"
          type="text"
          id="default-input"
          className="w-[40rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-6"
        />
        <textarea
          ref={content}
          id="message"
          rows={8}
          className="block p-2.5 w-[40rem] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-4"
          placeholder="Write your Blog here..."
        ></textarea>
        <button
          onClick={submitBlog}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
