import React from 'react';

import { Link } from "react-router-dom";
import { db } from "../firebase";
import { uid } from "uid";
import { remove } from "firebase/database";
import { set, ref } from "firebase/database";
import { useState, useEffect } from "react";

interface RemoveBookmarkProps {
  bookmarkId: string;
  index: number;
  removeDataItem: (index: number) => void; // Add this line
}


const RemoveBookmark: React.FC<RemoveBookmarkProps> = ({ bookmarkId, index, removeDataItem }) => {
   const handleRemoveBookmark = async () => {
     removeDataItem(index);
     const bookmarkRef = ref(db, bookmarkId);
     await remove(bookmarkRef);
   };

    return (
        <button onClick={handleRemoveBookmark}>remove bookmark</button>
    );
};

export default RemoveBookmark;
