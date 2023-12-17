import { Link } from "react-router-dom";
import { db } from '../firebase';
import { uid } from "uid";
import { set, ref } from "firebase/database";
import { useState, useEffect } from "react";

interface AddBookmarkProps {
  paperItem: {
    title: string;
    author: string;
    date: string;
    doi: string;
  };
}


const AddBookmark: React.FC<AddBookmarkProps> = ({ paperItem }) => {
  const uuid = uid(); // Assuming `uid` is a function that generates a unique identifier
  const writeToDatabase = () => {
    set(ref(db, `/${uuid}`), {
      paperItem,
      uuid,
    });
  };

  return (
    <>
      <button
        className="ml-4 duration-300 bg-white text-purple-500 to-pink-500 px-6 py-3 font-bold rounded-md hover:scale-110 transition ease-in-out text-3xl "
        onClick={writeToDatabase}
      >
        add to bookmarks
      </button>
    </>
  );
};

export default AddBookmark;
